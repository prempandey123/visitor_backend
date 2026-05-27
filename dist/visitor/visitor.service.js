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
exports.VisitorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const visitor_entity_1 = require("./visitor.entity");
const moment = require("moment");
let VisitorService = class VisitorService {
    constructor(visitorRepository) {
        this.visitorRepository = visitorRepository;
    }
    async findVisitorByEmail(email) {
        return this.visitorRepository.findOne({ where: { email } });
    }
    async createVisitor(createVisitorDto) {
        const { visitorName, companyName, email, number, purposeOfVisit, hostName, visitorImage, } = createVisitorDto;
        const existingVisitor = await this.findVisitorByEmail(email);
        const visitor = this.visitorRepository.create({
            visitorName,
            companyName,
            email,
            number,
            purposeOfVisit,
            hostName,
            visitorImage,
            checkInTime: new Date(),
        });
        try {
            return await this.visitorRepository.save(visitor);
        }
        catch (error) {
            console.error('Error saving visitor:', error);
            throw new common_1.InternalServerErrorException('Error saving visitor');
        }
    }
    async findAllVisitors() {
        try {
            return await this.visitorRepository.find();
        }
        catch (error) {
            console.error('Error finding visitors:', error);
            throw new common_1.InternalServerErrorException('Error finding visitors');
        }
    }
    async findOne(id) {
        const visitor = await this.visitorRepository.findOne({ where: { id } });
        if (!visitor) {
            throw new common_1.NotFoundException(`Visitor with id ${id} not found`);
        }
        return visitor;
    }
    async updateVisitor(id, updateVisitorDto) {
        const visitor = await this.visitorRepository.findOne({
            where: { id: Number(id) },
        });
        if (!visitor) {
            throw new common_1.NotFoundException(`Visitor with id ${id} not found`);
        }
        Object.assign(visitor, updateVisitorDto);
        try {
            return this.visitorRepository.save(visitor);
        }
        catch (error) {
            console.error('Error updating visitor:', error);
            throw new common_1.InternalServerErrorException('Error updating visitor');
        }
    }
    async deleteVisitor(id) {
        try {
            const visitor = await this.visitorRepository.findOne({
                where: { id: Number(id) },
            });
            if (!visitor) {
                throw new common_1.NotFoundException(`Visitor with id ${id} not found`);
            }
            await this.visitorRepository.delete(Number(id));
        }
        catch (error) {
            console.error('Error deleting visitor:', error);
            throw new common_1.InternalServerErrorException('Error deleting visitor');
        }
    }
    async updateCheckInTime(id) {
        const visitor = await this.visitorRepository.findOne({ where: { id } });
        if (!visitor) {
            throw new common_1.NotFoundException(`Visitor with id ${id} not found`);
        }
        visitor.checkInTime = new Date();
        return this.visitorRepository.save(visitor);
    }
    async updateCheckOutTime(id) {
        const visitor = await this.visitorRepository.findOne({ where: { id } });
        if (!visitor) {
            throw new common_1.NotFoundException(`Visitor with id ${id} not found`);
        }
        visitor.checkOutTime = new Date();
        return this.visitorRepository.save(visitor);
    }
    parseDate(dateString) {
        if (!dateString)
            return null;
        const parsed = moment(dateString, 'DD-MM-YYYY HH:mm', true);
        return parsed.isValid() ? parsed.toDate() : null;
    }
    async bulkInsertVisitors(visitors) {
        const savedVisitors = [];
        for (const visitorData of visitors) {
            const { visitorName, companyName, email, number, purposeOfVisit, hostName, visitorImage, checkInTime, checkOutTime, } = visitorData;
            if (!visitorName?.trim() &&
                !email?.trim() &&
                !number?.trim() &&
                !companyName?.trim() &&
                !purposeOfVisit?.trim()) {
                continue;
            }
            const parsedCheckInTime = this.parseDate(checkInTime);
            const parsedCheckOutTime = this.parseDate(checkOutTime);
            const newVisitor = this.visitorRepository.create({
                visitorName,
                companyName,
                email,
                number,
                purposeOfVisit,
                hostName,
                visitorImage,
                checkInTime: parsedCheckInTime,
                checkOutTime: parsedCheckOutTime,
            });
            try {
                const saved = await this.visitorRepository.save(newVisitor);
                savedVisitors.push(saved);
            }
            catch (error) {
                console.error(`❌ Error saving visitor (${email || 'no-email'}):`, error);
            }
        }
        console.log('✅ Visitors saved in bulk:', savedVisitors.length);
        return savedVisitors;
    }
};
exports.VisitorService = VisitorService;
exports.VisitorService = VisitorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(visitor_entity_1.Visitor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VisitorService);
//# sourceMappingURL=visitor.service.js.map