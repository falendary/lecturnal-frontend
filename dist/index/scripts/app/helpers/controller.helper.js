"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ControllerHelper = (function () {
    function ControllerHelper() {
    }
    ControllerHelper.check = function (readyStatus) {
        for (status in readyStatus) {
            if (readyStatus.hasOwnProperty(status)) {
                if (readyStatus[status] == false) {
                    return false;
                }
            }
        }
        return true;
    };
    return ControllerHelper;
}());
exports.ControllerHelper = ControllerHelper;
var ReadyStatus = (function () {
    function ReadyStatus() {
    }
    return ReadyStatus;
}());

//# sourceMappingURL=controller.helper.js.map
