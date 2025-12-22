import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Job extends Document {
  @Prop({ required: true })
  jobRole: string;

  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  jobType: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  experienceRequired: number;

  @Prop({ type: [String], required: true })
  skills: string[];

  @Prop({ required: true })
  description: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
