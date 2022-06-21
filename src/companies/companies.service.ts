import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

import { Company, CompanyDocument } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    const company = new this.companyModel(createCompanyDto);
    return company.save();
  }

  findAll() {
    return this.companyModel.find({}).limit(100).lean();
  }

  findOne(id: string) {
    return this.companyModel.findById({ _id: id }).lean();
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.companyModel
      .findByIdAndUpdate({ _id: id }, { $set: updateCompanyDto }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.companyModel.deleteOne({ _id: id }).exec();
  }
}
