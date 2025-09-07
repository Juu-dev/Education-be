"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcryptjs"));
const _n_constants_1 = require("../../../constants/index");
const _n_exceptions_1 = require("../../../filter-exceptions/index");
const users_repository_1 = require("./users.repository");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async createUser(createUserDto) {
        const { password, ...rest } = createUserDto;
        const newUserData = {
            ...rest,
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        newUserData.password = hashedPassword;
        return this.usersRepository.create(newUserData);
    }
    async assignTeacher(assignments) {
        return this.usersRepository.assignTeacher(assignments);
    }
    async getListUser(page, pageSize) {
        const count = await this.usersRepository.count();
        const items = await this.usersRepository.findAllPagination({
            page,
            pageSize
        });
        return {
            page,
            pageSize,
            totalPage: Math.ceil(count / pageSize),
            count,
            items,
        };
    }
    async getListUserNotPagination() {
        const items = await this.usersRepository.findAll();
        return {
            count: items.length,
            items,
        };
    }
    async getListUserExceptStudent(id) {
        const items = await this.usersRepository.findAllExceptStudent(id);
        return {
            count: items.length,
            data: items,
        };
    }
    async getListLibrarianAndTeacher() {
        const items = await this.usersRepository.findAllLibrarianAndTeacher();
        return {
            count: items.length,
            data: items
        };
    }
    async getListTeacher() {
        const items = await this.usersRepository.findListTeacher();
        return {
            count: items.length,
            data: items
        };
    }
    async getUserById(id) {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.USER.USER_NOT_FOUND);
        }
        return user;
    }
    async updateUserById(id, updateUserDto) {
        const { password, ...rest } = updateUserDto;
        const updateUserData = {
            ...rest,
        };
        const getUserById = await this.usersRepository.findById(id);
        if (!getUserById) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.USER.USER_NOT_FOUND);
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateUserData.password = hashedPassword;
        }
        return this.usersRepository.updateById(id, updateUserData);
    }
    async updateStudentById(id, updateUserDto) {
        const getUserById = await this.usersRepository.findById(id);
        if (!getUserById) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.USER.USER_NOT_FOUND);
        }
        return this.usersRepository.updateStudentById(id, updateUserDto);
    }
    async deleteStudentById(id) {
        const student = await this.usersRepository.findById(id);
        if (!student) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.USER.USER_NOT_FOUND);
        }
        return this.usersRepository.softDeleteById(id);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map