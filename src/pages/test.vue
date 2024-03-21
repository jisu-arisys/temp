<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
  <div>
    <table class="table">
      <thead>
        <tr>
          <slot name="columns">
            <th v-for="column in tableColumns" :key="column">{{ column }}</th>
            <th>작업</th>
          </slot>
        </tr>
      </thead>
      <tbody>
        <!-- 기존 데이터 출력 -->
        <tr v-for="(item, index) in tableData" :key="index">
          <slot :row="item">
            <!-- vue3 -->
            <template v-if="hasValue(item, column)">
              <td v-for="column in tableColumns" :key="column" >{{ itemValue(item, column) }}</td>
            </template>
            <td>
              <button class="btn btn-warning btn-sm" @click="editItem(item)">Update</button>
              <button class="btn btn-danger btn-sm" @click="deleteItem(item)">Delete</button>
            </td>
          </slot>
        </tr>
      </tbody>
    </table>
    <!-- 추가 버튼 -->
    <button class="btn btn-primary" @click="showAddRow = true">추가</button>
  </div>
</card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const tableColumns = ['Id', 'customer', 'Group','Vdn', 'updateat']
const tableData = [
      { id: 1, customer: 'A사', vdn: '3678,4567', group: 'A1,A2,A5', updateat: '2024-02-11 13:07:03' },
      { id: 2, customer: 'B사', vdn: '3678,4567', group: 'B1,B5', updateat: '2024-02-11 13:07:03' },
      { id: 3, customer: 'C사', vdn: '3678,4567', group: 'C1,C6', updateat: '2024-02-11 13:07:03' },
      { id: 4, customer: 'O사', vdn: '3678,4567', group: 'O7,O9', updateat: '2024-02-11 13:07:03' },
      { id: 5, customer: 'W사', vdn: '3678,4567', group: 'W5,W8', updateat: '2024-02-11 13:07:03' }
]
export default {
  data() {
    return {
      showAddRow: false,
      newRow: {
        id: '',
        customer: '',
        group: '',
        vdn: '',
        updateat: ''
      }
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
    saveNewItem() {
      // 저장 버튼 클릭 시 실행될 메서드
      // newRow를 data 배열에 추가하고 showAddRow를 false로 설정하여 입력 폼을 숨깁니다.
      this.data.push({ ...this.newRow });
      this.showAddRow = false;
      // newRow를 초기화합니다.
      this.newRow = {
        id: '',
        customer: '',
        group: '',
        vdn: '',
        updateat: ''
      };
    },
    cancelAddRow() {
      // 취소 버튼 클릭 시 실행될 메서드
      // showAddRow를 false로 설정하여 입력 폼을 숨깁니다.
      this.showAddRow = false;
      // newRow를 초기화합니다.
      this.newRow = {
        id: '',
        customer: '',
        group: '',
        vdn: '',
        updateat: ''
      };
    }
  }
};
</script>

<style scoped>
/* 추가적인 스타일링이 필요하다면 여기에 작성합니다. */
</style>
