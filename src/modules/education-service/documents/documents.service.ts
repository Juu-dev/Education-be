import {Injectable} from '@nestjs/common';
import {BaseException} from '@n-exceptions';
import {Errors} from '@n-constants';
import {CreateDocumentDto, UpdateDocumentDto} from './dto';
import {DocumentsRepository} from './documents.repository';

@Injectable()
export class DocumentsService {
    constructor(private readonly documentsRepository: DocumentsRepository) {
    }

    async createDocument(createDocumentDto: CreateDocumentDto) {
        return this.documentsRepository.create(createDocumentDto as any);
    }

    async getListDocument(
        page?: number,
        pageSize?: number,
    ) {
        const count = await this.documentsRepository.count();

        const items = await this.documentsRepository.findAllPagination(page, pageSize);

        return {
            page: page,
            pageSize: pageSize,
            totalPage: Math.ceil(count / pageSize),
            count,
            items,
        };
    }

    async getDocumentById(id: string) {
        const document = await this.documentsRepository.findById(id);

        if (!document) {
            throw new BaseException(Errors.CATEGORY.CATEGORY_NOT_FOUND);
        }

        return document;
    }

    async updateDocument(id: string, updateDocumentDto: UpdateDocumentDto) {
        const document = await this.documentsRepository.findById(id);
        if (!document) {
            throw new BaseException(Errors.CATEGORY.CATEGORY_NOT_FOUND);
        }

        return this.documentsRepository.updateById(
            id,
            updateDocumentDto as any,
        );

    }
}
