import { Directive, HostListener, Input, ElementRef, Renderer } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Directive( {
    selector: '[money]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: MoneyDirective,
        multi: true
    },
        DecimalPipe
    ]
})
export class MoneyDirective implements ControlValueAccessor {

    constructor(private elementRef: ElementRef, private decimalPipe: DecimalPipe, private renderer: Renderer) {
    }

    onTouched: any;

    onChange: any;


    writeValue( value: any ): void {

        if (value != '') {
            value = this.decimalPipe.transform(value);
        }
        
        this.elementRef.nativeElement.value = value;
    }


    registerOnChange( fn: any ): void {
        this.onChange = fn;
    }


    registerOnTouched( fn: any ): void {
        this.onTouched = fn;
    }


    @HostListener( 'keyup', ['$event'] )
    onKeyup( $event: any ) {

        // input money
        const target = $event.target;
        // value input money
        const value:string  = target.value.replace(/\D/g, '');

        var cents = value.substring(value.length-2, value.length);
        var real = value.substring(0, value.length-2);

        var money: string = '';
        for (var i=real.length; i > 0; i-=3) {
            money = value.substring(i-3, i) + '.' + money;
        }
        money = money.replace(/\.$/g, ',') + cents;

        var inputValue = money.replace(/\./g, '').replace(/,/g, '.');

        // input visual
        target.value = money;

        // value of output
        this.onChange(inputValue);
    }

    @HostListener( 'blur', ['$event'] )
    onBlur( $event: any ) {
        //TODO melhorar regex pois não está tratando ",,,,,," "......."
        if (/[^,\.\d]/g.test($event.target.value)) {
            this.onChange('');
            $event.target.value = '';
        }
        this.renderer.setElementClass($event.target, 'ng-touched', true);
        this.renderer.setElementClass($event.target, 'ng-untouched', false);
    }
}