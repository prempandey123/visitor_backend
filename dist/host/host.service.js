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
exports.HostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const host_entity_1 = require("./host.entity");
let HostService = class HostService {
    constructor(hostRepository) {
        this.hostRepository = hostRepository;
    }
    async findHostByEmail(email) {
        return this.hostRepository.findOne({ where: { email } });
    }
    async createHost(createHostDto) {
        const { email, name, number, password, designation } = createHostDto;
        const existingHost = await this.findHostByEmail(email);
        if (existingHost) {
            throw new common_1.ConflictException('A host with this email already exists.');
        }
        const host = this.hostRepository.create({ email, name, number, password, designation });
        try {
            return await this.hostRepository.save(host);
        }
        catch (error) {
            console.error('Error saving host:', error);
            throw new common_1.InternalServerErrorException('Error saving host');
        }
    }
    async addMultipleHosts(hosts) {
        try {
            return await this.hostRepository.save(hosts);
        }
        catch (error) {
            console.error('Error saving multiple hosts:', error);
            throw new common_1.InternalServerErrorException('Bulk save failed');
        }
    }
    async findAllHosts() {
        try {
            return this.hostRepository.find();
        }
        catch (error) {
            console.error('Error finding hosts:', error);
            throw new common_1.InternalServerErrorException('Error finding hosts');
        }
    }
    async updateHost(id, updateHostDto) {
        const host = await this.hostRepository.findOne({ where: { id } });
        if (!host) {
            throw new common_1.NotFoundException(`Host with id ${id} not found`);
        }
        Object.assign(host, updateHostDto);
        try {
            return await this.hostRepository.save(host);
        }
        catch (error) {
            console.error('Error updating host:', error);
            throw new common_1.InternalServerErrorException('Error updating host');
        }
    }
    async deleteHost(id) {
        try {
            const result = await this.hostRepository.delete(id);
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Host with id ${id} not found`);
            }
        }
        catch (error) {
            console.error('Error deleting host:', error);
            throw new common_1.InternalServerErrorException('Error deleting host');
        }
    }
    async searchHostsByName(query) {
        if (!query || query.length < 2)
            return [];
        return this.hostRepository.find({
            where: {
                name: (0, typeorm_2.ILike)(`%${query}%`),
            },
            take: 10,
        });
    }
};
exports.HostService = HostService;
exports.HostService = HostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(host_entity_1.Host)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HostService);
//# sourceMappingURL=host.service.js.map