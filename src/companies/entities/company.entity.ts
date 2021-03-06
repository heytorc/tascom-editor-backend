import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Company {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: true })
  active: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
