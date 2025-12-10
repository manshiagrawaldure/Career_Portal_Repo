import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() dto: CreateJobDto) {
    return this.jobsService.create(dto);
  }

  @Get()
  findAll() {
    return this.jobsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.getOne(id);
  }
}
