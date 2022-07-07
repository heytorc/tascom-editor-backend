import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { SearchFillingRecordParams } from './dto/search-filling-record.dto';

import {
  DocumentRecord,
  DocumentRecordDocument,
} from './entities/record.entity';

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel(DocumentRecord.name)
    private recordModel: Model<DocumentRecordDocument>,
  ) {}

  create(createRecordDto: CreateRecordDto) {
    const record = new this.recordModel(createRecordDto);
    return record.save();
  }

  findAll(query: any) {
    return this.recordModel
      .find(query)
      .populate(['system_id', 'company_id', 'document_id'])
      .limit(100)
      .lean();
  }

  findOne(id: string) {
    return this.recordModel
      .findById({ _id: id })
      .populate(['system_id', 'company_id', 'document_id'])
      .lean();
  }

  update(id: string, updateRecordDto: UpdateRecordDto) {
    return this.recordModel
      .findOneAndUpdate({ _id: id }, { $set: updateRecordDto }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.recordModel.deleteOne({ _id: id }).exec();
  }

  findFillingRecord(query: SearchFillingRecordParams) {
    return this.recordModel
      .findOne({
        ...query,
        status: 'filling',
      })
      .lean();
  }
}
