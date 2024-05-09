import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
// import { TimeAgoPipe } from 'ngx-moment';
import { TimeagoClock, TimeagoFormatter, TimeagoIntl, TimeagoPipe } from 'ngx-timeago';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";


/*
https://github.com/urish/ngx-moment/issues/138
https://github.com/urish/ngx-moment/issues/138
*/

@Pipe({
    name: 'customTimeAgo',
    standalone: true
})
export class CustomTimeAgoPipe extends TimeagoPipe implements PipeTransform, OnDestroy {

    // override transform(value: moment.MomentInput, omitSuffix?: boolean, formatFn?: (m: moment.Moment) => string): string {
    //     if (!value) {
    //         return '-';
    //     }
    //     return super.transform(value, omitSuffix, formatFn);
    // }

  
    /**
     * Emits on:
     * - Input change
     * - Intl change
     * - Clock tick
    */
    override stateChanges: Subject<void>;
    constructor(intl: TimeagoIntl, cd: ChangeDetectorRef, formatter: TimeagoFormatter, clock: TimeagoClock){
        super();
    }
    override transform(date: any, ...args: any[]): string;
    override ngOnDestroy(): void;
    override static ɵfac: i0.ɵɵFactoryDeclaration<TimeagoPipe, [{ optional: true; }, null, null, null]>;
    override static ɵpipe: i0.ɵɵPipeDeclaration<TimeagoPipe, "timeago", false>;
    override static ɵprov: i0.ɵɵInjectableDeclaration<TimeagoPipe>;

}