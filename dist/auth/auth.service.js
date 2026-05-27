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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const host_entity_1 = require("../host/host.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const host_service_1 = require("../host/host.service");
let AuthService = class AuthService {
    constructor(hostRepository, jwtService, hostService) {
        this.hostRepository = hostRepository;
        this.jwtService = jwtService;
        this.hostService = hostService;
    }
    async register(createHostDto) {
        const newHost = this.hostRepository.create(createHostDto);
        return this.hostRepository.save(newHost);
    }
    async validateUser(email, password) {
        const host = await this.hostService.findHostByEmail(email);
        if (host && host.password === password) {
            return host;
        }
        return null;
    }
    async login(host) {
        const payload = { email: host.email, sub: host.id };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: host.id,
                name: host.name,
                email: host.email,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(host_entity_1.Host)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        host_service_1.HostService])
], AuthService);
//# sourceMappingURL=auth.service.js.map