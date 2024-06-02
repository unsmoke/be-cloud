import dotenv from 'dotenv'

dotenv.config()
import { web } from './app/web.mjs'
import { logger } from './app/logging.mjs'

const PORT = process.env.PORT || 8080

web.listen(PORT, () => {
    logger.info(`Server is up and listening on ${PORT}`)
})
