import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortLinkController } from './short-link.controller';
import { ShortLinkService } from './short-link.service';
import { ShortLink, ShortLinkSchema } from './schemas/short-link.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShortLink.name, schema: ShortLinkSchema },
    ]),
  ],
  controllers: [ShortLinkController],
  providers: [ShortLinkService],
  exports: [ShortLinkService],
})
export class ShortLinkModule {}
