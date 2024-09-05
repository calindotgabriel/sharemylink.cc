import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_CONNECTION_STRING'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'sharemylink',
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
})
export class DatabaseModule { }
