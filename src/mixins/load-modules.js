import Vue from 'vue'
import DhLayout from '../components/modules/DhLayout'

export const modulesList = [
  {
    title: '网格布局',
    component: DhLayout,
    name: DhLayout.name
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
