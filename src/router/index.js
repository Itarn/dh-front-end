import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const PageEditor = (resolve) => require(['@/views/editor'], resolve)
const PageMyBoard = (resolve) => require(['@/views/myboard'], resolve)

const routes = [
  { path: '/', redirect: '/myboard' },
  { path: '/myboard', name: 'PageMyBoard', component: PageMyBoard },
  { path: '/edit/:id(.*)', name: 'PageEditor', props: true, component: PageEditor }
]

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }

    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }

    if (!Object.keys(position).length) {
      position.x = 0
      position.y = 0
    }

    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}

const router = new VueRouter({
  mode: 'history',
  scrollBehavior,
  // base: process.env.BASE_URL,
  routes
})

export default router
