import { genUUID, cloneDeep, setVal } from '../../../utils'

class Element {
  constructor (ele) {
    this.name = ele.name
    this.uuid = ele.uuid || genUUID()

    this.packageInfo = ele.packageInfo || null

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

  getProp (propNme) {
    return this.pluginProps[propNme]
  }

  setPropValue (propName, value) {
    setVal(this.pluginProps, propName, cloneDeep(value))
  }
}

export default Element
