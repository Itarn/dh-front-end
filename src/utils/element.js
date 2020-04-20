import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'

export function getVM (moduleName) {
  const VM = Vue.component(moduleName)

  return new VM()
}

export function getUUID () {
  return uuidv4()
}
