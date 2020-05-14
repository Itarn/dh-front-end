<template>
   <select @change="valChange($event)">
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
  methods: {
    valChange ($event) {
      this.$emit('valChange', { $event, val: $event.target.value })
    }
  }
}
</script>

<style>

</style>
