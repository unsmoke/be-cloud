import { prismaClient } from '../../src/app/db.mjs'

const itemsData = [
    {
        name: 'Morning Breath',
        description: 'Start your day refreshed',
        price: 678,
        img_url: 'https://storage.googleapis.com/unsmoke-assets/items/morning-breath-item.svg',
        lung_url: 'https://storage.googleapis.com/unsmoke-assets/lungs/morning-breath-lung.svg',
    },
    {
        name: 'Fresh Start',
        description: 'Embrace new beginnings daily',
        price: 1520,
        img_url: 'https://storage.googleapis.com/unsmoke-assets/items/fresh-start-item.svg',
        lung_url: 'https://storage.googleapis.com/unsmoke-assets/lungs/fresh-start-lung.svg',
    },
    {
        name: 'Pure Blossom',
        description: 'Feel the purity within',
        price: 1050,
        img_url: 'https://storage.googleapis.com/unsmoke-assets/items/pure-blossom-item.svg',
        lung_url: 'https://storage.googleapis.com/unsmoke-assets/lungs/pure-blossom-lung.svg',
    },
    {
        name: 'Clean Air',
        description: 'Breathe deeply and cleanly',
        price: 1299,
        img_url: 'https://storage.googleapis.com/unsmoke-assets/items/clean-air-item.svg',
        lung_url: 'https://storage.googleapis.com/unsmoke-assets/lungs/clean-air-lung.svg',
    },
    {
        name: 'Breathe Easy',
        description: 'Comfort in every breath',
        price: 437,
        img_url: 'https://storage.googleapis.com/unsmoke-assets/items/breathe-easy-item.svg',
        lung_url: 'https://storage.googleapis.com/unsmoke-assets/lungs/breathe-easy-lung.svg',
    },
    {
        name: 'New Dawn',
        description: 'Awaken to freshness anew',
        price: 1890,
        img_url: 'https://storage.googleapis.com/unsmoke-assets/items/new-dawn-item.svg',
        lung_url: 'https://storage.googleapis.com/unsmoke-assets/lungs/new-dawn-lung.svg',
    },
    {
        name: 'Blossom Breeze',
        description: 'Gentle breezes of spring',
        price: 982,
        img_url: 'https://storage.googleapis.com/unsmoke-assets/items/blossom-breeze-item.svg',
        lung_url: 'https://storage.googleapis.com/unsmoke-assets/lungs/blossom-breeze-lung.svg',
    },
    {
        name: 'Fresh Bloom',
        description: 'Bloom with every breath',
        price: 1327,
        img_url: 'https://storage.googleapis.com/unsmoke-assets/items/fresh-bloom-item.svg',
        lung_url: 'https://storage.googleapis.com/unsmoke-assets/lungs/fresh-bloom-lung.svg',
    },
    {
        name: 'Clear Skies',
        description: 'Unlimited horizons ahead',
        price: 1630,
        img_url: 'https://storage.googleapis.com/unsmoke-assets/items/clear-skies-item.svg',
        lung_url: 'https://storage.googleapis.com/unsmoke-assets/lungs/clear-skies-lung.svg',
    },
]

const seedItems = async () => {
    for (const item of itemsData) {
        await prismaClient.item.create({ data: item })
    }
}

export default seedItems
