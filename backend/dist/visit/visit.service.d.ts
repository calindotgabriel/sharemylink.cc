import { Model } from 'mongoose';
import { Visit } from './schemas/visit.schema';
export declare class VisitService {
    private visitModel;
    constructor(visitModel: Model<Visit>);
    createVisit(visitData: Partial<Visit>): Promise<Visit>;
    getIpInfo(ip: string): Promise<Record<string, any> | null>;
    getVisitsGroupedByCountry(): Promise<Visit[]>;
}
