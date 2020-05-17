<template>
  <div>
    <component :is="curComponent(element)" v-for="element in elements" :key="element.uuid"></component>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import { loadJs } from '@/utils'

import editorService from '@/service/editor.service.js'

export default {
  props: {
    id: {
      type: String
    }
  },

  data () {
    return {}
  },

  methods: {
    ...mapActions(['elementManager', 'updateStatus']),
    clone (value) {
      this.elementManager({
        type: 'add',
        value
      })
    },
    getPage (id) {
      editorService.getPageDetail({ id })
        .then(async res => {
          const plugins = JSON.parse(res.plugins) || []
          console.log(plugins, 'plugins')

          for (let i = 0; i < plugins.length; i++) {
            let each = plugins[i]
            // 加载 plugins
            await this.loadPlugin(each.packageInfo).then(() => {
              Vue.component(each.name, window[each.name].default)
              // 数据 render
              this.clone({ name: each.name, props: each.pluginProps, uuid: each.uuid })
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    curComponent (ele) {
      return {
        render (h) {
          return h(ele.name, { props: { ...ele.pluginProps, uuid: ele.uuid } })
        }
      }
    },
    loadPlugin (info) {
      let src = `https://cdn.jsdelivr.net/npm/${info.package}@${info.version}/${info.name}.umd.js`

      return loadJs(src)
    }
  },

  computed: {
    ...mapState(['elements'])
  },

  created () {
    this.updateStatus('preview')

    window.Vue = Vue

    this.getPage(this.id)
  }
}
</script>

<style lang="scss" scoped>

</style>
