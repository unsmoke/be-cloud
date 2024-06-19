import crypto from 'crypto'

export const generateToken = () => {
    return Math.floor(100000 + Math.random() * 900000).toString() // 6-digit token
}
