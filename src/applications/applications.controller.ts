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

// Routes:
// POST /application/:job_id
// GET  /applications
// GET  /application/:id
@Controller()
export class ApplicationsController {
  constructor(private readonly service: ApplicationsService) {}

  @Post('application/:job_id')
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
    @Param('job_id') job_id: string,
    @Body() body: CreateApplicationDto,
    @UploadedFiles()
    files: {
      resume?: Multer.File[];
      cover_letter?: Multer.File[];
    },
  ) {
    const resume = files?.resume?.[0]?.filename;
    const cover = files?.cover_letter?.[0]?.filename;

    return this.service.create({
      ...body,
      job_id,
      ...(resume ? { resume_path: resume } : {}),
      ...(cover ? { cover_letter: cover } : {}),
    });
  }

  @Get('applications')
  async findAll() {
    return this.service.findAll();
  }

  @Get('application/:id')
  async findById(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
