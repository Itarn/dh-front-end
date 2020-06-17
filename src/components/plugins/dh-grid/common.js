import { cloneDeep } from '@/utils'

// relative logic
// common fn
function actedUponData (newLength, data, dataShape) {
  data = cloneDeep(data)

  if (newLength > data.length) {
    data = [].concat(data, Array.from({ length: newLength - data.length }, (v, i) => {
      // dataShape.sid = data.length + i
      return cloneDeep(dataShape)
    }))
  } else if (newLength < data.length) {
    let confirm = window.confirm('您确定要减少网格数量吗？某些网格项目将被删除。')

    if (confirm) {
      data.splice(newLength, data.length - newLength)
    }
  }

  return data
}

// arguments name should be MLayout data
export const rowColActedData = {
  key: 'data',
  cb (row, col, data, dataShape) {
    return actedUponData(Number(row) * Number(col), data, dataShape)
  }
}
