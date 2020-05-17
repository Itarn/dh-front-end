import { createComponent } from './component'
import { createBEM } from './bem'

export function createBemNamespace (type, name) {
  name = `${type}-${name}`
  return createBEM(name)
}

export function createCpnNamespace (type, name) {
  name = `${type}-${name}`
  return createComponent(name)
}

export function createNamespace (type, name) {
  return [createCpnNamespace(type, name), createBemNamespace(type, name)]
}
