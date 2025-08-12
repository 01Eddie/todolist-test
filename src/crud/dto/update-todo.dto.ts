import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateToDoDto {
  // id include 
    @IsString()
    @IsOptional()
    name: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;

    @IsString()
    @IsOptional()
    designated: string;
  }
  