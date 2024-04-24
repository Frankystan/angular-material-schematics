import { Component, inject } from '@angular/core';
import { tPost } from '@app/custom-types/custom.type';
import { DummyDataService } from '@app/services/dummy-data.service';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
})
export class CardComponent {
    #dummyDataService = inject(DummyDataService);

    item:tPost = this.#dummyDataService.getOne("70");
}
