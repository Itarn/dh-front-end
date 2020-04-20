import { getUUID } from '../../../utils/element'
import lodash from 'lodash'

class Element {
  constructor (ele) {
    this.name = ele.name
    this.uuid = getUUID()

    // const moduleProps = lodash.cloneDeep(ele.props)
    this.moduleProps = {}
    Object.keys(ele.props).map(key => {
      this.moduleProps[key] = ele.props[key].default && typeof ele.props[key].default === 'function' ? lodash.cloneDeep(ele.props[key].default()) : lodash.cloneDeep(ele.props[key].default)
    })

    // this.propsMap = new Map()
    // Object.keys(this.moduleProps).map(key => {
    //   this.propsMap.set(key, this.moduleProps[key])
    // })
  }

  getProp (propNme) {
    return this.moduleProps[propNme]
  }

  setPropValue (propNme, value) {
    // this.propsMap.set(propNme, value)
    this.moduleProps[propNme] = lodash.cloneDeep(value)
  }
}

export default Element
