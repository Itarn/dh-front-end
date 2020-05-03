import { createComponent } from './component'
import { createBEM } from './bem'

const config = require('../../config')

export function createNamespace (name, type) {
  if (type === 'base') {
    name = `${config.BASEPREFIX}-${name}`
    return [createComponent(name), createBEM(name)]
  } else {
    name = `${config.PREFIX}-${name}`
    return [createComponent(name), createBEM(name)]
  }
}
