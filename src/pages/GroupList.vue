<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">고객사 그룹별 일정관리</h4>
              <p class="card-category">등록된 고객사 목록을 표시하고 영업일정을 수정 할 수 있는 페이지.</p>
            </template>
            <div class="d-flex">
              <div class="col-9 p-2 lg">
                <label calss="">
                  고객사
                  <select v-model="filterOrder.customer" class="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2">
                    <option v-for="(option, index) in extractCustomers" :key="index" :value="option">{{ option }}</option>
                  </select>
                </label>
                &nbsp;&nbsp;
                <label>
                  Ivr그룹
                  <select v-model="filterOrder.group" class="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2">
                    <option v-for="(option, index) in extractGroups" :key="index" :value="option">{{ option }}</option>
                  </select>
                </label>
              </div>
              <div class="col-3 p-2">
                <button class="btn float-right btn-success btn-sm" @click="addGroup()">
                    Add
                  </button>
                </div>
              </div>
              <l-table class="table-hover table-striped"
              :columns="table1.columns"
              :data="table1.data"
              @handle="togleGroup">
            </l-table>
            <br>
              <div class="col-12 text-center">
                  <button class="btn btn-success btn-sm" @click="currentPage--">
                    &lt;
                  </button>&nbsp;
                  <button class="btn btn-success btn-sm" @click.stop>
                    {{ currentPage }}
                  </button>&nbsp;
                  <button class="btn btn-success btn-sm" @click="currentPage++">
                    &gt;
                  </button>
              </div>
          </card>
        </div>
        <div class="col-md-4">          
          <card>
            <label>Details</label>
            <br>
            <div v-if=expandedData>
              <table>
                <tr >
                  <td><label>Customer</label></td>
                  <td>{{ expandedData.customer }}</td>
                </tr>
                <tr >
                  <td class="col-1"><label>Group</label></td>
                  <td class="col-3">{{ expandedData.group }}</td>
                </tr>
                <tr>
                  <td colspan="4"><hr></td>
                </tr>
                <tr>
                  <td><label>영업시간</label></td>
                  <td><button class="btn float-right btn-warning btn-sm" @click="updateTime()">
                      Update
                    </button>
                  </td>
                </tr>
                <tr>
                  <td class="col-1 "><label>월요일 ~ 금요일</label></td>
                  <td class="col-2">
                    <span v-if="expandedData.businessHours.monday.isHoly">휴일</span>
                    <span v-else-if="expandedData.businessHours.monday.is24">24시간</span>
                    <span v-else>{{ expandedData.businessHours.monday.openingTime +' ~ '+expandedData.businessHours.monday.closingTime }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="col-1 "><label>토요일</label></td>
                  <td class="col-3">
                    <span v-if="expandedData.businessHours.saturday.isHoly">휴일</span>
                    <span v-else-if="expandedData.businessHours.saturday.is24">24시간</span>
                    <span v-else>{{ expandedData.businessHours.saturday.openingTime +' ~ '+expandedData.businessHours.saturday.closingTime }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="col-1 "><label>일요일</label></td>
                  <td class="col-3">
                    <span v-if="expandedData.businessHours.sunday.isHoly">휴일</span>
                    <span v-else-if="expandedData.businessHours.sunday.is24">24시간</span>
                    <span v-else>{{ expandedData.businessHours.sunday.openingTime +' ~ '+expandedData.businessHours.sunday.closingTime }}</span>
                  </td>
                </tr>
                <tr>
                  <td colspan="4"><hr></td>
                </tr>
                <tr>
                  <td><label>휴무일</label></td>
                  <td><button class="btn float-right btn-warning btn-sm" @click="updateHoly()">
                    Update
                  </button>
                </td>
              </tr>
              <tr v-for="index in 3" :key="index">
                <td class="col-4">{{ expandedData.holidays[index] }}&nbsp;</td>
              </tr>
              <tr>
              </tr>
              <tr>
                <td><label>임시휴일</label></td>
              </tr>
              <tr v-for="index in 3" :key="index">
                <td class="col-4">{{ expandedData.Tempholidays[index] }}&nbsp;</td>
              </tr>
              </table>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  const headerColumns = ['','', '', '' ,'┌  fulltime',' -----------------┐','┌  shorttime','------------------┐','','']
  const tableColumns = ['Id','customer', 'group', 'Vdn' ,'updateat']
  const tableData = [
    {
    id: 1,
    customer: '현대카드',
    group: 'H1',
    vdn: '36',
    holidays : ['매주 첫째주 월요일','매주 마지막주 수요일',' '],
    Tempholidays : ['2024-02-11 월요일','2024-02-13 수요일',' '],
    businessHours: {
      customer: '현대카드',
      group: 'H1',
      description: '',
      monday: {
        isHoly: false,
        is24: true,
        openingTime: '09:00',
        closingTime: '18:00',
      },
      saturday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
      sunday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
    },
    updateat: '2024-02-11 13:07:03',
  },
  {
    id: 2,
    customer: 'KB국민카드',
    group: 'K1',
    vdn: '45',
    holidays : ['매주 마지막주 금요일','',''],
    Tempholidays : ['2024-02-11 월요일','2024-02-13 수요일',' '],
    businessHours: {
      customer: 'KB국민카드',
      group: 'K1',
      description: '',
      monday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
      saturday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '12:00',
      },
      sunday: {
        isHoly: true,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
    },
    updateat: '2024-02-11 13:07:03',
  },
  { id: 3,
    customer: '롯데카드',
    group: 'L1',
    vdn: '26',
    holidays : ['매주 첫째주 월요일','매주 마지막주 수요일',' '],
    Tempholidays : ['2024-02-11 월요일','2024-02-13 수요일',' '],
    businessHours: {
      customer: 'KB국민카드',
      group: 'K1',
      description: '',
      monday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
      saturday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '12:00',
      },
      sunday: {
        isHoly: true,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
    },
    updateat: '2024-02-11 13:07:03',
  },
  {
    id: 4,
    customer: '벤츠 파이낸셜',
    group: 'B1',
    vdn: '56',
    holidays : ['매주 마지막주 금요일','',''],
    Tempholidays : ['2024-02-11 월요일','2024-02-13 수요일',' '],
    businessHours: {
      customer: 'KB국민카드',
      group: 'K1',
      description: '',
      monday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
      saturday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '12:00',
      },
      sunday: {
        isHoly: true,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
    },
    updateat: '2024-02-11 13:07:03',
  },
  {
    id: 5,
    customer: 'A사',
    group: 'A5',
    vdn: '67',
    holidays : ['매주 마지막주 금요일','',''],
    Tempholidays : ['2024-02-11 월요일','2024-02-13 수요일',' '],
    businessHours: {
      customer: 'KB국민카드',
      group: 'K1',
      description: '',
      monday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
      saturday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '12:00',
      },
      sunday: {
        isHoly: true,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
    },
    updateat: '2024-02-11 13:07:03',
  },
  {
    id: 7,
    customer: 'B사',
    group: 'B5',
    vdn: '55',
    holidays : ['','',' '],
    Tempholidays : ['','',' '],
    businessHours: {
      customer: 'B사',
      group: 'B5',
      description: '',
      monday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
      saturday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
      sunday: {
        isHoly: false,
        is24: false,
        openingTime: '09:00',
        closingTime: '18:00',
      },
    },
    updateat: '2024-02-11 13:07:03',
  }

]
  export default {
    data () {
      return {
        table1: {
          headers: [...headerColumns],
          columns: [...tableColumns],
          data: [...tableData]
        },
        filterOrder: {
          customer: "",
              group:"",
        },
        options:[],
        optGroups:[],
        pageSize:3,
        currentPage:1,
        expandedRow: null,
        expandedData: null,
      }
    },
    watch: { //데이터나 속성을 직접 감시하고 특정 동작을 수행하도록 설정
      currentPage: {
        handler() {
          this.updateTableData();
        },
        immediate: true
      },
      filterOrder: {
        handler() {
          this.currentPage=1;
          this.updateTableData();
        },
        deep: true,
      },
    },
    computed:{ //종속성 값이 변하면 자동으로 변경이 있는 부분만 재계산, 변하지 않으면 캐싱값 반환.
      filteredData() {
        //종속성 : tableData, filterOrder.customer, filterOrder.group
        if (this.filterOrder.customer===''|| this.filterOrder.customer === '전체'){
          return tableData;
        } else if(this.filterOrder.group ==='전체') {
          return tableData.filter(row => {
            const customerMatch = this.filterOrder.customer ? row.customer.toLowerCase().includes(this.filterOrder.customer.toLowerCase()) : true;
            return customerMatch;
          });
        } else {
          return tableData.filter(row => {
            const customerMatch = this.filterOrder.customer ? row.customer.toLowerCase().includes(this.filterOrder.customer.toLowerCase()) : true;
            const groupMatch = this.filterOrder.group ? row.group.toLowerCase().includes(this.filterOrder.group.toLowerCase()) : true;
            
              return customerMatch && groupMatch;
          });
        }
      },
      paginatedData() {
        // 현재 페이지에 해당하는 데이터만 추출하여 반환합니다.
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        console.log(this.currentPage, this.pageSize);
        return this.filteredData.slice(startIndex, endIndex);
      },
      extractCustomers() {
        // 옵션 항목을 위해 전체 리스트에서 중복 없는 고객사항목을 추출
        const customersSet = new Set();
        tableData.forEach(item => {
          customersSet.add(item.customer);
        });
        const optins =  Array.from(customersSet);
        optins.push('전체');
        return optins;
      },
      extractGroups() {
        // 옵션 항목을 위해 전체 리스트에서 중복 없는 그룹항목을 추출
          const groupsSet = new Set();
          tableData.forEach(item => {
              if (this.filterOrder.customer === item.customer) {
                groupsSet.add(item.group);}
              });
          const optinGroups =  Array.from(groupsSet);
          optinGroups.push('전체');
          return optinGroups;
      },
    },
    methods : {
      updateTableData(){
        this.table1.data = this.paginatedData;
      },
      togleGroup(item){
        // 클릭한 행의 데이터를 저장하여 디테일 화면에 출력
        // 동일한 행 클릭시 토글 기능 구현
        if (item) { 
          this.expandedData = this.expandedData === item ? null : item;
          console.log(this.expandedData.id);
        }
      },
      updateHoly(){
          console.log("updateHoly :" + this.expandedData.id);
          this.$router.push("/admin/holytditform/"+this.expandedData.id);
      },
      updateTime(){
          console.log("updateGroup :" + this.expandedData.id);
          this.$router.push("/admin/timetditform/"+this.expandedData.id);
      },
      deleteGroup(row){
        if(confirm(row.id +" " + row.vdn + "를 삭제하시겠습니까?")){
          console.log("deleteGruop :" + row.id);
        }
      },
      addGroup(){
        if(confirm("그룹을 추가하시겠습니까?")){
          this.$router.push("/admin/groupupdate/-1");
        }
      },
    },
    created: {
    // Vue 인스턴스가 생성되고 초기화된 후에 호출
    // 템플릿이 아직 렌더링되지 않았으며, DOM 요소에 접근할 수 없습니다. 
    // 데이터를 초기화하거나 비동기 작업을 수행하기에 적합합니다.
    },
    mounted(){
      //Vue 인스턴스가 DOM에 마운트된 후에 호출
      //템플릿이 렌더링되었으며, DOM 요소에 접근할 수 있습니다.
      //외부 API를 호출하거나 DOM을 조작하는 등의 작업을 수행하기에 적합합니다.
      this.updateTableData();
    }
}
</script>