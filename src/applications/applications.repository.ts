import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Application } from './schemas/application.schema';
import { Model } from 'mongoose';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsRepository {
  constructor(
    @InjectModel(Application.name)
    private appModel: Model<Application>,
  ) {}

  async createApplication(dto: CreateApplicationDto): Promise<Application> {
    const app = new this.appModel(dto);
    return app.save();
  }

  async findAll(): Promise<Application[]> {
    return this.appModel.find().exec();
  }

  async findById(id: string): Promise<Application | null> {
    return this.appModel.findById(id).exec();
  }
}
