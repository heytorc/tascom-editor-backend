import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import {
  EditorDocument,
  EditorDocumentSchema,
} from './entities/document.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EditorDocument.name,
        schema: EditorDocumentSchema,
      },
    ]),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
