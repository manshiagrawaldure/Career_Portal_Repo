import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplicationsRepository } from './applications.repository';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private readonly repo: ApplicationsRepository) {}

  async create(dto: CreateApplicationDto) {
    return this.repo.createApplication(dto);
  }

  async findAll() {
    return this.repo.findAll();
  }

  async findById(id: string) {
    const app = await this.repo.findById(id);

    if (!app) throw new NotFoundException('Application not found');

    return app;
  }
}
