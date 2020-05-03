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
    return {
      pageInitModule: []
    }
  },
  mixins: [loadModulesMixin],
  methods: {
    ...mapActions(['elementManager']),
    clone ({ name }) {
      this.elementManager({
        type: 'add',
        value: name
      })
    },
    getPage (id) {
      editorService.getPageDetail({ id })
        .then(res => {
          const modules = JSON.parse(res.modules)
          modules.map(module => { this.clone({ name: module.name }) })
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
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapState(['elements'])
  },
  created () {
    this.getPage(this.id)
  },
  render (h) {
    return (
      <div>
        <h5>编辑页面</h5>
        <div class="panel">
          <div class="panel-left">
            {
              this.modulesList.map(eachModule => {
                return (
                  <div class="module" onClick={this.clone.bind(this, eachModule)}>
                    { eachModule.title }
                  </div>
                )
              })
            }
          </div>
          <div class="panel-right">
            { this.elements.map(ele => {
              return (h(ele.name, { props: { ...ele.moduleProps } }))
            }) }
          </div>

        </div>
        <button class="panel-save-btn" onClick={this.updatePage}>保存</button>
      </div>
    )
  }
}
</script>>

<style lang="scss" scoped>

.panel {
  display: flex; justify-content: space-between;
  .panel-left {
    width: 300px;
    border: 1px solid #eeeeee;
    display: flex; align-items: center; justify-content: center;
    .module {
      cursor: pointer;
    }
  }
  .panel-right {
    flex: 1;
    background: #eeeeee;
  }
}
.panel-save-btn {
  margin-top: 30px;
  width: 100px; height: 30px;
  text-align: center;
}

</style>
