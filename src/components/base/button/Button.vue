<script>
import { createNamespace } from '../../../utils'
import { WHITE } from '../../../assets/css/_var'
import { emit, inherit } from '../../../utils/functional'
const [createComponent, bem] = createNamespace('button', 'base')

function button (h, props, slots, ctx) {
  const {
    tag,
    size,
    type,
    color,
    plain,
    block
  } = props

  const classes = [
    bem([
      type,
      size,
      {
        block
      }
    ])
  ]

  const style = {}
  if (color) {
    style.color = plain ? color : WHITE

    if (!plain) {
      style.background = color
    }
  }

  function Content () {
    const content = []

    let text
    // console.log(slots.default.toString())
    text = slots.default ? slots.default() : text

    if (text) {
      content.push(<span class={bem('text')}>{text}</span>)
    }

    return content
  }

  function onClick (event) {
    emit(ctx, 'click', event)
  }

  return (
    <tag
      class={classes}
      style={style}
      onClick={onClick}
      {...inherit(ctx)}
    >
      { Content() }
    </tag>
  )
}

button.props = {
  tag: {
    type: String,
    default: 'button'
  },
  type: {
    type: String,
    default: 'default'
  },
  text: String,
  color: String,
  block: Boolean,
  size: {
    type: String,
    default: 'normal'
  },
  plain: Boolean
}

export default createComponent(button)

</script>

<style lang="scss" scoped>

.base-button {
  display: flex; justify-content: center; align-items: center;
  height: $button-default-height;
  margin: 0;
  padding: 0;
  font-size: $button-default-font-size;
  line-height: $button-default-line-height;
  text-align: center;
  border-radius: $button-border-radius;
  cursor: pointer;
  transition: opacity $animation-duration-fast;
  -webkit-appearance: none;
  -webkit-text-size-adjust: 100%;

  &--default {
    color: $button-default-color;
    background-color: $button-default-background-color;
    border: $button-border-width solid $button-default-border-color;
  }

  &--primary {
    color: $button-primary-color;
    background-color: $button-primary-background-color;
    border: $button-border-width solid $button-primary-border-color;
  }

  &--info {
    color: $button-info-color;
    background-color: $button-info-background-color;
    border: $button-border-width solid $button-info-border-color;
  }

  &--danger {
    color: $button-danger-color;
    background-color: $button-danger-background-color;
    border: $button-border-width solid $button-danger-border-color;
  }

  &--warning {
    color: $button-warning-color;
    background-color: $button-warning-background-color;
    border: $button-border-width solid $button-warning-border-color;
  }

  &--plain {
    background-color: $button-plain-background-color;

    &.base-button--primary {
      color: $button-primary-background-color;
    }

    &.base-button--info {
      color: $button-info-background-color;
    }

    &.base-button--danger {
      color: $button-danger-background-color;
    }

    &.base-button--warning {
      color: $button-warning-background-color;
    }
  }

  &--large {
    padding: 0 $padding-lg;
    height: $button-large-height;
    line-height: $button-large-line-height;
  }

  &--normal {
    padding: 0 15px;
    font-size: $button-normal-font-size;
  }

  &--small {
    min-width: $button-small-min-width;
    height: $button-small-height;
    padding: 0 $padding-xs;
    font-size: $button-small-font-size;
    line-height: $button-small-line-height;
  }

  &--block {
    display: block;
    width: 100%;
  }
}

</style>
