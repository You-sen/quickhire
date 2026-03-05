import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ApplicationDocument = Application & Document;

@Schema({ timestamps: true })
export class Application {
  @Prop({ type: Types.ObjectId, ref: 'Job', required: true })
  jobId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  resumeLink: string;

  @Prop({ required: true })
  coverNote: string;

  @Prop({ default: 'pending' })
  status: string; // pending, reviewed, accepted, rejected
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
