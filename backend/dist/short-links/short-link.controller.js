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
exports.ShortLinkController = void 0;
const common_1 = require("@nestjs/common");
const short_link_service_1 = require("./short-link.service");
const create_short_link_dto_1 = require("./dto/create-short-link.dto");
const swagger_1 = require("@nestjs/swagger");
const short_link_response_dto_1 = require("./dto/short-link.response.dto");
const get_short_link_dto_1 = require("./dto/get-short-link.dto");
let ShortLinkController = exports.ShortLinkController = class ShortLinkController {
    constructor(shortLinkService) {
        this.shortLinkService = shortLinkService;
    }
    async createShortLink(createShortLinkDto) {
        const shortLink = await this.shortLinkService.createShortLink(createShortLinkDto);
        return {
            originalUrl: shortLink.originalUrl,
            shortId: shortLink.shortId,
        };
    }
    async getOriginalUrl(shortId) {
        try {
            const shortLink = await this.shortLinkService.findShortLink(shortId);
            return { originalUrl: shortLink.originalUrl };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('Short link not found');
            }
            throw error;
        }
    }
};
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Create a short link' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The short link has been successfully created.',
        type: short_link_response_dto_1.ShortLinkResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_short_link_dto_1.CreateShortLinkDto]),
    __metadata("design:returntype", Promise)
], ShortLinkController.prototype, "createShortLink", null);
__decorate([
    (0, common_1.Get)(':shortId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get original URL by short ID' }),
    (0, swagger_1.ApiParam)({ name: 'shortId', description: 'Short ID of the link' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the original URL.',
        type: get_short_link_dto_1.GetShortLinkResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Short link not found.' }),
    __param(0, (0, common_1.Param)('shortId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShortLinkController.prototype, "getOriginalUrl", null);
exports.ShortLinkController = ShortLinkController = __decorate([
    (0, common_1.Controller)('short-links'),
    __metadata("design:paramtypes", [short_link_service_1.ShortLinkService])
], ShortLinkController);
//# sourceMappingURL=short-link.controller.js.map