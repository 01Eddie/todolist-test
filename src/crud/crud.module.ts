import { Module } from '@nestjs/common';
import { CrudController } from './crud.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { CrudService } from './crud.service';

@Module({
  controllers: [CrudController],
  imports: [SupabaseModule],
  providers: [CrudService],
})
export class CrudModule {}
