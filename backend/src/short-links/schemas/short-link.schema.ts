import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class ShortLink extends Document {
  @ApiProperty({
    description: 'The original URL',
    example: 'https://example.com/very/long/url/that/needs/shortening',
  })
  @Prop({ required: true })
  originalUrl: string;

  @ApiProperty({
    description: 'The generated short ID',
    example: 'a1b2c3d4',
  })
  @Prop({ required: true, unique: true })
  shortId: string;

  @ApiProperty({
    description: 'The date and time when the short link was created',
    example: '2024-08-03T12:00:00Z',
  })
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ShortLinkSchema = SchemaFactory.createForClass(ShortLink);
