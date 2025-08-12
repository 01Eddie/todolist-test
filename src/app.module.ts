import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SupabaseService } from './supabase/supabase.service';
import { SupabaseModule } from './supabase/supabase.module';
import { CrudService } from './crud/crud.service';
import { CrudModule } from './crud/crud.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
    }),
    SupabaseModule,
    CrudModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
