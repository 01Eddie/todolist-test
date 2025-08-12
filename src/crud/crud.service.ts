import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CreateToDoDto } from './dto/create-todo.dto';
import { UpdateToDoDto } from './dto/update-todo.dto';

@Injectable()
export class CrudService {
    constructor(private supabase: SupabaseService) {}

    async findAllToDo() {
      const { data, error } = await this.supabase
        .getClient()
        .from('todo')
        .select('*');

      if (error) throw error;

      if (!data || data.length === 0) {
        console.log('Aun faltan registrar datos en la tabla de supabase');

        throw new Error('No data found in the todo table');
      }
    
      return data;
    }

    async createToDo(body: CreateToDoDto) {
      const { data, error } = await this.supabase
        .getClient()
        .from('todo')
        .insert({ name: body.name, status: body.status, designated: body.designated })
      
      if (error) throw error;

      return data;
    }

    async updateToDo(id: string, body: UpdateToDoDto) {
      const { data, error } = await this.supabase
        .getClient()
        .from('todo')
        .update({ name: body.name, status: body.status, designated: body.designated  })
        .eq('id', id)

      if (error) throw error;
        
      return data;
      }

    async deleteToDo(id: string) {
      const { data, error } = await this.supabase
        .getClient()
        .from('todo')
        .delete()
        .eq('id', id)

      if (error) throw error;
      
      return data;
    }
}
