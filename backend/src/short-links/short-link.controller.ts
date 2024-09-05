import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ShortLinkService } from './short-link.service';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ShortLinkResponseDto } from './dto/short-link.response.dto';
import { GetShortLinkResponseDto } from './dto/get-short-link.dto';

@Controller('short-links')
export class ShortLinkController {
  constructor(private readonly shortLinkService: ShortLinkService) {}

  @Post('')
  @ApiOperation({ summary: 'Create a short link' })
  @ApiResponse({
    status: 201,
    description: 'The short link has been successfully created.',
    type: ShortLinkResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createShortLink(@Body() createShortLinkDto: CreateShortLinkDto) {
    const shortLink = await this.shortLinkService.createShortLink(
      createShortLinkDto,
    );
    return {
      originalUrl: shortLink.originalUrl,
      shortId: shortLink.shortId,
    };
  }

  @Get(':shortId')
  @ApiOperation({ summary: 'Get original URL by short ID' })
  @ApiParam({ name: 'shortId', description: 'Short ID of the link' })
  @ApiResponse({
    status: 200,
    description: 'Returns the original URL.',
    type: GetShortLinkResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Short link not found.' })
  async getOriginalUrl(
    @Param('shortId') shortId: string,
  ): Promise<{ originalUrl: string }> {
    try {
      const shortLink = await this.shortLinkService.findShortLink(shortId);
      return { originalUrl: shortLink.originalUrl };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Short link not found');
      }
      throw error;
    }
  }
}
