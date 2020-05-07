import Vue from 'vue'
import DhLayout from '../components/modules/DhLayout'

export const modulesList = [
  {
    label: DhLayout.label,
    name: DhLayout.name,
    component: DhLayout
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
