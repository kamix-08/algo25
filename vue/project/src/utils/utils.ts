export const formatPrice = (price: number): string => {
    const suffixes = ['', 'K', 'M', 'B', 'T']
    let suffixIndex = 0

    while (price >= 1000 && suffixIndex < suffixes.length - 1) {
        price /= 1000
        suffixIndex++
    }

    return `\$${price.toFixed(2)}${suffixes[suffixIndex]}`
}