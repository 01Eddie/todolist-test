import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CreateToDoDto } from './dto/create-todo.dto';
import { UpdateToDoDto } from './dto/update-todo.dto';

@Controller('crud')
export class CrudController {
    constructor(private crudService: CrudService) {}

    @Get()
    async findAll() {
        console.log('Fetching all ToDo items');
      return this.crudService.findAllToDo();
    }
    
    @Post()
    async create(@Body() body: CreateToDoDto) {
        return this.crudService.createToDo(body);
    }
    
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() body: UpdateToDoDto,
    ) {
        return this.crudService.updateToDo(id, body);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.crudService.deleteToDo(id);
    }
}
