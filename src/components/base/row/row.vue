<script>
import { createNamespace } from '../../../utils/create'

const [createComponent, bem] = createNamespace('row', 'base')

export default createComponent({
  props: {
    justify: {
      type: String,
      default: 'start'
    },
    align: {
      type: String,
      default: 'top'
    },
    isWrap: {
      type: Boolean,
      default: true
    },
    tag: {
      type: String,
      default: 'div'
    },
    gutter: {
      type: [Number, String],
      default: 0
    }
  },

  methods: {
    onClick (event) {
      this.$emit('click', event)
    }
  },

  render () {
    const { align, justify, isWrap } = this
    const margin = `${Number(this.gutter) / 2}px`
    const style = this.gutter
      ? { '--base-gutter': margin }
      : {}

    return (
      <this.tag
        style={style}
        class={bem({
          [`justify-${justify}`]: justify,
          [`align-${align}`]: align,
          wrap: isWrap
        })}
        onClick={this.onClick}
      >
        {this.slots()}
      </this.tag>
    )
  }
})
</script>

<style scoped lang="scss">

.#{$BASE}-row {
  display: flex;
  margin: calc(-1 * var(--#{$BASE}-gutter));

  &:not(:last-child) {
    margin-bottom: calc(var(--#{$BASE}-gutter));
  }

  &--justify-center {
    justify-content: center;
  }
  &--justify-end {
    justify-content: flex-end;
  }
  &--justify-space-around {
    justify-content: space-around;
  }
  &--justify-space-between {
    justify-content: space-between;
  }

  &--align-center {
    align-items: center;
  }
  &--align-bottom {
    align-items: flex-end;
  }
  &--align-stretch {
    align-items: stretch;
  }

  &--wrap {
    flex-wrap: wrap;
  }
}
</style>
