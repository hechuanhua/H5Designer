
import config from "../config/config"

function obj2String(obj, arr = [], idx = 0) {
    for (let item in obj) {
    arr[idx++] = [item, obj[item]]
  }
  return new URLSearchParams(arr).toString()
}

const get = (url,params) => {
  return new Promise((resolve,reject)=>{
    fetch(`${config.baseUrl}${url}?${obj2String(params)}`,{
      method: 'GET',
    }).then(response=>response.json())
    .then(json=>{
      resolve(json)
    })
    .catch(e=>{
      console.log(e,'error')
      reject(e)
    })
  })
}

const post = (url,params) => {
  return new Promise((resolve,reject)=>{
    fetch(`${config.baseUrl}${url}`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body:JSON.stringify(params)
    })
    .then(response=>{
      return response.json()
    })
    .then(json=>{
      resolve(json)
    })
    .catch(e=>{
      console.log(e,'error')
      reject(e)
    })
  })
}

export {
  get,
  post
}