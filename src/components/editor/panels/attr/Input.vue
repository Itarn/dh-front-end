<template>
   <input type="text" :value="data.val" @input="inputHandler($event)">
</template>

<script>
export default {
  name: 'e-input',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  inject: ['inputHandler']
}
</script>

<style>

</style>
