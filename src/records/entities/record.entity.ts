import * as mongoose from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { System } from '../../systems/entities/system.entity';
import { Company } from '../../companies/entities/company.entity';
import { EditorDocument } from '../../documents/entities/document.entity';
import { User } from 'src/users/entities/user.entity';

export type DocumentRecordDocument = DocumentRecord & Document;

const FieldSchema = raw({
  field_id: String,
  value: String,
});

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'records',
})
export class DocumentRecord {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EditorDocument',
    required: true,
  })
  document_id: EditorDocument;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'System',
    required: true,
  })
  system_id: System;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  })
  company_id: Company;

  @Prop({ required: false, type: Object })
  external_data: Record<string, unknown>;

  @Prop({ required: true })
  version: number;

  @Prop([FieldSchema])
  fields: [];

  @Prop({ default: 'filling', required: true })
  status: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  created_by: User;

  @Prop()
  update_by: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  })
  canceled_by: User;

  @Prop({ required: false })
  canceled_at: Date;
}

export const DocumentRecordSchema =
  SchemaFactory.createForClass(DocumentRecord);
