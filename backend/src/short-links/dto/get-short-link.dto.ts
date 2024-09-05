import { ApiProperty } from '@nestjs/swagger';

export class GetShortLinkResponseDto {
  @ApiProperty({
    description: 'The original URL corresponding to the short ID',
    example: 'https://example.com/very/long/url/that/was/shortened',
  })
  originalUrl: string;
}
