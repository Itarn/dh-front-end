import { getUUID } from '../../../utils/element'
import clonedeep from 'lodash.clonedeep'

class Element {
  constructor (ele) {
    this.name = ele.name
    this.uuid = getUUID()

    // const moduleProps = clonedeep(ele.props)
    this.moduleProps = {}
    Object.keys(ele.props).filter(key => key !== 'editor').map(key => {
      const defaultVal = ele.props[key].default

      if (defaultVal) {
        if (typeof defaultVal === 'function') {
          this.moduleProps[key] = defaultVal()
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
    this.moduleProps[propNme] = clonedeep(value)
  }
}

export default Element
