import { Pipe } from '@angular/core';

@Pipe({
    name: 'truncate'
})
/**
 * TODO documentar
 */
export class TruncatePipe {
    transform( value: string, limit: number = 10, trail: string = '...' ): string {
        if ( value ) {
            return value.length > limit ? value.substring( 0, limit ) + trail : value;
        }
        return null;
    }
}