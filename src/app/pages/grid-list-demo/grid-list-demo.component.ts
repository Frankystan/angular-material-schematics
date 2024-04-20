import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

/*

https://github.com/angular/components/blob/main/src/dev-app/grid-list/grid-list-demo.html
*/

@Component({
    selector: 'app-grid-list-demo',
    standalone: true,
    imports: [
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
    ],
    templateUrl: './grid-list-demo.component.html',
    styleUrl: './grid-list-demo.component.scss',
})
export class GridListDemoComponent {
    tiles: { text: string; cols: number; rows: number; color: string }[] = [
        { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
        { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
        { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
        { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
    ];

    dogs: { name: string; human: string }[] = [
        { name: 'Porter', human: 'Kara' },
        { name: 'Mal', human: 'Jeremy' },
        { name: 'Koby', human: 'Igor' },
        { name: 'Razzle', human: 'Ward' },
        { name: 'Molly', human: 'Rob' },
        { name: 'Husi', human: 'Matias' },
    ];

    images = [
        'nature',
        'sky',
        'grass',
        'mountains',
        'rivers',
        'glacier',
        'forest',
        'streams',
        'rain',
        'clouds',
    ];

    basicRowHeight = 80;
    fixedCols = 4;
    fixedRowHeight = 100;
    ratioGutter = '1px';
    fitListHeight = '400px';
    ratio = '4:1';

    addTileCols() {
        this.tiles[2].cols++;
    }
}
