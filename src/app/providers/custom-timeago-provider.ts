import {
    EnvironmentProviders,
    Provider,
    importProvidersFrom,
} from '@angular/core';
import {
    TimeagoModule,
    TimeagoIntl,
    TimeagoFormatter,
    TimeagoCustomFormatter,
    TimeagoDefaultClock,
    TimeagoClock,
} from 'ngx-timeago';

// export const provideCustomTimeago: EnvironmentProviders = importProvidersFrom(
//     TimeagoModule.forRoot(
//         {
//             formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
//             // clock: { provide: TimeagoClock, useClass: TimeagoDefaultClock },
//         }
//     )
// );

export const provideCustomTimeago: EnvironmentProviders = importProvidersFrom(
    TimeagoModule.forRoot({
        formatter: {
            provide: TimeagoFormatter,
            useClass: TimeagoCustomFormatter,
        },
        // formatter: { provide: TimeagoFormatter, useClass: CustomFormatter },
        clock: { provide: TimeagoClock, useClass: TimeagoDefaultClock },
        intl: { provide: TimeagoIntl, useClass: TimeagoIntl },
    }),
);
