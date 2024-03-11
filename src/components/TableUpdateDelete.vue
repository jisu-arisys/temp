<template>
  <table class="table">
    <thead>
      <slot name="columns">
        <tr>
          <th v-for="column in columns" :key="column">{{column}}</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="column in columns" :key="column" v-if="hasValue(item, column)">{{itemValue(item, column)}}</td>
      </slot>
      <td>
        <router-link :to="{path:'/admin/userupdate/'+(index+1)}" class="btn btn-warning btn-sm" >Update</router-link>
        <!-- <button class="btn btn-warning btn-sm" v-on:click="updateUser(index)">
            Update
          </button> -->
        </td>
        <td>
          <button class="btn btn-danger btn-sm" v-on:click="deleteUser(index+1)">
            Delete
          </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'ud-table',
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
      deleteUser(id) {
        if(confirm(id + "를 삭제하시겠습니까?")){
        }
      },
      
    }
  }
</script>
<style>
</style>
