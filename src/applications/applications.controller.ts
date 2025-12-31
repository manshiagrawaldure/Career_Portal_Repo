import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../common/multer.config';
import { Multer } from 'multer';
import { join } from 'path';
import { open, stat } from 'fs/promises';

// Routes:
// POST /application/:job_id
// GET  /applications/:job_id
// GET  /application/:id
@Controller()
export class ApplicationsController {
  constructor(private readonly service: ApplicationsService) {}

  private async ensurePdfNotCorrupted(
    file: Multer.File | undefined,
    field: 'resume' | 'cover_letter',
  ): Promise<void> {
    if (!file) return;

    const folder =
      field === 'resume' ? 'uploads/resumes' : 'uploads/cover-letters';
    const filePath = join(process.cwd(), folder, file.filename);

    let handle;
    try {
      const fileStat = await stat(filePath);
      if (!fileStat.size) {
        throw new BadRequestException(`Uploaded ${field} is empty or corrupted`);
      }

      handle = await open(filePath, 'r');
      const buffer = Buffer.alloc(4);
      const { bytesRead } = await handle.read(buffer, 0, 4, 0);
      const isPdfHeader = bytesRead >= 4 && buffer.toString('utf8', 0, 4) === '%PDF';
      if (!isPdfHeader) {
        throw new BadRequestException(`Uploaded ${field} is not a valid PDF`);
      }
    } catch (err) {
      if (err instanceof BadRequestException) {
        throw err;
      }
      throw new BadRequestException(
        `Unable to read uploaded ${field}; file may be corrupted`,
      );
    } finally {
      if (handle) {
        await handle.close();
      }
    }
  }

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
    const resumeFile = files?.resume?.[0];
    const coverFile = files?.cover_letter?.[0];

    await this.ensurePdfNotCorrupted(resumeFile, 'resume');
    await this.ensurePdfNotCorrupted(coverFile, 'cover_letter');

    const resumePath = resumeFile
      ? `uploads/resumes/${resumeFile.filename}`
      : undefined;
    const coverPath = coverFile
      ? `uploads/cover-letters/${coverFile.filename}`
      : undefined;

    return this.service.create({
      ...body,
      job_id,
      ...(resumePath ? { resume_path: resumePath } : {}),
      ...(coverPath ? { cover_letter: coverPath } : {}),
    });
  }

  @Get('applications/:job_id')
  async findAll(@Param('job_id') jobId: string) {
    return this.service.findAllWithFilter(jobId);
  }

  @Get('application/:id')
  async findById(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
