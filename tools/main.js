const ModulesController = require('./ModulesGenerator');
const path = require('path');

// Định nghĩa tên alias cho controller mới của bạn
const parentServiceName = 'product-service';
const childServiceName = 'vat'; // Thay 'alias' bằng tên thực sự bạn muốn
const schemaInPrisma = 'ProductServiceVat' // Thay 'alias' bằng tên thực sự bạn muốn

const templateDir = path.join(__dirname, 'templates', 'parent-service', 'child');
const outputDir = path.join(__dirname, '..', 'src', 'modules', parentServiceName, childServiceName);

const generator = new ModulesController(templateDir, outputDir, parentServiceName, childServiceName, schemaInPrisma);

generator.generate();
