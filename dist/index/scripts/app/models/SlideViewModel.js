"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SlideViewModel = (function () {
    function SlideViewModel(slide) {
        this.isActive = false;
        this.id = slide.id;
        this.created_at = slide.created_at;
        this.updated_at = slide.updated_at;
        this.presentation_id = slide.presentation_id;
        this.content = slide.content;
        this.isActive = false;
    }
    return SlideViewModel;
}());
exports.SlideViewModel = SlideViewModel;

//# sourceMappingURL=SlideViewModel.js.map
