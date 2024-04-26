// import { AuthService } from '@shared/services/auth.service';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
// import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-verify-email',
    standalone: true,
    imports: [
        MatCardModule,
        MatButtonModule,
        // TranslateModule,
        MatIconModule,
        RouterModule,
    ],
    templateUrl: './verify-email.component.html',
    styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent {
    // #auth = inject(AuthService);

    // user$: Observable<any> = this.#auth.user$;

    // user = toSignal(this.user$, { initialValue: null });

    onClick() {
        console.log(
            '🚀 ~ VerifyEmailComponent ~ onClick ~ onClick: this.#auth.sendEmailVerification',
        );
        // this.#auth.sendEmailVerification();
    }
}
