import fetchJsonp from 'fetch-jsonp'
import { commonParams } from './config'

export async function getRecommandData() {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  let response = await fetchJsonp(url + serialize(commonParams), {
    jsonpCallback: 'jsonpCallback'
  })
  return response.json()
}

export async function getRankData() {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  let response = await fetchJsonp(url + serialize(commonParams), {
    jsonpCallback: 'jsonpCallback'
  })
  return response.json()
}

export async function getHotKeyData() {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  let response = await fetchJsonp(url + serialize(commonParams), {
    jsonpCallback: 'jsonpCallback'
  })
  return response.json()
}

export async function getSearchData(w, p, perpage, catZhida) {
  let url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  let body = {
    w,
    p,
    perpage,
    n: perpage,
    catZhida: catZhida === 1 ? 1 : 0,
    zhida: 1,
    ...commonParams
  }
  let response = await fetchJsonp(url + serialize(body), {
    jsonpCallback: 'jsonpCallback'
  })
  return response.json()
}

function serialize(data) {
  let arrData = []
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key]
      arrData.push(`${key}=${value}`)
    }
  }
  return `?${arrData.join('&')}`
}
