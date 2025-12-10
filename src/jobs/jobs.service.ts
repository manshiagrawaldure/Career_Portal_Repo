import { Injectable, NotFoundException } from '@nestjs/common';
import { JobsRepository } from './jobs.repository';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(private readonly jobsRepo: JobsRepository) {}

  create(dto: CreateJobDto) {
    return this.jobsRepo.createJob(dto);
  }

  getAll() {
    return this.jobsRepo.findAll();
  }

  async getOne(id: string) {
    const job = await this.jobsRepo.findById(id);
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }
}
