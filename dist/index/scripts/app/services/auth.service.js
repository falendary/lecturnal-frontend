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
var core_1 = require("@angular/core");
var cookie_service_1 = require("./cookie.service");
var auth_repository_1 = require("../repositories/auth.repository");
var AuthService = (function () {
    function AuthService(authRepository) {
        this.authRepository = authRepository;
    }
    AuthService.prototype.isAuthorized = function () {
        return !!cookie_service_1.CookieService.getCookie('token');
    };
    AuthService.prototype.login = function (username, password) {
        return this.authRepository.login(username, password);
    };
    AuthService.prototype.signup = function (username, password, email) {
        return this.authRepository.signup(username, password, email);
    };
    AuthService.prototype.logout = function () {
        cookie_service_1.CookieService.deleteCookie('token');
        this.authRepository.logout();
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository])
], AuthService);
exports.AuthService = AuthService;

//# sourceMappingURL=auth.service.js.map
