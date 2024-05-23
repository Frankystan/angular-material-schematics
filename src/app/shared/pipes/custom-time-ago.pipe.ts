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

extiendo de esta clase ç:
/node_modules/ngx-timeago/timeago.pipe.d.ts

    private clock:any;
    private intlSubscription:any;
    private clockSubscription:any;
    private date:any;
    private value:any;
    private live:any;

ya que las propiedades son "private" y no "protected" , para poder extender correctamente sin tocar la clase orignal del archivo anterior,
en cada uso de las propiedades ej: "this.clock" , uso (this as any).clock;
https://stackoverflow.com/questions/64083601/overriding-private-methods-in-typescript#:~:text=private%20member%20%22getMessage%22%20%F0%9F%99%80-,(this%20as%20any),-.getMessage%20%3D


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
    constructor(
        intl: TimeagoIntl,
        cd: ChangeDetectorRef,
        formatter: TimeagoFormatter,
        clock: TimeagoClock,
    ) {
        super(intl, cd, formatter, clock);

        (this as any).clock = clock;
        (this as any).live = true;
        /**
         * Emits on:
         * - Input change
         * - Intl change
         * - Clock tick
         */
        this.stateChanges = new Subject();
        if (intl) {
            (this as any).intlSubscription = intl.changes.subscribe(() =>
                this.stateChanges.next(),
            );
        }
        this.stateChanges.subscribe(() => {
            (this as any).value = formatter.format((this as any).date);
            cd.markForCheck();
        });
    }

    override transform(date: string | Date | number, ...args: any[]) {
        const _date = dateParser(date).valueOf();
        let _live;
        _live = isDefined(args[0])
            ? coerceBooleanProperty(args[0])
            : (this as any).live;
        if ((this as any).date === _date && (this as any).live === _live) {
            return (this as any).value;
        }
        (this as any).date = _date;
        (this as any).live = _live;
        if ((this as any).date) {
            if ((this as any).clockSubscription) {
                (this as any).clockSubscription.unsubscribe();
                (this as any).clockSubscription = undefined;
            }
            (this as any).clockSubscription = (this as any).clock
                .tick((this as any).date)
                .pipe(filter(() => (this as any).live, this))
                .subscribe(() => this.stateChanges.next());
            this.stateChanges.next();
        } else {
            return '';
            throw new SyntaxError(
                `Wrong parameter in TimeagoPipe. Expected a valid date, received: ${date}`,
            );
        }
        return (this as any).value;
    }
}
