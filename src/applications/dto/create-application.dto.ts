import { IsNotEmpty, IsOptional, IsString, IsEmail, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsString()
  job_id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  date_of_birth: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  highest_qualification: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  total_experience: number;

  @IsOptional()
  current_company?: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  current_salary: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  expected_salary: number;

  @IsNotEmpty()
  @IsString()
  notice_period: string;

  @IsOptional()
  cover_letter?: string; // file path stored

  @IsOptional()
  resume_path?: string; // file path stored (set by controller from uploaded file)
}
