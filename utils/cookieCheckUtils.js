function getCookieExpiration(cookieName) {
    const cookieValue = `; ${document.cookie}`;
    const parts = cookieValue.split(`; ${cookieName}=`);
    let expiration = null;

    if (parts.length === 2) {
        const cookieContent = parts.pop().split(';').shift();
        const decodedCookieContent = decodeURIComponent(cookieContent);
        expiration = new Date(decodedCookieContent);
    }

    return isNaN(Date.parse(expiration)) ? null : expiration;
}

function isValidCookieDuration(idate) {
    let expiration = new Date(idate);
    return expiration !== null && new Date() < expiration;
}

export {
    getCookieExpiration,
    isValidCookieDuration
}