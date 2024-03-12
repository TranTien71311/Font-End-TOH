import  hmac from 'js-crypto-hmac';

export async function createGetToken(uri, secretKey){
  const msg = new TextEncoder("utf-8").encode(uri);
  const key = new TextEncoder("utf-8").encode(secretKey);
  const hash = 'SHA-256';
  let hex = await hmac.compute(key, msg, hash).then( (hmac) => {
    return toHexString(hmac);
  })
  return hex;
}

export async function createPostToken(uri, data, secretKey) {
  const _msg = uri + "." + data;
  const msg = new TextEncoder("utf-8").encode(_msg);
  const key = new TextEncoder("utf-8").encode(secretKey);
  const hash = 'SHA-256';
  let hex = await hmac.compute(key, msg, hash).then( (hmac) => {
    return toHexString(hmac);
  });
  return hex;
}

const toHexString = (bytes) => {
  return Array.from(bytes, (byte) => {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
};

export function setSession(sessionName,value){
  localStorage.setItem(sessionName,value);
}

export function getSession(sessionName){
  return localStorage.getItem(sessionName);
}

export function removeSession(sessionName){
  localStorage.removeItem(sessionName);
}
export function removeAllSession(){
  localStorage.clear();
}
export function setSessionUri(value){
  localStorage.setItem("uriSession",value);
}
export function formatVND(number){
  return number.toLocaleString('vi', {style : 'currency', currency : 'VND'})
}
