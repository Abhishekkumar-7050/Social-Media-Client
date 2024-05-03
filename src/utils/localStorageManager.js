export const KEY_ACCESS_TOKEN = "access_Token"

// console.log(localStorage);

export function getItem(key){
    return window.localStorage.getItem(key);
}

export function setItem(key, value){
    return window.localStorage.setItem(key, value);
}

export function removeItem(key){
    return  window.localStorage.removeItem(key);
}