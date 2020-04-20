<template>
  <div>
    <div v-for="item in list" :key="item.id" @click="$router.push(`/edit/${item.id}`)">
      {{ item.id }}
    </div>
  </div>
</template>

<script>
import editorService from '../../service/editor.service'

export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      editorService.getMyPageList()
        .then(res => {
          // console.log(res)
          this.list = res.list
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
