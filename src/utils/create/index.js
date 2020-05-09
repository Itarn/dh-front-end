import { createComponent } from './component'
import { createBEM } from './bem'

export function createNamespace (type, name) {
  name = `${type}-${name}`
  return [createComponent(name), createBEM(name)]
}

export const bem = createBEM()
