import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Visit, VisitSchema } from './schemas/visit.schema';
import { ShortLinkModule } from 'src/short-links/short-link.module';
import { ShortLinkService } from 'src/short-links/short-link.service';
import {
  ShortLink,
  ShortLinkSchema,
} from 'src/short-links/schemas/short-link.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Visit.name, schema: VisitSchema },
      { name: ShortLink.name, schema: ShortLinkSchema },
    ]),
    ShortLinkModule,
  ],
  providers: [VisitService, ShortLinkService],
  controllers: [VisitController],
})
export class VisitModule {}
