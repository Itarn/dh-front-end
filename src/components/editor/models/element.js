import { genUUID, cloneDeep, setVal } from '../../../utils'

class Element {
  constructor (ele) {
    this.name = ele.name
    this.uuid = genUUID()

    // const moduleProps = cloneDeep(ele.props)
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

  setPropValue (propName, value) {
    setVal(this.moduleProps, propName, cloneDeep(value))
  }
}

export default Element
