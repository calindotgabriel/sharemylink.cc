import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, IsNotEmpty } from 'class-validator';

export class CreateShortLinkDto {
  @ApiProperty({
    description: 'The URL to be shortened',
    example: 'https://example.com/very/long/url/that/needs/shortening',
  })
  @IsUrl()
  @IsNotEmpty()
  linkToShort: string;
}
