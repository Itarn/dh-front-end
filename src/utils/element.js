import Vue from 'vue'

export function getVM (moduleName) {
  const VM = Vue.component(moduleName)

  console.log(VM)

  return new VM()
}
