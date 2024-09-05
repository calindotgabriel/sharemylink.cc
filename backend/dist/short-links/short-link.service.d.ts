import { Model } from 'mongoose';
import { ShortLink } from './schemas/short-link.schema';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
export declare class ShortLinkService {
    private shortLinkModel;
    constructor(shortLinkModel: Model<ShortLink>);
    createShortLink(createShortLinkDto: CreateShortLinkDto): Promise<ShortLink>;
    private generateShortId;
    findShortLink(shortId: string): Promise<ShortLink>;
}
