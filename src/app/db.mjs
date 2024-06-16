import { Prisma, PrismaClient } from '@prisma/client'
import { logger } from './logging.mjs'
import stripAnsi from 'strip-ansi'

export const prisma = Prisma

export const prismaClient = new PrismaClient({
    errorFormat: 'pretty',
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
})

prismaClient.$on('error', (e) => {
    logger.error(e)
    console.log(stripAnsi(e.message))
})

prismaClient.$on('warn', (e) => {
    logger.warn(e)
})

prismaClient.$on('info', (e) => {
    logger.info(e)
})

prismaClient.$on('query', (e) => {
    logger.info(e)
})
