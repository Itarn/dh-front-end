import request from '../utils/request'
import config from '../config'

export default {
  /**
   * 获取用户创建的网站们
   */
  getMyPageList () {
    return request({
      url: `${config.adminServer}/admin/page/list`
    })
  },
  /**
   * 获取创建网站所依赖的模块信息及props等
   * @param {*} data
   */
  getPageDetail (data) {
    return request({
      url: `${config.adminServer}/admin/page/detail`,
      data
    })
  },
  /**
   * 更新网站依赖的模块信息
   * @param {*} data
   */
  updatePage (data) {
    return request({
      url: `${config.adminServer}/admin/page/update`,
      data
    })
  },
  /**
   * 添加站点
   * @param {*} data
   */
  addPage (data) {
    return request({
      url: `${config.adminServer}/admin/page/add`,
      data
    })
  }
}
