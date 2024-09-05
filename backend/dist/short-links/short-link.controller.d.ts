import { ShortLinkService } from './short-link.service';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
export declare class ShortLinkController {
    private readonly shortLinkService;
    constructor(shortLinkService: ShortLinkService);
    createShortLink(createShortLinkDto: CreateShortLinkDto): Promise<{
        originalUrl: string;
        shortId: string;
    }>;
    getOriginalUrl(shortId: string): Promise<{
        originalUrl: string;
    }>;
}
