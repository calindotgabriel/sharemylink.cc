"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitModule = void 0;
const common_1 = require("@nestjs/common");
const visit_service_1 = require("./visit.service");
const visit_controller_1 = require("./visit.controller");
const mongoose_1 = require("@nestjs/mongoose");
const visit_schema_1 = require("./schemas/visit.schema");
const short_link_module_1 = require("../short-links/short-link.module");
const short_link_service_1 = require("../short-links/short-link.service");
const short_link_schema_1 = require("../short-links/schemas/short-link.schema");
let VisitModule = exports.VisitModule = class VisitModule {
};
exports.VisitModule = VisitModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: visit_schema_1.Visit.name, schema: visit_schema_1.VisitSchema },
                { name: short_link_schema_1.ShortLink.name, schema: short_link_schema_1.ShortLinkSchema },
            ]),
            short_link_module_1.ShortLinkModule,
        ],
        providers: [visit_service_1.VisitService, short_link_service_1.ShortLinkService],
        controllers: [visit_controller_1.VisitController],
    })
], VisitModule);
//# sourceMappingURL=visit.module.js.map