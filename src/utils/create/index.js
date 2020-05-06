import { createComponent } from './component'
import { createBEM } from './bem'

import { PREFIX, BASE } from '../../assets/css/_var'

export function createNamespace (name, type) {
  if (type === 'base') {
    name = `${BASE}-${name}`
    return [createComponent(name), createBEM(name)]
  } else {
    name = `${PREFIX}-${name}`
    return [createComponent(name), createBEM(name)]
  }
}
