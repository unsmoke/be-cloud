export const epochToIso = (epoch) => {
    const date = new Date(epoch)
    return date.toISOString()
}
