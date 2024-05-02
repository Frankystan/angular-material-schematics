import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FabEditPostComponent } from '@layout/fab-edit-post/fab-edit-post.component';
import { SanitizePipe } from '@shared/pipes/sanitize.pipe';
import { MomentModule } from 'ngx-moment';
import { TimeagoModule } from 'ngx-timeago';

@Component({
    selector: 'app-test',
    standalone: true,
    imports: [
        MatCardModule,
        MatIconModule,
        MomentModule,
        MatDividerModule,
        MatChipsModule,
        MatButtonModule,
        SanitizePipe,
        FabEditPostComponent,
        NgStyle,
        TimeagoModule,
    ],
    templateUrl: './test.component.html',
    styleUrl: './test.component.scss',
})
export class TestComponent {}
