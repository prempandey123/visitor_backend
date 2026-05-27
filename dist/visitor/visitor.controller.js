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
exports.VisitorController = void 0;
const common_1 = require("@nestjs/common");
const visitor_service_1 = require("./visitor.service");
const createVisitor_dto_1 = require("./createVisitor.dto");
const updateVisitor_dto_1 = require("./updateVisitor.dto");
let VisitorController = class VisitorController {
    constructor(visitorService) {
        this.visitorService = visitorService;
    }
    async findAll() {
        return this.visitorService.findAllVisitors();
    }
    async findOne(id) {
        return this.visitorService.findOne(Number(id));
    }
    async create(createVisitorDto) {
        const newVisitor = await this.visitorService.createVisitor(createVisitorDto);
        return newVisitor;
    }
    async update(id, updateVisitorDto) {
        return this.visitorService.updateVisitor(id, updateVisitorDto);
    }
    async remove(id) {
        return this.visitorService.deleteVisitor(id);
    }
    async checkIn(id) {
        return this.visitorService.updateCheckInTime(Number(id));
    }
    async checkOut(id) {
        return this.visitorService.updateCheckOutTime(Number(id));
    }
    async bulkUpload(body) {
        const { visitors } = body;
        if (!Array.isArray(visitors)) {
            throw new common_1.BadRequestException('Invalid payload: visitors must be an array');
        }
        return this.visitorService.bulkInsertVisitors(visitors);
    }
    ;
};
exports.VisitorController = VisitorController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VisitorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VisitorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createVisitor_dto_1.CreateVisitorDto]),
    __metadata("design:returntype", Promise)
], VisitorController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateVisitor_dto_1.UpdateVisitorDto]),
    __metadata("design:returntype", Promise)
], VisitorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VisitorController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/check-in'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VisitorController.prototype, "checkIn", null);
__decorate([
    (0, common_1.Post)(':id/check-out'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VisitorController.prototype, "checkOut", null);
__decorate([
    (0, common_1.Post)('bulk-upload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VisitorController.prototype, "bulkUpload", null);
exports.VisitorController = VisitorController = __decorate([
    (0, common_1.Controller)('visitors'),
    __metadata("design:paramtypes", [visitor_service_1.VisitorService])
], VisitorController);
;
//# sourceMappingURL=visitor.controller.js.map