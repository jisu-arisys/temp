<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <slot name="columns">
            <th v-for="column in columns" :key="column">{{ column }}</th>
            <th>작업</th>
          </slot>
        </tr>
      </thead>
      <tbody>
        <!-- 데이터 배열을 두 번 반복 -->
        <tr v-for="(item, index) in data" :key="index">
          <slot :row="item">
            <!-- vue3 수정사항 -->
            <template v-if="hasValue(item, column)">
              <td v-for="column in columns" :key="column" >{{ itemValue(item, column) }}</td>
            </template>
            <td>
              <button class="btn btn-warning btn-sm" @click="editItem(item)">Update</button>
              <button class="btn btn-danger btn-sm" v-on:click="deleteItem(item)">Delete</button>
            </td>
          </slot>
        </tr>
        <!-- 두 번째 반복 -->
        <tr v-for="(item, index) in data" :key="'second-' + index">
          <!-- 그룹 입력 폼 -->
          <td colspan="columns.length + 1" v-if="isGroupInputVisible(item.id)">
            <input type="text" v-model="newGroup" placeholder="그룹 이름">
            <button @click="moreGroup(item.id)">추가</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    columns: Array,
    data: Array
  },
  data() {
    return {
      newGroup: '',
      visibleGroupInput: null
    };
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== 'undefined';
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },
    editItem(item) {
      // Update 버튼 클릭 시 실행될 메서드
    },
    deleteItem(item) {
      // Delete 버튼 클릭 시 실행될 메서드
    },
    toggleGroupInput(itemId) {
      // add 버튼 클릭 시 실행될 메서드
      if (this.visibleGroupInput === itemId) {
        this.visibleGroupInput = null;
      } else {
        this.visibleGroupInput = itemId;
      }
    },
    isGroupInputVisible(itemId) {
      return this.visibleGroupInput === itemId;
    },
    moreGroup(itemId) {
      // 추가 버튼 클릭 시 실행될 메서드
    }
  }
};
</script>

<style scoped>
/* 추가적인 스타일링이 필요하다면 여기에 작성합니다. */
</style>
