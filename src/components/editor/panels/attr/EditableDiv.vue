<template>
  <div
  class="e-div"
  :contenteditable="editing"
  @blur="valChangeHandler"
  >
  <!-- @input="inputHandler" -->
  {{ data }}
  </div>
</template>

<script>
export default {
  props: {
    editing: {
      type: Boolean,
      default: false
    },
    data: {
      type: [String],
      default: ''
    }
  },
  methods: {
    valChangeHandler ($event) {
      console.log($event.target.innerText)
      this.$emit('valChange', { $event, val: $event.target.innerText })
    }
  }
}
</script>

<style style="scss" scoped>

.e-div {
  color: #fff;
}
</style>
