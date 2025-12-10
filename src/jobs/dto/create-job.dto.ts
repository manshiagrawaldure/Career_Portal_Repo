import { IsString, IsNotEmpty, IsArray, IsNumber } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  jobRole: string;

  @IsString()
  @IsNotEmpty()
  jobType: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @IsNotEmpty()
  experienceRequired: number;

  @IsArray()
  @IsNotEmpty()
  skills: string[];

  @IsString()
  @IsNotEmpty()
  description: string;
}
