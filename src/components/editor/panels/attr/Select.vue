<template>
   <select @change="inputHandler($event)">
    <option :value="each.value" :selected="each.value === data.val" v-for="each in data.propArr" :key="each.label">{{ each.label }}</option>
  </select>
</template>

<script>
export default {
  name: 'e-select',
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
