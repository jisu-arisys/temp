<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <tr>
          <th v-for="header in headers" :key="header" >{{header}}</th>
        </tr>
        <tr>
          <!-- <th v-for="column in columns" :key="column" @click="handleColumnClick(column)">{{column}}</th> -->
          <th v-for="column in columns" :key="column">{{column}}</th>
          <th>act</th>
        </tr>
      </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index" @click="handleColumnClick(index)" >
      <slot :row="item">
        <td v-for="column in columns" :key="column" v-if="hasValue(item, column)">{{itemValue(item, column)}}</td>
        <td>
            <button class="btn btn-warning btn-sm" @click="editItem(item)">
              Update
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-danger btn-sm" v-on:click="deleteItem(item)">
              Delete
            </button>
          </td>
        </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'u-table',
    isGauge: false,
    props: {
      headers: Array,
      columns: Array,
      data: Array,
    },
    methods: {
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase()]
      },
      deleteItem(row) {
          this.$emit('del', row);
      },
      editItem(row) {
          this.$emit('edit', row);
      },
      handleColumnClick(index) {
      // row 클릭 이벤트 핸들러
      console.log(index);
      this.$emit('handle', index);
      }
      
    }
  }
</script>
