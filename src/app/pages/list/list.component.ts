import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { faker } from '@faker-js/faker/locale/es';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterModule, MatCardModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  // DUMMY DATA
  list: Array<any> = Array.from({ length: 100 }).map((value, i) => {
    return {
      id: `${i + 1}`,
      title: `${i + 1} - ${faker.lorem.paragraph(1)}`,
      author: {
        displayName: faker.person.fullName(),
        uid: faker.string.uuid(),
      },
      created_at: faker.date.anytime().toLocaleDateString(),
      content: faker.lorem.paragraph(3),
      image: faker.image.avatar(),
    };
  });
}
