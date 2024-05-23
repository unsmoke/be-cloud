import dotenv from 'dotenv';
dotenv.config();
import { web } from "./app/web.mjs";
import { logger } from "./app/logging.mjs";


const PORT = process.env.PORT || 8000
const HOST = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';

web.listen(PORT, HOST, () => {
    logger.info(`Server is up and listening on ${HOST}:${PORT}`);
});
