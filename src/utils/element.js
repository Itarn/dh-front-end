import Vue from 'vue'

export function getVM (moduleName) {
  const VM = Vue.component(moduleName)

  return new VM()
}
