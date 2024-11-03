import { Injectable, OnModuleInit } from '@nestjs/common';
import * as cron from 'node-cron';
import { PrismaService } from '@n-database/prisma/prisma.service';

import { allRecordsCondition, logger } from '@n-utils';

@Injectable()
export class ScheduledJobService implements OnModuleInit {
  private readonly listServiceCategory = [
    this.prisma.authServiceCategory,
    this.prisma.scheduleServiceCategory,
    this.prisma.customerServiceCategory,
    this.prisma.productServiceCategory,
  ];

  private readonly logger = logger({
    infoFile: 'jobs-info.log',
    errorFile: 'jobs-error.log',
  });

  private isFirstRun = true;

  constructor(private readonly prisma: PrismaService) { }

  // */5 * * * *: Every 5 minutes
  async onModuleInit() {
    cron.schedule('*/5 * * * *', () => {
      this.categorySyncData();
    });
  }

  private async categorySyncData() {
    try {
      if (this.isFirstRun) {
        this.isFirstRun = false;
      }

      const categoriesFromCategoryService = await this.prisma.cateServiceCategory.findMany({ where: allRecordsCondition });

      const categoryIds = categoriesFromCategoryService.map((category) => category.id);

      const updateOperations = categoriesFromCategoryService.map((category) => ({
        where: { id: category.id, ...allRecordsCondition },
        data: category,
      }));

      await Promise.all(this.listServiceCategory.map(async (serviceCategory: any) => {
        const existingCategories = await serviceCategory.findMany({
          where: {
            id: { in: categoryIds },
            ...allRecordsCondition,
          },
        });

        const existingCategoryIds = new Set(existingCategories.map((category) => category.id));

        const categoriesToUpdate = updateOperations.filter((operation) =>
          existingCategoryIds.has(operation.where.id));

        const categoriesToCreate = categoriesFromCategoryService.filter((category) =>
          !existingCategoryIds.has(category.id));

        if (categoriesToUpdate.length > 0) {
          await Promise.all(categoriesToUpdate.map(async (operation) =>
            serviceCategory.update(operation)));
        }

        if (categoriesToCreate.length > 0) {
          await serviceCategory.createMany({
            data: categoriesToCreate,
          });
        }
      }));

      this.logger.info('Sync category_service_categories successfully!');

      this.logger.info('Sync category_service_categories successfully!');
    } catch (error) {
      this.logger.error('Sync category_service_categories error:', error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
