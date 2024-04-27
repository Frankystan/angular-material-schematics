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
            id: '70',
            title: 'Pokemon Scarlet and Violet',
            content: `<p style="margin: 0cm 0cm 0.0001pt; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; color: #212121; text-decoration-color: initial;"><span style="font-size: 11pt; font-family: Calibri, sans-serif; color: #1f497d;">Buenos días,</span></p><p style="margin: 0cm 0cm 0.0001pt; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; color: #212121; text-decoration-color: initial;"><span style="font-size: 11pt; font-family: Calibri, sans-serif; color: #1f497d;">&nbsp;</span></p><p style="margin: 0cm 0cm 0.0001pt; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; color: #212121; text-decoration-color: initial;"><span style="font-size: 11pt; font-family: Calibri, sans-serif; color: #1f497d;">Por favor, mientras no corrigen las facturas de enero de Canarias, a responder a los clientes:</span></p><p style="margin: 0cm 0cm 0.0001pt; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; color: #212121; text-decoration-color: initial;"><span style="font-size: 11pt; font-family: Calibri, sans-serif; color: #1f497d;">&nbsp;</span></p><p style="margin: 0cm 0cm 0.0001pt; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; color: #212121; text-decoration-color: initial;"><em><span style="font-size: 11pt; font-family: Calibri, sans-serif; color: #1f497d;">“su factura se generó con el 7% de IGIC porque la comunicación de la bajada del mismo al 6,5% no se había realizado en el momento en el que emitimos la factura. Estamos realizando las modificaciones oportunas para que esta factura se corrija, en cuanto la tengamos le enviaremos la comunicación vía e-mail”</span></em></p><p style="margin: 0cm 0cm 0.0001pt; font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; color: #212121; text-decoration-color: initial;"><span style="font-size: 11pt; font-family: Calibri, sans-serif; color: #1f497d;">(Aprovechamos para verificar la dirección)</span></p>`,
            author: {
                displayName: faker.person.fullName(),
                uid: faker.string.uuid(),
                img: 'https://www.smashbros.com/wiiu-3ds/sp/images/character/toon_link/main.png',
            },
            // createdAt: faker.date.anytime().toLocaleDateString(),
            created_at: 1549981020,
            featured_image:
                'https://pokemon-project.com/img/web/escarlata_purpura.webp',
            tags: ['pokemon', 'scarlet', 'violet'],
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
