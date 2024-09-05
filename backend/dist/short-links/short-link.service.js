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
exports.ShortLinkService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const short_link_schema_1 = require("./schemas/short-link.schema");
const crypto = require("crypto");
let ShortLinkService = exports.ShortLinkService = class ShortLinkService {
    constructor(shortLinkModel) {
        this.shortLinkModel = shortLinkModel;
    }
    async createShortLink(createShortLinkDto) {
        const shortId = this.generateShortId();
        const createdShortLink = new this.shortLinkModel({
            originalUrl: createShortLinkDto.linkToShort,
            shortId,
        });
        return createdShortLink.save();
    }
    generateShortId() {
        return crypto.randomBytes(4).toString('hex');
    }
    async findShortLink(shortId) {
        const shortLink = await this.shortLinkModel.findOne({ shortId }).exec();
        if (!shortLink) {
            throw new common_1.NotFoundException('Short link not found');
        }
        return shortLink;
    }
};
exports.ShortLinkService = ShortLinkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(short_link_schema_1.ShortLink.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ShortLinkService);
//# sourceMappingURL=short-link.service.js.map