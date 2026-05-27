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
exports.CreateHostDto = void 0;
const class_validator_1 = require("class-validator");
class CreateHostDto {
}
exports.CreateHostDto = CreateHostDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format' }),
    __metadata("design:type", String)
], CreateHostDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Name must be a string' }),
    __metadata("design:type", String)
], CreateHostDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Number must be a string' }),
    __metadata("design:type", String)
], CreateHostDto.prototype, "number", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters long' }),
    __metadata("design:type", String)
], CreateHostDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Designation must be a string' }),
    __metadata("design:type", String)
], CreateHostDto.prototype, "designation", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Department must be a string' }),
    __metadata("design:type", String)
], CreateHostDto.prototype, "department", void 0);
//# sourceMappingURL=createhost.dto.js.map