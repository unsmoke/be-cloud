import dotenv from 'dotenv'
import { Storage } from '@google-cloud/storage'

dotenv.config()

const storage = new Storage()

const bucketName = 'unsmoke-assets'
const bucket = storage.bucket(bucketName)

export { bucket }
