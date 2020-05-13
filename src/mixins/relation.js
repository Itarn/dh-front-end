import Vue from 'vue'
import { sortChildren } from '../utils/vnodes'

export function ChildrenMixin (
  parent,
  options
) {
  const indexKey = (options && options.indexKey) || 'index'

  return Vue.extend({
    inject: {
      [parent]: {
        default: null
      }
    },

    computed: {
      parent () {
        if (this.disableBindRelation) {
          return null
        }

        return this[parent]
      },

      [indexKey] () {
        this.bindRelation()
        return this.parent.children.indexOf(this)
      }
    },

    mounted () {
      this.bindRelation()
    },

    beforeDestroy () {
      if (this.parent) {
        this.parent.children = this.parent.children.filter(
          item => item !== this
        )
      }
    },

    methods: {
      bindRelation () {
        if (!this.parent || this.parent.children.indexOf(this) !== -1) {
          return
        }

        const children = [...this.parent.children, this]

        // console.log(children, 'sort 前')

        sortChildren(children, this.parent)
        console.log(children, 'sort 后')

        this.parent.children = children
      }
    }
  })
}

export function ParentMixin (parent) {
  return {
    provide () {
      return {
        [parent]: this
      }
    },

    data () {
      return {
        children: []
      }
    }
  }
}
