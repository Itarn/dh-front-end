import Vue from 'vue'
import MLayout from '../components/modules/MLayout'

export const modulesList = [
  {
    label: MLayout.label,
    name: MLayout.name,
    component: MLayout
  }
]

export default {
  data: () => ({
    modulesList
  }),
  created () {
    modulesList.forEach(m => { Vue.component(m.name, m.component) })
  }
}
