import { prismaClient } from '../../src/app/db.mjs'

const itemsData = [
    {
        name: 'Apple',
        description: 'Good apple',
        price: 100,
        img_url: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
        lung_url:
            'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
    },
    {
        name: 'Orange',
        description: 'Good orange',
        price: 500,
        img_url: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
        lung_url:
            'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
    },
    {
        name: 'Grape',
        description: 'Good grape',
        price: 1000,
        img_url: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
        lung_url:
            'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
    },
    {
        name: 'Watermelon',
        description: 'Good watermelon',
        price: 200,
        img_url: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
        lung_url:
            'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
    },
    {
        name: 'Yuzu',
        description: 'Good yuzu',
        price: 400,
        img_url: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
        lung_url:
            'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
    },
]

const seedItems = async () => {
    for (const item of itemsData) {
        await prismaClient.item.create({ data: item })
    }
}

export default seedItems
