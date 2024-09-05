import { ApiProperty } from '@nestjs/swagger';

export class ShortLinkResponseDto {
  @ApiProperty({
    description: 'The original URL that was shortened',
    example: 'https://example.com/very/long/url/that/needs/shortening',
  })
  originalUrl: string;

  @ApiProperty({
    description: 'The generated short ID for the URL',
    example: 'a1b2c3d4',
  })
  shortId: string;
}
