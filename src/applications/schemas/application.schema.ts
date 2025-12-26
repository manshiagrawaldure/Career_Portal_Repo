import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Application extends Document {
  @Prop()
  job_id?: string;

  @Prop()
  name?: string;

  @Prop()
  email?: string;

  @Prop()
  phone?: string;

  @Prop({ select: false })
  date_of_birth?: string;

  @Prop()
  gender?: string;

  @Prop()
  location?: string;

  @Prop()
  highest_qualification?: string;

  @Prop()
  total_experience?: number;

  @Prop()
  current_company?: string; // optional

  @Prop()
  current_salary?: number;

  @Prop()
  expected_salary?: number;

  @Prop()
  notice_period?: string;

  @Prop()
  cover_letter?: string; // optional file

  @Prop()
  resume_path?: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
