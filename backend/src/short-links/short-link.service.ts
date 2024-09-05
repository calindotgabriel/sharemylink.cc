import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShortLink } from './schemas/short-link.schema';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import * as crypto from 'crypto';

@Injectable()
export class ShortLinkService {
  constructor(
    @InjectModel(ShortLink.name) private shortLinkModel: Model<ShortLink>,
  ) {}

  async createShortLink(
    createShortLinkDto: CreateShortLinkDto,
  ): Promise<ShortLink> {
    const shortId = this.generateShortId();
    const createdShortLink = new this.shortLinkModel({
      originalUrl: createShortLinkDto.linkToShort,
      shortId,
    });
    return createdShortLink.save();
  }

  /**
   * Generate a random short id
   * @returns
   */
  private generateShortId(): string {
    return crypto.randomBytes(4).toString('hex');
  }

  async findShortLink(shortId: string): Promise<ShortLink> {
    const shortLink = await this.shortLinkModel.findOne({ shortId }).exec();
    if (!shortLink) {
      throw new NotFoundException('Short link not found');
    }
    return shortLink;
  }
}
