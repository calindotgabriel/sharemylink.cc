import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { VisitModule } from './visit/visit.module';
import { ShortLinkModule } from './short-links/short-link.module';

@Module({
  imports: [ConfigModule, DatabaseModule, VisitModule, ShortLinkModule],
})
export class AppModule {}
