import Vue from 'vue'
import Layout from 'p/dh-layout'

export const pluginsList = [
  {
    label: Layout.label,
    name: Layout.name,
    component: Layout
  }
]

export default {
  data: () => ({
    pluginsList
  }),
  created () {
    pluginsList.forEach(p => { Vue.component(p.name, p.component) })
  }
}
