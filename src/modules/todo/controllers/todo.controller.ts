import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { TodoService } from 'src/modules/services/todo.service';
import { Todo } from '../entities/todo.entity';
import { CreateDto, UpdateDto } from './dto';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Get('rest/todo')
  getAllAction(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get('rest/todo/:id')
  async getOneAction(@Param('id') id: string): Promise<Todo> {
    const todo = this.todoService.findOne(id);
    if (todo === undefined) {
      throw new HttpException('ToDo with id=' + id + 'not exists',HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  @Post('rest/todo')
  createAction(@Body() createDto: CreateDto): Promise<Todo> {
    const todo = new Todo()
    todo.title = createDto.title;
    if (createDto.isCompleted !== undefined) {
      todo.isCompleted = createDto.isCompleted;

    }
    return this.todoService.create(todo);
  }

  @Put('/rest/todo/:id')
  async updateAction(
    @Param('id') id: string,
    @Body() { title, isCompleted = false }: UpdateDto): Promise<Todo> {
    const todo = await this.todoService.findOne(id);
    if (todo === undefined) {
      throw new NotFoundException('ToDo with id=' + id + 'not exists')
    }
    todo.title = title;
    todo.isCompleted = isCompleted;
    return this.todoService.update(todo);
  }


  @Delete('rest/delete/:id')
  deleteAction(@Param('id') id: string): Promise<void> {
    return this.todoService.remove(id);
  }
}
