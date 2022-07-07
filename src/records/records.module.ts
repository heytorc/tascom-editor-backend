import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';

import { DocumentRecord, DocumentRecordSchema } from './entities/record.entity';

import { DocumentsModule } from 'src/documents/documents.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DocumentRecord.name,
        schema: DocumentRecordSchema,
      },
    ]),
    DocumentsModule,
  ],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}
