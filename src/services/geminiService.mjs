import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'
import { logger } from '../app/logging.mjs'

export const generateJournalResponse = async () => {
    const MODEL_NAME = 'gemini-1.0-pro'
    const { API_KEY } = process.env

    if (!API_KEY) {
        logger.info('Please provide the API_KEY..')
        return
    }

    const genAI = new GoogleGenerativeAI(API_KEY)
    const model = genAI.getGenerativeModel({ model: MODEL_NAME })
    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    }

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ]

    const parts = [
        {
            text: `Saya memiliki sebuah journaling yang saya tulis mengenai komitment saya terhadap perjalanan saya dalam berhenti merokok. Adapun journaling komitment saya pada hari ini adalah sebabagai berikut: "Saya ingin berhenti merokok karena saya ingin menghemat pengeluaran asya". Tolong buatkan pesan motivasi berdasarkan journaling di atas yang akan saya tampilkan di notifikasi hp saya setiap 6 jam sekali. Adapun tolong berikan dalam bentuk JSON yang terdiri dari id dan pesannya.`,
        },
    ]

    const result = await model.generateContent({
        contents: [{ role: 'user', parts }],
        generationConfig,
        safetySettings,
    })

    const { response } = result
    return response.text()
}
