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
var Rx_1 = require("rxjs/Rx");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var AuthRepository = (function () {
    function AuthRepository(http) {
        this.http = http;
        console.log('repository', this.http);
    }
    AuthRepository.prototype.login = function (username, password) {
        return this.http.post('backend/web/v1/auth/login', JSON.stringify({ username: username, password: password }))
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    AuthRepository.prototype.signup = function (username, password, email) {
        return this.http.post('backend/web/v1/auth/signup', JSON.stringify({ username: username, password: password, email: email }))
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    AuthRepository.prototype.logout = function () {
        this.http.get('backend/web/v1/auth/logout');
    };
    return AuthRepository;
}());
AuthRepository = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthRepository);
exports.AuthRepository = AuthRepository;

//# sourceMappingURL=auth.repository.js.map
