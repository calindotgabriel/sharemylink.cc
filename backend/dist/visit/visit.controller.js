"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitController = void 0;
const common_1 = require("@nestjs/common");
const visit_service_1 = require("./visit.service");
const requestIp = require("request-ip");
const swagger_1 = require("@nestjs/swagger");
const short_link_service_1 = require("../short-links/short-link.service");
let VisitController = exports.VisitController = class VisitController {
    constructor(visitService, shortLinkService) {
        this.visitService = visitService;
        this.shortLinkService = shortLinkService;
    }
    async handleVisit(req, res, sharedLink) {
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
        res.redirect(`http://localhost:4000?sharedLink=${encodeURIComponent(shortId)}`);
    }
    async getVisits(groupBy) {
        if (groupBy === 'country') {
            return this.visitService.getVisitsGroupedByCountry();
        }
        return [];
    }
};
__decorate([
    (0, common_1.Get)(':sharedLink'),
    (0, swagger_1.ApiOperation)({ summary: 'Handle visit and return shared link page' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns HTML page with shared link info',
    }),
    (0, swagger_1.ApiParam)({
        name: 'sharedLink',
        description: 'The shared link string',
        type: 'string',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('sharedLink')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], VisitController.prototype, "handleVisit", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get visits grouped by country' }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiQuery)({ name: 'groupBy', enum: ['country'], required: false }),
    __param(0, (0, common_1.Query)('groupBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VisitController.prototype, "getVisits", null);
exports.VisitController = VisitController = __decorate([
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [visit_service_1.VisitService,
        short_link_service_1.ShortLinkService])
], VisitController);
//# sourceMappingURL=visit.controller.js.map