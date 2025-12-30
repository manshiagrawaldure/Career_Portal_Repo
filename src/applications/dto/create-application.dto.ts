import { IsOptional, IsString, IsEmail, IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateApplicationDto {
  @IsOptional()
  job_id?: string; // Set from URL params, not validated from body

  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email must be valid' })
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  highest_qualification?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  total_experience?: number;

  @IsOptional()
  current_company?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  current_salary?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  expected_salary?: number;

  @IsOptional()
  @IsString()
  notice_period?: string;

  @IsOptional()
  cover_letter?: string; // file path stored

  @IsOptional()
  resume_path?: string; // file path stored (set by controller from uploaded file)
}
