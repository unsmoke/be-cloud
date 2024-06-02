import dotenv from 'dotenv'
import {web} from './app/web.mjs'
import {logger} from './app/logging.mjs'

dotenv.config()

const PORT = process.env.PORT || 8080

web.listen(PORT, () => {
    logger.info(`Server is up and listening on ${PORT}`)
})
