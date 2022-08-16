import * as mongoose from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { System } from '../../systems/entities/system.entity';
import { Company } from '../../companies/entities/company.entity';

export type EditorDocumentDocument = EditorDocument & Document;

const FieldOptionsSchema = raw({
  label: String,
  value: String,
});

const FieldSchema = raw({
  label: String,
  placeholder: String,
  type: String,
  tag: {
    type: String,
    required: false,
  },
  position: { x: Number, y: Number },
  size: { width: Number, height: Number },
  styles: {
    type: Object,
    required: false,
  },
  required: Boolean,
  useRichText: Boolean,
  options: {
    type: [FieldOptionsSchema],
    required: false,
  },
});

const VersionsSchema = raw({
  number: Number,
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
  fields: { type: mongoose.Schema.Types.Array },
  status: {
    type: String,
    enum: ['published', 'building', 'canceled'],
    default: 'building',
  },
  publised_at: Date,
  active: { type: Boolean, default: true },
});

const DocumentSizeSchema = raw({
  width: { type: Number },
  height: { type: Number },
});

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'documents',
})
export class EditorDocument {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'System', required: true })
  system_id: System;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  })
  company_id: Company;

  @Prop({ required: true })
  version: number;

  @Prop(DocumentSizeSchema)
  size: Record<string, any>;

  @Prop([VersionsSchema])
  versions: Record<string, any>;

  @Prop({ default: true })
  active: boolean;
}

export const EditorDocumentSchema =
  SchemaFactory.createForClass(EditorDocument);
