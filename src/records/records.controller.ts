import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Response,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { SearchFillingRecordParams } from './dto/search-filling-record.dto';

import { DocumentsService } from '../documents/documents.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('records')
export class RecordsController {
  constructor(
    private readonly recordsService: RecordsService,
    private readonly documentService: DocumentsService,
  ) {}

  @Post()
  async create(@Body() createRecordDto: CreateRecordDto) {
    const document = await this.documentService.findOne(
      createRecordDto.document_id,
    );

    if (!document)
      throw new HttpException('Document Not Found', HttpStatus.NOT_FOUND);

    const fillingRecord = await this.recordsService.findFillingRecord({
      company_id: createRecordDto.company_id,
      created_by: createRecordDto.created_by,
      document_id: createRecordDto.document_id,
      system_id: createRecordDto.system_id,
    });

    if (!fillingRecord) {
      return await this.recordsService.create(createRecordDto);
    } else {
      return fillingRecord;
    }
  }

  @Get()
  findAll(@Query() query: any) {
    return this.recordsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecordDto: UpdateRecordDto) {
    return this.recordsService.update(id, updateRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordsService.remove(id);
  }

  @Get('/filling')
  fillingDocument(@Query() query: SearchFillingRecordParams) {
    return this.recordsService.findFillingRecord(query);
  }
}
