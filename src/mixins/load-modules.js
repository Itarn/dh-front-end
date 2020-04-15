import Vue from 'vue'
import DhmGridLayout from '../components/modules/DhmGridLayout'

export const modulesList = [
  {
    title: '网格布局',
    component: DhmGridLayout,
    name: DhmGridLayout.name
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
