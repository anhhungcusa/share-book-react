import {decode} from 'jsonwebtoken'
export const setSStorage = (key, value) => {
    let store = {value}
        store = JSON.stringify(store)
    sessionStorage.setItem(key, store)
}

export const getSStorage = key => {
    let store = sessionStorage.getItem(key)
    store = JSON.parse(store)
    return store.value
}

export const removeSStorage = key => sessionStorage.removeItem(key)

export const SessionService = {
    setSStorage,
    getSStorage,
    removeSStorage
}

export const setCookie = (key, jwtToken, exp) => {
    const decoded = decode(jwtToken)
    let expires = exp || new Date(decoded.exp * 1000)
    expires = expires.toUTCString()
    document.cookie = `${key}=${jwtToken}; expires=${expires}`
    
}

export const getCookie = key => {
    var name = key + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return false;
}

export const removeCookie = key => {
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const CookieService = {
    getCookie,
    setCookie,
    removeCookie
}