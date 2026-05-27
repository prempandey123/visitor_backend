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
exports.HostController = void 0;
const common_1 = require("@nestjs/common");
const host_service_1 = require("./host.service");
const createhost_dto_1 = require("./createhost.dto");
const updatehost_dto_1 = require("./updatehost.dto");
class SuccessResponse {
}
let HostController = class HostController {
    constructor(hostService) {
        this.hostService = hostService;
    }
    async create(createHostDto) {
        const host = await this.hostService.createHost(createHostDto);
        return { message: 'Host created successfully', data: host };
    }
    async getHosts(search) {
        if (search && search.length >= 2) {
            const results = await this.hostService.searchHostsByName(search);
            return {
                message: 'Matching hosts retrieved successfully',
                data: results,
            };
        }
        else {
            const hosts = await this.hostService.findAllHosts();
            return {
                message: 'All hosts retrieved successfully',
                data: hosts,
            };
        }
    }
    async addMultipleHosts(hosts) {
        const savedHosts = await this.hostService.addMultipleHosts(hosts);
        return { message: 'Hosts saved successfully', data: savedHosts };
    }
    async update(id, updateHostDto) {
        const host = await this.hostService.updateHost(id, updateHostDto);
        return { message: 'Host updated successfully', data: host };
    }
    async delete(id) {
        await this.hostService.deleteHost(id);
        return { message: 'Host deleted successfully', data: null };
    }
    async searchHosts(query) {
        const results = await this.hostService.searchHostsByName(query);
        return {
            message: 'Matching hosts retrieved successfully',
            data: results,
        };
    }
};
exports.HostController = HostController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createhost_dto_1.CreateHostDto]),
    __metadata("design:returntype", Promise)
], HostController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HostController.prototype, "getHosts", null);
__decorate([
    (0, common_1.Post)('bulk-upload'),
    __param(0, (0, common_1.Body)('hosts')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], HostController.prototype, "addMultipleHosts", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updatehost_dto_1.UpdateHostDto]),
    __metadata("design:returntype", Promise)
], HostController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HostController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HostController.prototype, "searchHosts", null);
exports.HostController = HostController = __decorate([
    (0, common_1.Controller)('hosts'),
    __metadata("design:paramtypes", [host_service_1.HostService])
], HostController);
//# sourceMappingURL=host.controller.js.map