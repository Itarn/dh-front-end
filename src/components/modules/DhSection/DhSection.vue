<script>
import { createNamespace } from '../../../utils/create'

const [createComponent, bem] = createNamespace('section')

export default createComponent({
  props: {
    sectionTop: {
      type: String,
      default: 'max',
      editor: {
        type: 'editor-select',
        label: '上边距',
        props: [
          { value: 'min' },
          { value: 'middle' },
          { value: 'max' }
        ]
      }
    },
    sectionBottom: {
      type: String,
      default: 'max',
      editor: {
        type: 'editor-select',
        label: '下边距',
        props: [
          { value: 'min' },
          { value: 'middle' },
          { value: 'max' }
        ]
      }
    }
  },
  render () {
    const { sectionTop, sectionBottom } = this

    return (
      <div
        class={[
          bem('top', { [sectionTop]: sectionTop }),
          bem('bottom', { [sectionBottom]: sectionBottom })
        ]}
      >
        { this.slots() }
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>

.#{$PREFIX}-section {
  position: relative;

  &__top {
    &--min {
      padding-top: 0;
    }
    &--middle {
      padding-top: 30px;
    }
    &--max {
      padding-top: 50px;
    }
  }

  &__bottom {
    &--min {
      padding-bottom: 0;
    }
    &--middle {
      padding-bottom: 30px;
    }
    &--max {
      padding-bottom: 50px;
    }
  }

  &__editor-dot {
    position: absolute; right: 0;
    background: $black;
    color: $white;
  }
}
</style>
