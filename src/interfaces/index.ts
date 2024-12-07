export interface IFile {
    encoding: string;
    buffer: Buffer | Uint8Array;
    fieldname: string;
    mimetype: string;
    originalname: string;
    size: number;
}
