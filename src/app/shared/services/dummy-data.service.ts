import { Injectable } from '@angular/core';
import { tPost } from '@shared/custom-types/custom.type';
import { faker } from '@faker-js/faker/locale/es';

@Injectable({
    providedIn: 'root',
})
export class DummyDataService {
    constructor() {}

    getOne(id: string): tPost {
        return {
            id: `${id}`,
            title: `${id} - ${faker.lorem.paragraph(1)}`,
            author: {
                displayName: faker.person.fullName(),
                uid: faker.string.uuid(),
                img: 'https://www.smashbros.com/wiiu-3ds/sp/images/character/toon_link/main.png',
            },
            // createdAt: faker.date.anytime().toLocaleDateString(),
            created_at: 1549981020,
            content: faker.lorem.paragraph(3),
            tags: ['pokemon', 'scarlet', 'violet'],
            featured_image:
                'https://www.smashbros.com/wiiu-3ds/sp/images/character/toon_link/main.png',
        };
    }

    getAll(): tPost[] {
        // DUMMY DATA
        return Array.from({ length: 100 }).map((value, i) => {
            return {
                id: `${i + 1}`,
                title: `${i + 1} - ${faker.lorem.paragraph(1)}`,
                author: {
                    displayName: faker.person.fullName(),
                    uid: faker.string.uuid(),
                    img: 'https://www.smashbros.com/wiiu-3ds/sp/images/character/toon_link/main.png',
                },
                // createdAt: faker.date.anytime().toLocaleDateString(),
                created_at: 1549981020,
                content: faker.lorem.paragraph(3),
                tags: ['pokemon', 'scarlet', 'violet'],
                featured_image:
                    'https://www.smashbros.com/wiiu-3ds/sp/images/character/toon_link/main.png',
            };
        });
    }
}
