const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const EventUtils = {
    delay: delay
}