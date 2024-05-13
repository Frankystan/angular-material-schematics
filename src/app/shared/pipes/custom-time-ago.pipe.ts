import {
    ChangeDetectorRef,
    OnDestroy,
    Pipe,
    PipeTransform,
} from '@angular/core';
import {
    TimeagoClock,
    TimeagoFormatter,
    TimeagoIntl,
    TimeagoPipe,
} from 'ngx-timeago';
import { Subject, filter } from 'rxjs';
import { coerceBooleanProperty, dateParser, isDefined } from '@shared/utils';

/*
https://github.com/urish/ngx-moment/issues/138

original
/node_modules/ngx-timeago/esm2022/timeago.pipe.mjs

extiendo de esta clase que modifiqué sus properties de "private" > "protected"
/node_modules/ngx-timeago/timeago.pipe.d.ts
*/

@Pipe({
    name: 'customTimeAgo',
    standalone: true,
    pure: false,
})
export class CustomTimeAgoPipe
    extends TimeagoPipe
    implements PipeTransform, OnDestroy
{
    // private  override clock:any;
    // private  override intlSubscription:any;
    // private  override clockSubscription:any;
    // private  override date:any;
    // private  override value:any;
    // private  override live:any;
    constructor(
        intl: TimeagoIntl,
        cd: ChangeDetectorRef,
        formatter: TimeagoFormatter,
        clock: TimeagoClock,
    ) {
        super(intl, cd, formatter, clock);

        this.clock = clock;
        this.live = true;
        /**
         * Emits on:
         * - Input change
         * - Intl change
         * - Clock tick
         */
        this.stateChanges = new Subject();
        if (intl) {
            this.intlSubscription = intl.changes.subscribe(() =>
                this.stateChanges.next(),
            );
        }
        this.stateChanges.subscribe(() => {
            this.value = formatter.format(this.date);
            cd.markForCheck();
        });
    }

    override transform(date: string | Date | number, ...args: any[]) {
        const _date = dateParser(date).valueOf();
        let _live;
        _live = isDefined(args[0]) ? coerceBooleanProperty(args[0]) : this.live;
        if (this.date === _date && this.live === _live) {
            return this.value;
        }
        this.date = _date;
        this.live = _live;
        if (this.date) {
            if (this.clockSubscription) {
                this.clockSubscription.unsubscribe();
                this.clockSubscription = undefined;
            }
            this.clockSubscription = this.clock
                .tick(this.date)
                .pipe(filter(() => this.live, this))
                .subscribe(() => this.stateChanges.next());
            this.stateChanges.next();
        } else {
            return '';
            throw new SyntaxError(
                `Wrong parameter in TimeagoPipe. Expected a valid date, received: ${date}`,
            );
        }
        return this.value;
    }
}
