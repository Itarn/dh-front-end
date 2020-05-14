import { isNonPrimative } from '@/utils'
import clonedeep from 'lodash.clonedeep'

class RelativeFn {
  constructor ({ key, cb }) {
    this.key = key
    this._cb = cb
    this.cb = ({ key, val, ctx }) => {
      let args = this.getFnArgsName().map(a => {
        return this.cloneNonPrimativeArg(a === key ? val : ctx[a])
      })

      return this._cb.apply(ctx, args)
    }
  }

  cloneNonPrimativeArg (arg) {
    if (isNonPrimative(arg)) arg = clonedeep(arg)
    return arg
  }

  getFnArgsName () {
    return this._cb.toString()
      .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s))/mg, '')
      .match(/^function\s*[^(]*\(\s*([^)]*)\)/m)[1]
      .split(/,/)
  }
}

export { RelativeFn }
