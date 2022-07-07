import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Company } from '../../companies/entities/company.entity';

export type SystemDocument = System & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class System {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }] })
  companies_id: Company[];

  @Prop({ default: true })
  active: boolean;
}

export const SystemSchema = SchemaFactory.createForClass(System);
