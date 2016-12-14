import ids from './ids'
import stories from './stories'

export function fetchIdsByType (type) {
  return new Promise(resolve => {
    resolve(ids)
  })
}

export function fetchItem (id) {
  return new Promise(resolve => {
    resolve(stories.filter(item => item.id === id)[0])
  })
}

export function fetchItems (ids) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(stories.filter(item => ids.indexOf(item.id) !== -1))
    }, 300)
  })
}
