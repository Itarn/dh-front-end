<script>
import loadModulesMixin from '../../mixins/load-modules'
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
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
    }
  },
  computed: {
    ...mapState(['elements'])
  },
  created () {},
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
              return (h(ele.name))
            }) }
          </div>
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>

.panel {
  display: flex; justify-content: space-between;
  .panel-left {
    width: 300px;
    border: 1px solid #eeeeee;
    display: flex; align-items: center; justify-content: center;
  }
  .panel-right {
    flex: 1;
    background: #eeeeee;
  }
}
</style>
