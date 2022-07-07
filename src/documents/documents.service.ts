import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

import {
  EditorDocument,
  EditorDocumentDocument,
} from './entities/document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(EditorDocument.name)
    private documentModel: Model<EditorDocumentDocument>,
  ) {}

  create(createDocumentDto: CreateDocumentDto) {
    const document = new this.documentModel(createDocumentDto);
    return document.save();
  }

  findAll() {
    return this.documentModel
      .find({})
      .populate(['system_id', 'company_id'])
      .limit(100)
      .lean();
  }

  findOne(id: string) {
    return this.documentModel.findById({ _id: id }).lean();
  }

  update(id: string, updateDocumentDto: UpdateDocumentDto) {
    return this.documentModel
      .findOneAndUpdate({ _id: id }, { $set: updateDocumentDto }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.documentModel.deleteOne({ _id: id }).exec();
  }
}
