import Vue from 'vue'
// import Layout from 'p/dh-layout'
import DhGridStyle1 from 'p/dh-grid-style1'

export const pluginsList = [
  // {
  //   label: Layout.label,
  //   name: Layout.name,
  //   component: Layout
  // }
  {
    label: DhGridStyle1.label,
    name: DhGridStyle1.name,
    component: DhGridStyle1
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
