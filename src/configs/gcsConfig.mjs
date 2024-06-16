import dotenv from 'dotenv'
import { Storage } from '@google-cloud/storage'

dotenv.config()

const credentials = JSON.parse(process.env.GOOGLE_CLOUD_STORAGE_KEY)

const storage = new Storage({ credentials })

const bucketName = 'unsmoke-assets'
const bucket = storage.bucket(bucketName)

export { bucket }
