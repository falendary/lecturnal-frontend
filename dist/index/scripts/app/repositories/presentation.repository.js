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
var url_helper_1 = require("../helpers/url.helper");
var cookie_service_1 = require("../services/cookie.service");
var PresentationRepository = (function () {
    function PresentationRepository(http) {
        this.http = http;
    }
    PresentationRepository.prototype.getList = function (parameters) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + cookie_service_1.CookieService.getCookie('token') });
        var options = new http_1.RequestOptions({ headers: headers });
        var parametersString = '';
        if (parameters) {
            parametersString = url_helper_1.UrlHelper.createQueryParamtersString(parameters);
        }
        return this.http.get('backend/web/v1/presentations' + parametersString, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    PresentationRepository.prototype.getByKey = function (presentationId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + cookie_service_1.CookieService.getCookie('token') });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get('backend/web/v1/presentations/' + presentationId, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    PresentationRepository.prototype.update = function (item, presentationId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + cookie_service_1.CookieService.getCookie('token') });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put('backend/web/v1/presentations/' + presentationId, JSON.stringify(item), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    PresentationRepository.prototype.create = function (item) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + cookie_service_1.CookieService.getCookie('token') });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('backend/web/v1/presentations', JSON.stringify(item), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    PresentationRepository.prototype.deleteByKey = function (presentationId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + cookie_service_1.CookieService.getCookie('token') });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.delete('backend/web/v1/presentations/' + presentationId, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    return PresentationRepository;
}());
PresentationRepository = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PresentationRepository);
exports.PresentationRepository = PresentationRepository;

//# sourceMappingURL=presentation.repository.js.map
