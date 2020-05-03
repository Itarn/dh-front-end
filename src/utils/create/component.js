import { isFunction } from '../../utils'

function install (componentOptions, Vue) {
  const { name } = componentOptions
  Vue.component(name, componentOptions)
}

function unifySlots (context) {
  const scopedSlots = context.scopedSlots || context.data.scopedSlots || {}
  const slots = context.slots()

  Object.keys(slots).forEach((key) => {
    if (!scopedSlots[key]) {
      scopedSlots[key] = () => slots[key]
    }
  })

  return scopedSlots
}

// should be removed after Vue 3
function transformFunctionComponent (pure) {
  return {
    functional: true,
    props: pure.props,
    model: pure.model,
    render: (h, context) =>
      pure(h, context.props, unifySlots(context), context)
  }
}

export function createComponent (name) {
  return function (sfc) {
    if (isFunction(sfc)) {
      sfc = transformFunctionComponent(sfc)
    }

    sfc.name = name
    sfc.install = install

    return sfc
  }
}
