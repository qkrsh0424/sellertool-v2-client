export function Base64Utils() {
    const encodeBase64 = (data) => {
        return Buffer.from(data).toString('base64');
    }
    const decodeBase64 = (data) => {
        return Buffer.from(data, 'base64').toString('ascii');
    }

    return {
        encodeBase64,
        decodeBase64
    }
}