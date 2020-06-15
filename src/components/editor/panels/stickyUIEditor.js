import EditorControl from './control'
import EditorCell from './cell'

import { mapActions } from 'vuex'
import { cloneDeep } from '@/utils'

export default function (ele) {
  const props = {
    ...ele.pluginProps,
    uuid: ele.uuid
  }

  return {
    data () {
      return {
        editorSectionPanels: null,
        editorDataPanels: null
      }
    },

    provide () {
      return {
        valChangeHandler: this.valChangeHandler.bind(this, ele.uuid),
        props,
        keyRecorder: this.keyRecorder.bind(null, 'data')
      }
    },
    methods: {
      ...mapActions(['elementManager']),
      updateElement (value) {
        // todo: uuid
        this.elementManager({ type: 'update', value: { ...value } })
      },
      valChangeHandler (uuid, { val: propVal }, { key, info = null }) {
        if (info && info.relative) {
          info.relative.forEach(r => {
            const { key: rkey, cb = null } = r
            if (key && cb) {
              this.updateElement({ uuid, propKey: rkey, propVal: cb({ key, val: propVal, ctx: props }) })
            }
          })
        }

        this.updateElement({ uuid, propKey: key, propVal })
      },
      /**
       * {
       *   key: "height",
       *   info: { label: '高度', type: 'editor-selec', val: "middle", propArr: [{ label: "小", value: "min" }], relative: [] }
       * }
       */
      getEditorPropsPanels (config = null, reactiveData = null) {
        if (!config) return null
        if (!reactiveData) return null

        let editorInfo = cloneDeep(config)
        editorInfo.forEach((item, i) => {
          let arr = []

          Object.keys(item.propSortList).forEach((key, index) => {
            let obj = {}
            let info = cloneDeep(item.propSortList[key])
            this.$set(info, 'val', reactiveData[key])
            this.$set(obj, 'key', key)
            this.$set(obj, 'info', info)
            this.$set(arr, index, obj)
          })
          this.$set(item, 'attrProp', arr)
        })
        return editorInfo
      },
      keyRecorder () {
        let keychain = '' + arguments[0]
        Array.from(arguments).slice(1).forEach(ele => {
          keychain += `[${ele}]`
        })
        return keychain
      }
    },
    created () {
      import('p/' + ele.name + '/editor')
        .then(({ MEditor, DataEditor }) => {
          this.editorSectionPanels = this.getEditorPropsPanels(MEditor, ele.pluginProps)
          this.editorDataPanels = this.getEditorPropsPanels.bind(this, DataEditor)
        })
        .catch(err => {
          console.warn(`./src/components/plugins/${ele.name}中没找到 editor.js 文件`)
        })
    },
    render () {
      const scopedSlots = {
        sectionEditor: () => (
          this.editorSectionPanels && this.editorSectionPanels.map(editorProp =>
            <EditorControl
              editorProp={editorProp}
              onvalChange={this.valChangeHandler}
            ></EditorControl>
          )
        ),
        columnEditor: ({ data, editor }) => (
          <EditorCell button={editor.button}>
            <div slot="row">
              {
                typeof this.editorDataPanels === 'function' && this.editorDataPanels(data).map(editorProp =>
                  <EditorControl
                    editorProp={editorProp}
                    onvalChange={this.valChangeHandler}
                  ></EditorControl>
                )
              }
            </div>
          </EditorCell>
        )
      }

      return (
        <ele.name
          { ...{ props } }
          scopedSlots={scopedSlots}
        >
        </ele.name>
      )
    }
  }
}
