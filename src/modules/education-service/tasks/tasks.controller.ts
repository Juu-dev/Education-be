import {AuthClaims, GetUser} from '@n-decorators';
import { PaginationParamsDto } from '@n-dtos';
import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CategoryEntity } from '@n-modules/education-service/tasks/entities/category.entity';
import { TasksService } from '@n-modules/education-service/tasks/tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @Post()
  // @Roles([Permission.CREATE_CATEGORY])
  @AuthClaims()
  @ApiCreatedResponse({ type: CategoryEntity })
  create(
  @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('five-latest')
  // @Roles([Permission.GET_CATEGORIES])
  @AuthClaims()
  @ApiOkResponse({
    type: CategoryEntity,
    isArray: true,
  })
  findFiveLatest(
      @GetUser() user: any,
  ) {
    return this.tasksService.findFiveLatest(user?.id);
  }

  @Get('pagination')
  // @Roles([Permission.GET_CATEGORIES])
  @AuthClaims()
  @ApiOkResponse({
    type: CategoryEntity,
    isArray: true,
  })
  findAll(
  @Query() {
    page,
    pageSize,
  }: PaginationParamsDto,
  ) {
    return this.tasksService.getListTask(
      page,
      pageSize,
    );
  }

  @Get('sent-mode')
  // @Roles([Permission.GET_CATEGORIES])
  @AuthClaims()
  @ApiOkResponse({
    type: CategoryEntity,
    isArray: true,
  })
  findAllWithSentMode(
      @GetUser() user: any,
      @Query() {
        page,
        pageSize,
      }: PaginationParamsDto,
  ) {
    return this.tasksService.getListTaskWithSpecificMode(
        {
          page,
          pageSize,
          mode :"sent",
          id: user?.id
        }
    );
  }

  @Get('received-mode')
  // @Roles([Permission.GET_CATEGORIES])
  @AuthClaims()
  @ApiOkResponse({
    type: CategoryEntity,
    isArray: true,
  })
  findAllWithReceivedMode(
      @GetUser() user: any,
      @Query() {
        page,
        pageSize,
      }: PaginationParamsDto,
  ) {
    return this.tasksService.getListTaskWithSpecificMode(
        {
          page,
          pageSize,
          mode: "received",
          id: user?.id
        }
    );
  }

  @Get(':id')
  // @Roles([Permission.GET_CATEGORY])
  @AuthClaims()
  @ApiOkResponse({ type: CategoryEntity })
  findOne(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Patch(':id')
  // @Roles([Permission.UPDATE_CATEGORY])
  @AuthClaims()
  @ApiOkResponse({ type: CategoryEntity })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  // @Roles([Permission.UPDATE_CATEGORY])
  @AuthClaims()
  @ApiOkResponse({ type: CategoryEntity })
  remove(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
