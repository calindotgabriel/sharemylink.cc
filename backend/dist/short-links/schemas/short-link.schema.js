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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortLinkSchema = exports.ShortLink = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
let ShortLink = exports.ShortLink = class ShortLink extends mongoose_2.Document {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The original URL',
        example: 'https://example.com/very/long/url/that/needs/shortening',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ShortLink.prototype, "originalUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The generated short ID',
        example: 'a1b2c3d4',
    }),
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], ShortLink.prototype, "shortId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date and time when the short link was created',
        example: '2024-08-03T12:00:00Z',
    }),
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], ShortLink.prototype, "createdAt", void 0);
exports.ShortLink = ShortLink = __decorate([
    (0, mongoose_1.Schema)()
], ShortLink);
exports.ShortLinkSchema = mongoose_1.SchemaFactory.createForClass(ShortLink);
//# sourceMappingURL=short-link.schema.js.map