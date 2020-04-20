import request from '../utils/request'
import config from '../config'

export default {
  // getTest () {
  //   return new Promise((resolve, reject) => {
  //     axios.get('/admin/bar')
  //       .then(response => {
  //         resolve(response)
  //       })
  //       .catch(err => {
  //         reject(err)
  //       })
  //   })
  // },
  getMyPageList () {
    return request({
      url: `${config.adminServer}/admin/page/list`
    })
  },
  getPageDetail (data) {
    return request({
      url: `${config.adminServer}/admin/page/detail`,
      data
    })
  },
  updatePage (data) {
    console.log(data)
    return request({
      url: `${config.adminServer}/admin/page/update`,
      data
    })
  },
  addPage (data) {
    return request({
      url: `${config.adminServer}/admin/page/add`,
      data
    })
  }
}
