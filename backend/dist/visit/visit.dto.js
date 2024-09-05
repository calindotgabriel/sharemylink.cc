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
exports.CreateVisitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateVisitDto {
}
exports.CreateVisitDto = CreateVisitDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IP address of the visitor' }),
    __metadata("design:type", String)
], CreateVisitDto.prototype, "ip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User agent string' }),
    __metadata("design:type", String)
], CreateVisitDto.prototype, "userAgent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Referer URL' }),
    __metadata("design:type", String)
], CreateVisitDto.prototype, "referer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Host name' }),
    __metadata("design:type", String)
], CreateVisitDto.prototype, "host", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Accept-Language header value' }),
    __metadata("design:type", String)
], CreateVisitDto.prototype, "acceptLanguage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IP info object', type: 'object' }),
    __metadata("design:type", Object)
], CreateVisitDto.prototype, "ipInfo", void 0);
//# sourceMappingURL=visit.dto.js.map