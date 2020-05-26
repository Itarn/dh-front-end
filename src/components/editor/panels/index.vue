<template>
  <div>
    <div class="panel">

      <div class="panel-left" v-if="status === 'editing'">
        <div class="module" @click="clone(eachModule)" v-for="eachModule in pluginsList" :key="eachModule.uuid">
          {{ eachModule.label }}
        </div>
      </div>

      <div class="panel-right">
        <component :is="curComponent(element)" v-for="element in elements" :key="element.uuid"></component>
      </div>

    </div>

    <button class="panel-save-btn" @click="updatePage">保存</button>
    <a :href="`/preview/${id}`" target="_blank">
      <button class="panel-preview-btn">预览</button>
    </a>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import stickyUIEditor from './stickyUIEditor'

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

  // components: {
  //   EditorControl
  // },

  methods: {
    ...mapActions(['elementManager', 'updateStatus']),
    clone (value) {
      this.elementManager({ type: 'add', value })
    },
    getPage (id) {
      editorService.getPageDetail({ id })
        .then(res => {
          const plugins = JSON.parse(res.plugins) || []
          plugins.map(each => { this.clone({ name: each.name, props: each.pluginProps, uuid: each.uuid, packageInfo: each.packageInfo }) })
        })
        .catch(err => {
          console.log(err)
        })
    },
    updatePage () {
      const data = {
        id: this.id,
        plugins: JSON.stringify(this.elements)
      }

      editorService.updatePage(data)
        .then(res => {
          alert('保存成功')
        })
        .catch(err => {
          console.log(err)
        })
    },
    curComponent (ele) {
      return stickyUIEditor(ele)
    }
  },

  computed: {
    ...mapState(['elements', 'status'])
  },

  created () {
    // 设置当前编辑状态：
    this.updateStatus('editing')
    // 获取当前 page 依赖的模块及 props
    this.getPage(this.id)
  }
}
</script>

<style lang="scss" scoped>

.panel {
  display: flex; justify-content: space-between;

  &-left {
    width: 100px;
    // border: 1px solid #eeeeee;
    display: flex; align-items: center; justify-content: center;
    color: #fff;
    background-color: rgb(46, 46, 47);
    .module {
      cursor: pointer;
    }
  }

  &-right {
    flex: 1;
    // background: #eeeeee;
  }

  &-save-btn {
    margin-top: 30px;
    width: 100px; height: 30px;
    text-align: center;
  }

}

</style>
