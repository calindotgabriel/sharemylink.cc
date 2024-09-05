import { ApiProperty } from '@nestjs/swagger';

export class CreateVisitDto {
  @ApiProperty({ description: 'IP address of the visitor' })
  ip: string;

  @ApiProperty({ description: 'User agent string' })
  userAgent: string;

  @ApiProperty({ description: 'Referer URL' })
  referer: string;

  @ApiProperty({ description: 'Host name' })
  host: string;

  @ApiProperty({ description: 'Accept-Language header value' })
  acceptLanguage: string;

  @ApiProperty({ description: 'IP info object', type: 'object' })
  ipInfo: Record<string, any>;
}
