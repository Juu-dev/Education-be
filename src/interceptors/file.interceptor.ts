import type {
  CallHandler, ExecutionContext, NestInterceptor, Type,
} from '@nestjs/common';
import { Inject, mixin, Optional } from '@nestjs/common';
import multer from 'fastify-multer';
import type { Observable } from 'rxjs';
import { transformException } from '@n-utils/multer.util';

type MulterInstance = any;

export interface MulterOptions {
  dest?: string | Function;
  /** The storage engine to use for uploaded files. */
  storage?: any;
  /**
     * An object specifying the size limits of the following optional properties. This object is passed to busboy
     * directly, and the details of properties can be found on https://github.com/mscdex/busboy#busboy-methods
     */
  limits?: {
    /** Max field name size (Default: 100 bytes) */
    fieldNameSize?: number;
    /** Max field value size (Default: 1MB) */
    fieldSize?: number;
    /** Max number of non- file fields (Default: Infinity) */
    fields?: number;
    /** For multipart forms, the max file size (in bytes)(Default: Infinity) */
    fileSize?: number;
    /** For multipart forms, the max number of file fields (Default: Infinity) */
    files?: number;
    /** For multipart forms, the max number of parts (fields + files)(Default: Infinity) */
    parts?: number;
    /** For multipart forms, the max number of header key=> value pairs to parse Default: 2000(same as node's http). */
    headerPairs?: number;
  };
  /** Keep the full path of files instead of just the base name (Default: false) */
  preservePath?: boolean;
  fileFilter?(
    req: any,
    file: {
      /** Field name specified in the form */
      fieldname: string;
      /** Name of the file on the user's computer */
      originalname: string;
      /** Encoding type of the file */
      encoding: string;
      /** Mime type of the file */
      mimetype: string;
      /** Size of the file in bytes */
      size: number;
      /** The folder to which the file has been saved (DiskStorage) */
      destination: string;
      /** The name of the file within the destination (DiskStorage) */
      filename: string;
      /** Location of the uploaded file (DiskStorage) */
      path: string;
      /** A Buffer of the entire file (MemoryStorage) */
      buffer: Buffer;
    },
    callback: (error: Error | null, acceptFile: boolean) => void,
  ): void;
}

export type MulterModuleOptions = MulterOptions;

/**
 * @param fieldName
 * @param localOptions
 *
 * @publicApi
 */

export const MULTER_MODULE_OPTIONS = 'MULTER_MODULE_OPTIONS';

export function FileInterceptor(fieldName: string, localOptions?: MulterOptions): Type<NestInterceptor> {
  class MixinInterceptor implements NestInterceptor {
    protected multer: MulterInstance;

    constructor(
      @Optional()
      @Inject(MULTER_MODULE_OPTIONS)
      options: MulterModuleOptions = {},
    ) {
      this.multer = (multer as any)({
        ...options,
        ...localOptions,
      });
    }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      const ctx = context.switchToHttp();

      await new Promise<void>((resolve, reject) =>
        this.multer.single(fieldName)(ctx.getRequest(), ctx.getResponse(), (err: any) => {
          if (err) {
            const error = transformException(err);

            return reject(error);
          }

          resolve();
        }));

      return next.handle();
    }
  }

  return mixin(MixinInterceptor);
}
