import { Request, Response } from 'express';
import { VisitService } from './visit.service';
import { ShortLinkService } from 'src/short-links/short-link.service';
export declare class VisitController {
    private readonly visitService;
    private readonly shortLinkService;
    constructor(visitService: VisitService, shortLinkService: ShortLinkService);
    handleVisit(req: Request, res: Response, sharedLink: string): Promise<void>;
    getVisits(groupBy: string): Promise<import("./schemas/visit.schema").Visit[]>;
}
