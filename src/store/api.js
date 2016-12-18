import request from 'browser-request'

const baseURL = 'https://hacker-news.firebaseio.com/v0'

export function fetch (path) {
  return new Promise((resolve, reject) => {
    request({ url: `${baseURL}/${path}.json` }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body))
      }
      else {
        reject(error)
      }
    })
  })
}

export function fetchIdsByType (type) {
  return fetch(`${type}stories`)
}

export function fetchItem (id) {
  return fetch(`item/${id}`)
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser (id) {
  return fetch(`user/${id}`)
}
