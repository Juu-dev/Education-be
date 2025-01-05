import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';

import { PrismaService } from '@n-database/prisma/prisma.service';
import { GenericRepository } from "@n-modules/generic-service/generic.repository";
import {IGetListTaskWithSpecificModeDTO} from "@n-modules/education-service/tasks/tasks.service";

@Injectable()
export class TasksRepository extends GenericRepository<Task> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'task');
  }

  findAllPaginationWithSpecificMode(props: IGetListTaskWithSpecificModeDTO): Promise<Task[]> {
    const { page, pageSize: limit, mode, id } = props;
    const skip = (page - 1) * limit;

    const where = {}

    if (mode === "sent") {
      where.assignerId = id
    } else if (mode === "received") {
      where.assigneeId = id
    }

    return this.prismaService.task.findMany({
      skip,
      take: limit,
      where,
      include: {
        assignee: true,
        assigner: true
      },
    });
  }
}
