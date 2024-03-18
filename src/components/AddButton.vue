<template>
  <div class="col-12">
    <button class="btn float-right btn-success btn-sm" @click="addItem()">
      Add
    </button>
  </div>
</template>

<script>
  export default {
    name: 'add-btn',
    methods: {
      addItem() {
          this.$emit('add');
      },
    }
  }
</script>