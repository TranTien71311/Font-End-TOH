import axios from "axios"
import {createGetToken, createPostToken} from "../../codes/function"

export async function fetchAPIPOS(uri) {
  const response = await axios({
    url: 'http://christmas.speedtech.vn' + uri,
    method: 'GET',
    headers: {
      'PartnerKey': "UGl4ZWxTcWxiYXNlT25oYQ==",
      'Token': await createGetToken(uri,"123654789")
    }
  });
  return response.data;
}

export async function pushAPIPOS(uri, data) {
  const response = await axios({
    url: 'http://christmas.speedtech.vn' + uri,
    method: 'POST',
    headers: {
      'PartnerKey': "UGl4ZWxTcWxiYXNlT25oYQ==",
      'Token':await createPostToken(uri,JSON.stringify(data),"123654789"),
    },
    data: JSON.stringify(data)
  });
  return await response.data;

}

export async function putAPIPOS(uri, data) {
  const response = await axios({
    url: 'http://christmas.speedtech.vn' + uri,
    method: 'PUT',
    headers: {
      'PartnerKey': "UGl4ZWxTcWxiYXNlT25oYQ==",
      'Token':await createPostToken(uri,JSON.stringify(data),"123654789"),
    },
    data: JSON.stringify(data)
  });
  return await response.data;

}
