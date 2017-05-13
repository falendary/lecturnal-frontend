"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CookieService = (function () {
    function CookieService() {
    }
    CookieService.getCookie = function (name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };
    CookieService.setCookie = function (name, value, options) {
        //console.log('options', options);
        options = options || {};
        var expires = options.expires;
        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(expires);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }
        value = encodeURIComponent(value);
        var updatedCookie = name + "=" + value;
        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }
        document.cookie = updatedCookie;
    };
    ;
    CookieService.deleteCookie = function (name) {
        CookieService.setCookie(name, "", { expires: -1 });
    };
    return CookieService;
}());
exports.CookieService = CookieService;

//# sourceMappingURL=cookie.service.js.map
