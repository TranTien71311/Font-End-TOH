import axios from "axios"
import {createGetToken, createPostToken} from "../../codes/function"

let urlSite = 'https://localhost:44351'
let partnerKey = "UGl4ZWxTcWxUT0g="
let serectKey = "221278"

export function getImageSite(img) {
  return (urlSite + img)
}

export async function fetchAPI(uri) {
  const response = await axios({
    url: urlSite + uri,
    method: 'GET',
    headers: {
      'PartnerKey': partnerKey,
      'Token': await createGetToken(uri,serectKey)
    }
  });
  return response.data;
}

export async function postAPI(uri, data) {
  const response = await axios({
    url: urlSite + uri,
    method: 'POST',
    headers: {
      'PartnerKey': partnerKey,
      'Token':await createPostToken(uri,JSON.stringify(data),serectKey),
    },
    data: JSON.stringify(data)
  });
  return await response.data;

}

export async function putAPI(uri, data) {
  const response = await axios({
    url: urlSite + uri,
    method: 'PUT',
    headers: {
      'PartnerKey': partnerKey,
      'Token':await createPostToken(uri,JSON.stringify(data),serectKey),
    },
    data: JSON.stringify(data)
  });
  return await response.data;

}
