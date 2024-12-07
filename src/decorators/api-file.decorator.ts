/* eslint-disable @typescript-eslint/ban-types,@typescript-eslint/no-unsafe-argument */
import type { Type } from '@nestjs/common';
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { PARAMTYPES_METADATA, ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { RouteParamtypes } from '@nestjs/common/enums/route-paramtypes.enum';
import {
  ApiBody, ApiConsumes, ApiExtraModels, getSchemaPath,
} from '@nestjs/swagger';
import type { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { reverseObjectKeys } from '@nestjs/swagger/dist/utils/reverse-object-keys.util';
import _ from 'lodash';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

type IApiFile = {
  name: string;
  isArray?: boolean;
};

// eslint-disable-next-line consistent-return
function explore(instance: Object, propertyKey: string | symbol) {
  const types: Array<Type<unknown>> = Reflect.getMetadata(PARAMTYPES_METADATA, instance, propertyKey);
  const routeArgsMetadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, instance.constructor, propertyKey) || {};

  const parametersWithType = _.mapValues(reverseObjectKeys(routeArgsMetadata), (param) => ({
    type: types[param.index],
    name: param.data,
    required: true,
  }));

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(parametersWithType)) {
    const keyPair = key.split(':');

    // eslint-disable-next-line  @typescript-eslint/no-unsafe-enum-comparison
    if (Number(keyPair[0]) === RouteParamtypes.BODY) {
      // @ts-ignore
      return value.type;
    }
  }
}

function RegisterModels(): MethodDecorator {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const body = explore(target, propertyKey);

    return body && ApiExtraModels(body)(target, propertyKey, descriptor);
  };
}

function ApiFileDecorator(files: IApiFile[] = [], options: Partial<{ isRequired: boolean }> = {}): MethodDecorator {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const { isRequired = false } = options;
    const fileSchema: SchemaObject = {
      type: 'string',
      format: 'binary',
    };
    const properties: Record<string, SchemaObject | ReferenceObject> = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      properties[file.name] = file.isArray
        ? {
          type: 'array',
          items: fileSchema,
        }
        : fileSchema;
    }

    let schema: SchemaObject = {
      properties,
      type: 'object',
    };
    const body = explore(target, propertyKey);

    if (body) {
      schema = {
        allOf: [
          {
            $ref: getSchemaPath(body),
          },
          { properties, type: 'object' },
        ],
      };
    }

    return ApiBody({
      schema,
      required: isRequired,
    })(target, propertyKey, descriptor);
  };
}

export function ApiFile(files: _.Many<IApiFile>, options: Partial<{ isRequired: boolean }> = {}): MethodDecorator {
  const filesArray = _.castArray(files);
  console.log("filesArray: ", JSON.stringify(filesArray));
  const apiFileInterceptors = filesArray.map((file) =>
    (file.isArray ? UseInterceptors(FilesInterceptor(file.name)) : UseInterceptors(FileInterceptor(file.name))));

  return applyDecorators(
    RegisterModels(),
    ApiConsumes('multipart/form-data'),
    ApiFileDecorator(filesArray, options),
    ...apiFileInterceptors,
  );
}
