import {Directive, ElementRef, EventEmitter} from '@angular/core';
import {Input, Output} from '@angular/core';
import {OnChanges, SimpleChanges} from '@angular/core';

@Directive({
    selector: '[contenteditableModel]',
    host: {
        '(blur)': 'onEdit()',
        '(keyup)': 'onEdit()'
    }

})

export class ContentEditableDirective implements OnChanges {
    @Input('contenteditableModel') model:any;
    @Output('contenteditableModelChange') update = new EventEmitter();

    constructor(private elementRef:ElementRef) {

    }


    ngOnChanges(changes:SimpleChanges):void {

        if (changes.model.firstChange == true) {
            this.refreshView();
        }

    }

    public onEdit() {

        console.log('heeer?', this.model);

        let value:string = this.elementRef.nativeElement.innerHTML;
        this.update.emit(value);

    }

    public refreshView():void {

        this.elementRef.nativeElement.innerHTML = this.model;
    }

}