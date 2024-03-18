<template>
  <div>
    <!-- 고객사 항목 출력 -->
    <div v-for="customer in customers" :key="customer.id">
      <p @click="toggleGroupInput(customer.id)">{{ customer.name }}</p>
      <!-- 그룹 입력 폼 -->
      <div v-if="isGroupInputVisible(customer.id)">
        <input type="text" v-model="newGroup" placeholder="그룹 이름">
        <button @click="addGroup(customer.id)">추가</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      customers: [
        { id: 1, name: 'A사', groups: [] },
        { id: 2, name: 'B사', groups: [] },
        { id: 3, name: 'C사', groups: [] },
        { id: 4, name: 'D사', groups: [] }
      ],
      newGroup: '',
      visibleGroupInput: null
    };
  },
  methods: {
    toggleGroupInput(customerId) {
      if (this.visibleGroupInput === customerId) {
        this.visibleGroupInput = null;
      } else {
        this.visibleGroupInput = customerId;
      }
    },
    isGroupInputVisible(customerId) {
      return this.visibleGroupInput === customerId;
    },
    addGroup(customerId) {
      const customer = this.customers.find(c => c.id === customerId);
      if (customer) {
        customer.groups.push(this.newGroup);
        this.newGroup = '';
      }
    }
  }
};
</script>