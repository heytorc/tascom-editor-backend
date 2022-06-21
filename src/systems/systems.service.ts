import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';

import { System, SystemDocument } from './entities/system.entity';

@Injectable()
export class SystemsService {
  constructor(
    @InjectModel(System.name) private systemModel: Model<SystemDocument>,
  ) {}

  create(createCompanyDto: CreateSystemDto) {
    const company = new this.systemModel(createCompanyDto);
    return company.save();
  }

  findAll() {
    return this.systemModel.find({}).populate('companies_id').limit(100).lean();
  }

  findOne(id: string) {
    return this.systemModel
      .findById({ _id: id })
      .populate('companies_id')
      .lean();
  }

  update(id: string, updateSystemDto: UpdateSystemDto) {
    return this.systemModel
      .findOneAndUpdate({ _id: id }, { $set: updateSystemDto }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.systemModel.deleteOne({ _id: id }).exec();
  }
}
