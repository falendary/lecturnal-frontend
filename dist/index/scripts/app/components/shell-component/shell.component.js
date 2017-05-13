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
var router_1 = require("@angular/router");
var auth_service_1 = require("../../services/auth.service");
require("rxjs/add/operator/filter");
var ShellComponent = (function () {
    function ShellComponent(router, authService) {
        var _this = this;
        this.router = router;
        console.log('ShellComponent init');
        this.authService = authService;
        this.router.events
            .filter(function (event) { return event instanceof router_1.NavigationStart; })
            .subscribe(function (event) {
            _this.currentState = event.url;
            if (!_this.authService.isAuthorized()) {
                if (event.url !== '/login' && event.url !== '/registration') {
                    _this.router.navigateByUrl('/login');
                }
            }
            else {
                if (event.url == '/login' || event.url == '/registration') {
                    _this.router.navigateByUrl('/');
                }
            }
            console.log('event', event);
        });
    }
    ShellComponent.prototype.isAuth = function () {
        var result = true;
        if (this.currentState != '/login' && this.currentState != '/registration') {
            result = false;
        }
        return result;
    };
    ShellComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigateByUrl('/login');
    };
    return ShellComponent;
}());
ShellComponent = __decorate([
    core_1.Component({
        selector: 'shell',
        template: 'shell.component.html',
        providers: [auth_service_1.AuthService]
    }),
    __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService])
], ShellComponent);
exports.ShellComponent = ShellComponent;

//# sourceMappingURL=shell.component.js.map
