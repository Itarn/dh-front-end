import { genUUID, cloneDeep, setVal } from '../../../utils'

class Element {
  constructor (ele) {
    // 模块的名字
    this.name = ele.name
    // 唯一ID 便于区分同一模块的使用多次的情况
    this.uuid = ele.uuid || genUUID()

    // 模块信息
    this.packageInfo = ele.packageInfo || null

    // 模块的 props
    // const pluginProps = cloneDeep(ele.props)
    this.pluginProps = {}
    Object.keys(ele.props).filter(key => key !== 'editor').map(key => {
      const defaultVal = ele.props[key].default

      if (defaultVal) {
        if (typeof defaultVal === 'function') {
          this.pluginProps[key] = defaultVal()
        } else {
          this.pluginProps[key] = defaultVal
        }
      } else {
        this.pluginProps[key] = ele.props[key]
      }
    })
  }

  // 获取值
  getProp (propNme) {
    return this.pluginProps[propNme]
  }

  // SET 指定 key 的 value
  setPropValue (propName, value) {
    setVal(this.pluginProps, propName, cloneDeep(value))
  }
}

export default Element
