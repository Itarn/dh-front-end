import { getUUID } from '../../../utils/element'
import lodash from 'lodash'

class Element {
  constructor (ele) {
    this.name = ele.name
    this.uuid = getUUID()

    // const moduleProps = lodash.cloneDeep(ele.props)
    this.moduleProps = {}
    Object.keys(ele.props).map(key => {
      const defaultVal = ele.props[key].default

      if (defaultVal) {
        if (typeof defaultVal === 'function') {
          this.moduleProps[key] = defaultVal.default()
        } else {
          this.moduleProps[key] = defaultVal
        }
      } else {
        this.moduleProps[key] = ele.props[key]
      }
    })
  }

  getProp (propNme) {
    return this.moduleProps[propNme]
  }

  setPropValue (propNme, value) {
    this.moduleProps[propNme] = lodash.cloneDeep(value)
  }
}

export default Element
