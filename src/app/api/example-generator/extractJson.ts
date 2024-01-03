export const extractJson = (string: string) => {
    const jsonPattern = /<json>(.*?)<\/json>/s

    const match = string.match(jsonPattern);

    if (match) {
        try {
            return JSON.parse(match[1]);
        } catch (error) {
            return null
        }
    } else {
        return null
    }

}