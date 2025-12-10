import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './schemas/job.schema';
import { Model } from 'mongoose';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsRepository {
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

  async createJob(dto: CreateJobDto): Promise<Job> {
    const job = new this.jobModel(dto);
    return job.save();
  }

  async findAll(): Promise<Job[]> {
    return this.jobModel.find().exec();
  }

  async findById(id: string): Promise<Job | null> {
    return this.jobModel.findById(id).exec();
  }
}
