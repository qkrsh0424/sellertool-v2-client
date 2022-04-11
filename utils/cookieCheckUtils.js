import Cookies from 'js-cookie';
const isAnonymous = () =>{
    let cookie = Cookies.get('st_auth_exp');
    if(!cookie){
        return true;
    }

    if(cookie !== 'st_auth_exp'){
        return true;
    }

    return false;
}

const hasCsrfToken = () =>{
    let cookie = Cookies.get('auth_csrf');

    if(!cookie){
        return false;
    }
    return true
}
export {
    isAnonymous,
    hasCsrfToken
}