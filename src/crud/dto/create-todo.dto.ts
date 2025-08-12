import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateToDoDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsBoolean()
    @IsNotEmpty()
    status: boolean;

    @IsString()
    @IsNotEmpty()
    designated: string;
  }
  