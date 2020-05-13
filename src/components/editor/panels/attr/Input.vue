<template>
   <input type="text" :value="data.val" @input="valChange($event)">
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
  methods: {
    valChange ($event) {
      this.$emit('valChange', { $event, val: $event.target.value })
    }
  }
}
</script>

<style>

</style>
