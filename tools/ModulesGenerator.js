const fs = require('fs');
const path = require('path');

class GenerateController {
  constructor(templateDir, outputDir, parentServiceName, childServiceName, schemaInPrisma) {
    this.templateDir = templateDir;
    this.outputDir = outputDir;
    this.parentServiceName = parentServiceName;
    this.childServiceName = childServiceName;
    this.schemaInPrisma = schemaInPrisma;
    this.transformAlias(childServiceName, parentServiceName, schemaInPrisma);
  }

  generate() {
    this.generateController();
    this.generateService();
    this.generateRepository();
    this.generateModule();
    this.generateDTO();
    this.generateInterface();
    // this.generateTest();
  }

  generateController() {
    const templatePath = path.join(this.templateDir, 'controller.ts');
    const outputPath = path.join(this.outputDir, `${this.childServiceName}.controller.ts`);

    this.replaceTemplate(templatePath, outputPath);
  }

  generateService() {
    const templatePath = path.join(this.templateDir, 'service.ts');
    const outputPath = path.join(this.outputDir, `${this.childServiceName}.service.ts`);

    this.replaceTemplate(templatePath, outputPath);
  }

  generateRepository() {
    const templatePath = path.join(this.templateDir, 'repository.ts');
    const outputPath = path.join(this.outputDir, `${this.childServiceName}.repository.ts`);

    this.replaceTemplate(templatePath, outputPath);
  }

  generateModule() {
    const templatePath = path.join(this.templateDir, 'module.ts');
    const outputPath = path.join(this.outputDir, `${this.childServiceName}.module.ts`);

    this.replaceTemplate(templatePath, outputPath);
  }

  generateDTO() {
    let templatePath = path.join(this.templateDir, 'dtos', 'create.dto.ts');
    let outputPath = path.join(this.outputDir, 'dtos', `create-${this.to_service_not_s}.dto.ts`);

    this.replaceTemplate(templatePath, outputPath);

    templatePath = path.join(this.templateDir, 'dtos', 'update.dto.ts');
    outputPath = path.join(this.outputDir, 'dtos', `update-${this.to_service_not_s}.dto.ts`);

    this.replaceTemplate(templatePath, outputPath);

    templatePath = path.join(this.templateDir, 'dtos', 'index.ts');
    outputPath = path.join(this.outputDir, 'dtos', `index.ts`);

    this.replaceTemplate(templatePath, outputPath);
  }

  generateInterface() {
    const templatePath = path.join(this.templateDir, 'interface', 'response.ts');
    const outputPath = path.join(this.outputDir, 'interface', `${this.to_service_not_s}.response.ts`);

    this.replaceTemplate(templatePath, outputPath);
  }

  generateTest() {
    const templatePath = path.join(this.templateDir, 'service.ts');
    const outputPath = path.join(this.outputDir, `${this.childServiceName}.service.ts`);

    this.replaceTemplate(templatePath, outputPath);
  }

  parentServiceName

  replaceTemplate(templatePath, outputPath) {
    fs.readFile(templatePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading template file:', err);
        return;
      }

      let result = data
        .replace(/{{Service_s_or_es}}/g, this.to_Service_s_or_es)
        .replace(/{{service_s_or_es}}/g, this.to_service_s_or_es)
        .replace(/{{Service_not_s}}/g, this.to_Service_not_s)
        .replace(/{{service_not_s}}/g, this.to_service_not_s)
        .replace(/{{SERVICE_NOT_S}}/g, this.to_SERVICE_NOT_S)
        .replace(/{{Schema_in_prisma}}/g, this.to_Schema_in_prisma)
        .replace(/{{schema_in_prisma}}/g, this.to_schema_in_prisma)
        .replace(/{{Parent_Service}}/g, this.to_Parent_Service);

      // Ensure the output directory exists
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });

      fs.writeFile(outputPath, result, 'utf8', (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return;
        }
        console.log(`Controller generated at: ${outputPath}`);
      });
    });
  }

  transformAlias(childServiceName, parentServiceName, schemaInPrisma) {
    this.to_Service_s_or_es = this.capitalizeFirstLetter(childServiceName);
    this.to_service_s_or_es = childServiceName;
    this.to_Service_not_s = this.capitalizeFirstLetter(this.removeSOrEs(childServiceName));
    this.to_service_not_s = this.removeSOrEs(childServiceName);
    this.to_SERVICE_NOT_S = this.to_service_not_s.toUpperCase();
    this.to_Schema_in_prisma = schemaInPrisma;
    this.to_schema_in_prisma = this.lowercaseFirstLetter(schemaInPrisma);
    this.to_Parent_Service = this.kebabCaseToPascalCase(parentServiceName);

    console.log('to_Service_s_or_es:', this.to_Service_s_or_es);
    console.log('to_service_s_or_es:', this.to_service_s_or_es);
    console.log('to_Service_not_s:', this.to_Service_not_s);
    console.log('to_service_not_s:', this.to_service_not_s);
    console.log('to_Schema_in_prisma:', this.to_Schema_in_prisma);
    console.log('to_schema_in_prisma:', this.to_schema_in_prisma);
    console.log('to_Parent_Service:', this.to_Parent_Service);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  lowercaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  camelCaseToSnakeCase(string) {
    return string.replace(/([A-Z])/g, (match) => `_${match.toLowerCase()}`);
  }

  snakeCaseToCamelCase(string) {
    return string.replace(/_([a-z])/g, (match) => match[1].toUpperCase());
  }  

  // Kebab Case to Pascal Case
  kebabCaseToPascalCase(string) {
    return string.split('-').map((word) => this.capitalizeFirstLetter(word)).join('');
  }

  removeSOrEs(string) {
    return this.toSingular(string);
  }

  toSingular(word) {
    // Quy tắc cho các từ kết thúc bằng 'ies' (ví dụ: 'categories' -> 'category')
    if (word.endsWith('ies')) {
        return word.slice(0, -3) + 'y';
    }
    // Quy tắc cho các từ kết thúc bằng 'es' (ví dụ: 'boxes' -> 'box')
    else if (word.endsWith('es')) {
        // Đối với các từ kết thúc bằng "oes", "ses", "xes" (ví dụ: 'heroes' -> 'hero')
        if (word.endsWith('oes') || word.endsWith('ses') || word.endsWith('xes')) {
            return word.slice(0, -2);
        }
        // Loại bỏ 'es' nhưng cần kiểm tra trường hợp đặc biệt khác
        return word.slice(0, -1);
    }
    // Quy tắc chung cho các từ kết thúc bằng 's' (ví dụ: 'cars' -> 'car')
    else if (word.endsWith('s')) {
        return word.slice(0, -1);
    }
    // Trả lại từ gốc nếu không áp dụng quy tắc nào ở trên
    return word;
}
}

module.exports = GenerateController;
