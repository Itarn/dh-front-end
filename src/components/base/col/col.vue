<script>
import { createNamespace } from '../../../utils/create'
const [createComponent, bem] = createNamespace('base', 'col')

export default createComponent({
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    ratioNum: {
      type: [String, Number],
      default: 0
    },
    blockNum: {
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
    const { ratioNum, blockNum } = this
    return (
      <this.tag
        class={bem({
          [`is-one-of-${ratioNum}`]: ratioNum,
          [`is-${blockNum}`]: blockNum
        })}
        onClick={this.onClick}
      >
        {this.slots()}
      </this.tag>
    )
  }
})
</script>

<style lang="scss" scoped>

.base-col {
  padding: var(--base-gutter);
  flex: 1;

  @for $i from 1 through 12 {
    &--is-one-of-#{$i} {
      flex: none;
      width: 100% / $i;
    }
  }

  @for $i from 1 through 12 {
    &--is-#{$i} {
      flex: none;
      width: (100% * $i / 12);
    }
  }
}

</style>
