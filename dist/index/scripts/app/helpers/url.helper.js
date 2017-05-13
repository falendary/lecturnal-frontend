"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UrlHelper = (function () {
    function UrlHelper() {
    }
    UrlHelper.createQueryParamtersString = function (parameters) {
        var parametersString = '?';
        for (var i = 0; i < parameters.length; i = i + 1) {
            if (i == parameters.length - 1) {
                parametersString = parametersString + parameters[i].key + '=' + parameters[i].key;
            }
            else {
                parametersString = parametersString + parameters[i].key + '=' + parameters[i].key + '&';
            }
        }
        return parametersString;
    };
    return UrlHelper;
}());
exports.UrlHelper = UrlHelper;

//# sourceMappingURL=url.helper.js.map
