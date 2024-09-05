import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Visit extends Document {
  @Prop()
  ip: string;

  @Prop()
  userAgent: string;

  @Prop()
  referer: string;

  @Prop()
  host: string;

  @Prop()
  acceptLanguage: string;

  @Prop({ type: Object })
  ipInfo: Record<string, any>;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);
