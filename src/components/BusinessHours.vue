<template>
  <span v-if="isHoly">휴일</span>
  <span v-else-if="is24">24시간</span>
  <span v-else>
    {{ data.openingTime + ' ~ ' + data.closingTime }}
  </span>
</template>
<script>
  export default {
    name: 'b-time',
    props: {
      isHoly: Boolean,
      is24: Boolean,
      data: {}
    },
  }
</script>