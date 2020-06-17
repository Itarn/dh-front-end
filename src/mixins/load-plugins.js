import Vue from 'vue'
// import Layout from 'p/dh-layout'
import DhGridLr from 'p/dh-grid-lr'

export const pluginsList = [
  // {
  //   label: Layout.label,
  //   name: Layout.name,
  //   component: Layout
  // }
  {
    label: DhGridLr.label,
    name: DhGridLr.name,
    component: DhGridLr
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
