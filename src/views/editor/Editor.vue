<template>
  <div>
    <div class="panel">

      <div class="panel-left" v-if="status === 'editing'">
        <div class="module" @click="clone(eachModule)" v-for="eachModule in modulesList" :key="eachModule.uuid">
          {{ eachModule.label }}
        </div>
      </div>

      <div class="panel-right">
        <component :is="curComponent(element)" v-for="element in elements" :key="element.uuid"></component>
      </div>

    </div>

    <button class="panel-save-btn" @click="updatePage">保存</button>

  </div>
</template>

<script>
import loadModulesMixin from '../../mixins/load-modules'
import { mapActions, mapState } from 'vuex'

import editorService from '../../service/editor.service.js'

export default {
  props: {
    id: {
      type: String
    }
  },

  data () {
    return {}
  },

  mixins: [loadModulesMixin],

  methods: {
    ...mapActions(['elementManager']),
    clone (value) {
      this.elementManager({
        type: 'add',
        value
      })
    },
    getPage (id) {
      editorService.getPageDetail({ id })
        .then(res => {
          const modules = JSON.parse(res.modules) || []
          modules.map(each => { this.clone({ name: each.name, props: each.moduleProps }) })
        })
        .catch(err => {
          console.log(err)
        })
    },
    updatePage () {
      const data = {
        id: this.id,
        modules: JSON.stringify(this.elements)
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
      return {
        render (h) {
          return h(ele.name, { props: { ...ele.moduleProps, uuid: ele.uuid } })
        }
      }
    }
  },

  computed: {
    ...mapState(['elements', 'status'])
  },

  created () {
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
