import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../common/multer.config';
import { Multer } from 'multer';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly service: ApplicationsService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'resume', maxCount: 1 },
        { name: 'cover_letter', maxCount: 1 },
      ],
      multerConfig,
    ),
  )
  async create(
    @Body() body: CreateApplicationDto,
    @UploadedFiles()
    files: {
      resume?: Multer.File[];
      cover_letter?: Multer.File[];
    },
  ) {
    if (!files?.resume || files.resume.length === 0) {
      throw new BadRequestException('Resume file is required');
    }

    const resume = files.resume[0].filename;
    const cover = files?.cover_letter?.[0]?.filename;

    return this.service.create({
      ...body,
      resume_path: resume,
      cover_letter: cover, // optional
    });
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
