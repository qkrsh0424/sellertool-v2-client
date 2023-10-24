export const CustomURIEncoderUtils = () => {
    return {
        encodeJSONList: (value) => {
            try {
                return encodeURIComponent(JSON.stringify(value))
            } catch (err) {
                return null;
            }
        },
        decodeJSONList: (value) => {
            try {
                return JSON.parse(decodeURIComponent(value));
            } catch (err) {
                return [];
            }
        }
    }
}