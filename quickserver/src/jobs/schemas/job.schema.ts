import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  company: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  fullDescription?: string;

  @Prop({ type: [String], required: false })
  responsibilities?: string[];

  @Prop({ type: [String], required: false })
  requirements?: string[];

  @Prop({ required: false })
  salary?: string;

  @Prop({ required: false })
  type?: string; // Full-time, Part-time, Contract, etc.

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isFeatured?: boolean;

  @Prop({ required: false })
  postedDate?: string;

  @Prop({ required: false })
  logo?: string;

  @Prop({ required: false })
  logoColor?: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
