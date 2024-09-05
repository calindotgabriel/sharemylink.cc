import { Controller, Get, Param, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { VisitService } from './visit.service';
import * as requestIp from 'request-ip';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ShortLinkService } from 'src/short-links/short-link.service';

// 1) muta visit controller ca app controller

@Controller('/')
export class VisitController {
  constructor(
    private readonly visitService: VisitService,
    private readonly shortLinkService: ShortLinkService,
  ) {}

  @Get(':sharedLink')
  @ApiOperation({ summary: 'Handle visit and return shared link page' })
  @ApiResponse({
    status: 200,
    description: 'Returns HTML page with shared link info',
  })
  @ApiParam({
    name: 'sharedLink',
    description: 'The shared link string',
    type: 'string',
  })
  async handleVisit(
    @Req() req: Request,
    @Res() res: Response,
    @Param('sharedLink') sharedLink: string,
  ) {
    const ip = requestIp.getClientIp(req);
    const userAgent = req.headers['user-agent'];
    const referer = req.headers.referer || 'N/A';
    const host = req.headers.host;
    const acceptLanguage = req.headers['accept-language'];

    const ipInfo = await this.visitService.getIpInfo(ip);

    await this.visitService.createVisit({
      ip,
      userAgent,
      referer,
      host,
      acceptLanguage,
      ipInfo,
    });

    const shortLink = await this.shortLinkService.createShortLink({
      linkToShort: sharedLink,
    });

    const { shortId } = shortLink;

    res.redirect(
      `http://localhost:4000?sharedLink=${encodeURIComponent(shortId)}`,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get visits grouped by country' })
  @ApiResponse({
    status: 200,
    description: 'Returns visits grouped by country',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          country: { type: 'string' },
          ipAddresses: {
            type: 'array',
            items: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiQuery({ name: 'groupBy', enum: ['country'], required: false })
  async getVisits(@Query('groupBy') groupBy: string) {
    if (groupBy === 'country') {
      return this.visitService.getVisitsGroupedByCountry();
    }
    return [];
  }
}
