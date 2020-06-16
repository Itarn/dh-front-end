<script>
import CoreEditor from '@/components/editor/panels/index'
import loadPluginMixin from '@/mixins/load-plugins.js'

export default {
  extends: CoreEditor,
  mixins: [loadPluginMixin],
  created () {}
}
</script>
