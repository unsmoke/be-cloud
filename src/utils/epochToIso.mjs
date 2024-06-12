export const epochToIso = (epoch) => {
    const date = new Date(epoch * 1000)
    return date.toISOString().slice(0, 19) + 'Z'
}
