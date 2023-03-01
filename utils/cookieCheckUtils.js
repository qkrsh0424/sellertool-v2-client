import Cookies from 'js-cookie';
const isAnonymous = () => {
    let cookie = Cookies.get('st_auth_exp');
    if (!cookie) {
        return true;
    }

    if (cookie !== 'st_auth_exp') {
        return true;
    }

    return false;
}

const hasCsrfToken = () => {
    let cookie = Cookies.get('auth_csrf');

    if (!cookie) {
        return false;
    }
    return true
}

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
    isAnonymous,
    hasCsrfToken,
    getCookieExpiration,
    isValidCookieDuration
}