import { Pipe } from '@angular/core';

@Pipe({
    name: 'find_key'
})
/**
 * Pipe responsible for picking up the column and searching for the key in the object
 */
export class FindKeyPipe {
    
    transform(value: Object, field: string) {

        var indexPoint = field.indexOf('.');

        if (indexPoint > 0) {
            return this.transform(value[field.substring(0, indexPoint)], field.substring(indexPoint+1, field.length));
        }
        return value[field];
    }
}