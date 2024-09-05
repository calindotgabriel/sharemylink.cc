import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visit } from './schemas/visit.schema';
import axios from 'axios';

@Injectable()
export class VisitService {
  constructor(@InjectModel(Visit.name) private visitModel: Model<Visit>) {}

  async createVisit(visitData: Partial<Visit>): Promise<Visit> {
    const existingVisit = await this.visitModel
      .findOne({ ip: visitData.ip })
      .exec();
    if (existingVisit) {
      console.log('IP already exists in the database, not saving');
      return existingVisit;
    }
    const createdVisit = new this.visitModel(visitData);
    return createdVisit.save();
  }

  async getIpInfo(ip: string): Promise<Record<string, any> | null> {
    try {
      const response = await axios.get(`http://ip-api.com/json/${ip}`);
      return response.data;
    } catch (error) {
      console.error(`Could not retrieve IP info: ${error}`);
      return null;
    }
  }

  async getVisitsGroupedByCountry(): Promise<Visit[]> {
    return this.visitModel.aggregate([
      {
        $group: {
          _id: '$ipInfo.country',
          ipAddresses: { $addToSet: '$ip' },
        },
      },
      {
        $project: {
          _id: 0,
          country: { $ifNull: ['$_id', 'Unknown'] },
          ipAddresses: 1,
        },
      },
      {
        $sort: { country: 1 },
      },
    ]);
  }
}
