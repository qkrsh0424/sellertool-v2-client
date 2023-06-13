const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const eventUtils = {
    delay
}
// export function eventUtils() {
//     return {
//         delay
//     }
// }