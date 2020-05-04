<script>
import { createNamespace } from '../../../utils/create'
const [createComponent, bem] = createNamespace('col', 'base')

export default createComponent({
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    num: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    // gutter () {
    //   return (this.$parent && Number(this.$parent.gutter)) || 0
    // },
    // style () {
    //   const padding = `${this.gutter / 2}px`
    //   return this.gutter ? { padding } : {}
    // }
  },
  methods: {
    onClick (event) {
      this.$emit('click', event)
    }
  },
  render () {
    const { num } = this
    return (
      <this.tag
        class={bem({
          [`is-${num}`]: num
        })}
        onClick={this.onClick}
      >
        {this.$slots.default}
      </this.tag>
    )
  }
})
</script>

<style lang="scss" scoped>

.#{$BASEPREFIX}-col {
  padding: var(--#{$BASEPREFIX}-gutter);
  flex: 1;

  @for $i from 1 through 12 {
    &--is-#{$i} {
      flex: none;
      width: $i / 12 * 100%;
    }
  }
}

</style>
