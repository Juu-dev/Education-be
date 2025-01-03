import {Injectable, Query} from '@nestjs/common';
import { BaseException } from '@n-exceptions';
import { Errors } from '@n-constants';
import {CreateDocumentDto, FilterDocumentDto, SearchDocumentDto, UpdateDocumentDto} from './dto';
import { DocumentsRepository } from './documents.repository';
import {FileUploadService} from "@n-modules/file-upload/file-upload.service";
import {IFile} from "../../../interfaces";

export interface IGetListDocumentsDTO {
  page?: number,
  pageSize?: number,
  teacherId?: string,
  filter?: { type: string[] },
  search?: string
}

@Injectable()
export class DocumentsService {
  constructor(
    private readonly documentsRepository: DocumentsRepository,
    private readonly fileUploadService: FileUploadService
  ) {
  }

  async createDocument(createDocumentDto: CreateDocumentDto, files: IFile[]) {
    const file = await this.fileUploadService.uploadFile(files[0]);

    const uploadData = {
      ...createDocumentDto,
      url: file.Location
    }

    return this.documentsRepository.create(uploadData as any);
  }

  async getListDocument(props: IGetListDocumentsDTO) {
    const {teacherId, pageSize, page} = props

    const count = teacherId
      ? await this.documentsRepository.countByTeacherId(teacherId)
      : await this.documentsRepository.count();

    const items = teacherId
      ? await this.documentsRepository.findAllPaginationByTeacherId(props)
      : await this.documentsRepository.findAllPaginationWithFilter(props);
    return {
      pagination: {
        page,
        pageSize,
        totalPage: Math.ceil(count / pageSize),
      },
      count,
      data: items,
    };
  }

  async getDocumentById(id: string) {
    const document = await this.documentsRepository.findById(id);

    if (!document) {
      throw new BaseException(Errors.DOCUMENT.DOCUMENT_NOT_FOUND);
    }

    return document;
  }

  async updateDocument(id: string, updateDocumentDto: UpdateDocumentDto) {
    const document = await this.documentsRepository.findById(id);
    if (!document) {
      throw new BaseException(Errors.DOCUMENT.DOCUMENT_NOT_FOUND);
    }

    return this.documentsRepository.updateById(
      id,
      updateDocumentDto as any,
    );
  }

  async deleteById(id: string) {
    const document = await this.documentsRepository.findById(id);
    if (!document) {
      throw new BaseException(Errors.DOCUMENT.DOCUMENT_NOT_FOUND);
    }

    return this.documentsRepository.deleteById(id);
  }
}
