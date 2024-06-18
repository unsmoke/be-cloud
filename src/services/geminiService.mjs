import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'
import { logger } from '../app/logging.mjs'
import { ResponseError } from '../utils/responseError.mjs'
import { errors } from '../utils/messageError.mjs'

export const generateJournalResponse = async () => {
    const MODEL_NAME = 'gemini-1.0-pro'
    const API_KEY = process.env.API_KEY_GEMINI

    if (!API_KEY) {
        throw new ResponseError(
            errors.HTTP.CODE.INTERNAL_SERVER_ERROR,
            errors.HTTP.STATUS.INTERNAL_SERVER_ERROR,
            'please provide the gemini api key'
        )
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

    const prompt = `Saya memiliki sebuah journaling yang saya tulis mengenai komitment saya terhadap perjalanan saya dalam berhenti merokok. Adapun journaling komitment saya pada hari ini adalah sebabagai berikut: "Saya ingin berhenti merokok karena saya ingin menghemat pengeluaran asya". Tolong buatkan pesan motivasi berdasarkan journaling di atas yang akan saya tampilkan di notifikasi hp saya setiap 6 jam sekali. Adapun tolong berikan dalam bentuk JSON yang terdiri dari id dan pesannya.`

    const parts = [
        {
            text: prompt,
        },
    ]

    const result = await model.generateContent({
        contents: [{ role: 'user', parts }],
        generationConfig,
        safetySettings,
    })

    const { response } = result

    const responseText = response.text()
    const jsonDataMatch = responseText.match(/```json\n([\s\S]*?)\n```/)

    if (jsonDataMatch && jsonDataMatch[1]) {
        return JSON.parse(jsonDataMatch[1])
    } else {
        throw new ResponseError(
            errors.HTTP.CODE.INTERNAL_SERVER_ERROR,
            errors.HTTP.STATUS.INTERNAL_SERVER_ERROR,
            'failed to parse the json response from gemini api'
        )
    }
}
