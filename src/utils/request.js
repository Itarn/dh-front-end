import axios from 'axios'

const request = ({ url, data = null }) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(res => {
        if (res.data && res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default request
