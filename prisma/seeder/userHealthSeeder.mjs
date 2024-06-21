import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const seedUserHealths = async () => {
    await prisma.userHealth.createMany({
        data: [
            {
                user_id: 'user-id-1',
                date_of_birth: new Date(567993600).toISOString(), // Example date
                gender: 'Male',
                smoking_start_time: 10,
                is_nicotine_med: true,
                is_e_cigarette: 0,
                first_cigarette_date: new Date(1325376000).toISOString(), // Example date
                is_depressed: false,
                is_other_tobacco: 0,
                is_spirit: true,
                cigarettes_per_day: 20,
                cigarettes_per_pack: 20,
                pack_price: 5.0,
                motivation: 'Quit smoking',
                last_7_days: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
            {
                user_id: 'user-id-2',
                date_of_birth: new Date(567993600).toISOString(), // Example date
                gender: 'Female',
                smoking_start_time: 5,
                is_nicotine_med: false,
                is_e_cigarette: 1,
                first_cigarette_date: new Date(1325376000).toISOString(), // Example date
                is_depressed: true,
                is_other_tobacco: 1,
                is_spirit: false,
                cigarettes_per_day: 15,
                cigarettes_per_pack: 25,
                pack_price: 6.0,
                motivation: 'Improve health',
                last_7_days: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
        ],
    })
}

export default seedUserHealths
