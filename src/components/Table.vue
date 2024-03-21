<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <tr>
          <th v-for="column in columns" :key="column">{{column}}</th>
        </tr>
      </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <!-- vue3 v-for와 v-if의 동시사용 불가로, 가상 dom에 랜더링되지 않는 template를 추가 -->
      <template v-if="hasValue(item, column)">
        <slot :row="item">
          <td v-for="column in columns" :key="column" @click="handleColumnClick(item)">{{itemValue(item, column)}}</td>
        </slot>
      </template>
    </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'l-table',
    props: {
      columns: Array,
      data: Array
    },
    methods: {
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase()]
      },
      handleColumnClick(item) {
      this.$emit('handle', item);
      }
    }
  }
</script>
<style>
</style>
