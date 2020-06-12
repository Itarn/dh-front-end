<script>
import CoreEditor from '@/components/editor/panels/index'
import loadPluginMixin from '@/mixins/load-plugins.js'
// import '../components/core/support/index.js'

export default {
  extends: CoreEditor,
  mixins: [loadPluginMixin],
  created () {
    // console.log(this, 'editor11')
  }
}
</script>
