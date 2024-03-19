<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
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
                    <option v-for="(option, index) in options" :key="index" :value="option">{{ option }}</option>
                  </select>
                </label>
                &nbsp;&nbsp;
                <label>
                  Ivr그룹
                  <select v-model="filterOrder.group" class="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2">
                    <option v-for="(option, index) in optGroups" :key="index" :value="option">{{ option }}</option>
                  </select>
                </label>
              </div>
              <div class="col-3 p-2">
                  <button class="btn float-right btn-success btn-sm" @click="addGroup()">
                    Add
                  </button>
              </div>
            </div>
            <u-table class="table-hover table-striped"
                     :columns="table1.columns"
                     :data="table1.data"
                     @edit="updateGroup"
                     @del="deleteGroup"
                     @handle="togleGroup">

            </u-table>
            <br>
          </card>
        </div>
      </div>
      <div class="row">
        <div class="col-12">          
          <card>
            <label>Details</label>
              <div v-if=expandedbusinessHours>
                <table>
                  <tr >
                    <td class="col-1"><label>Customer</label></td>
                    <td class="col-4">{{ expandedbusinessHours.customer }}</td>
                  </tr>
                  <tr >
                    <td class="col-1"><label>Group</label></td>
                    <td class="col-4">{{ expandedbusinessHours.group }}</td>
                  </tr>
                  <tr>
                    <td colspan="2" rowspan="4">
                      <table>
                        <tr>
                          <td><label>영업시간</label></td>
                        </tr>
                        <tr>
                          <td class="col-2 "><label>월요일 ~ 금요일</label></td>
                          <td class="col-4">
                            <span v-if="expandedbusinessHours.monday.isHoly">휴일</span>
                            <span v-else-if="expandedbusinessHours.monday.is24">24시간</span>
                            <span v-else>{{ expandedbusinessHours.monday.openingTime +' ~ '+expandedbusinessHours.monday.closingTime }}</span>
                          </td>
                        </tr>
                        <tr>
                          <td class="col-2 "><label>토요일</label></td>
                          <td class="col-4">
                            <span v-if="expandedbusinessHours.saturday.isHoly">휴일</span>
                            <span v-else-if="expandedbusinessHours.saturday.is24">24시간</span>
                            <span v-else>{{ expandedbusinessHours.saturday.openingTime +' ~ '+expandedbusinessHours.saturday.closingTime }}</span>
                          </td>
                        </tr>
                        <tr>
                          <td class="col-2 "><label>일요일</label></td>
                          <td class="col-4">
                            <span v-if="expandedbusinessHours.sunday.isHoly">휴일</span>
                            <span v-else-if="expandedbusinessHours.sunday.is24">24시간</span>
                            <span v-else>{{ expandedbusinessHours.sunday.openingTime +' ~ '+expandedbusinessHours.sunday.closingTime }}</span>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td colspan="2" rowspan="4">
                      <table>
                        <tr>
                          <td><label>휴무일</label></td>
                        </tr>
                        <tr v-for="(holiday, index) in 3" :key="index">
                          <td class="col-4">{{ expandedHolidays[index] }}&nbsp;</td>
                        </tr>
                      </table>
                    </td>
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
    opentime: '09:00',
    closetime: '18:00',
    updateat: '2024-02-11 13:07:03',
  },
  {
    id: 4,
    customer: '벤츠 파이낸셜',
    group: 'B1',
    vdn: '56',
    opentime: '09:00',
    closetime: '18:00',
    updateat: '2024-02-11 13:07:03',
  },
  {
    id: 5,
    customer: 'A사',
    group: 'A5',
    vdn: '67',
    opentime: '09:00',
    closetime: '18:00',
    updateat: '2024-02-11 13:07:03',
  },
  {
    id: 6,
    customer: 'B사',
    group: 'B5',
    vdn: '55',
    opentime: '09:00',
    closetime: '18:00',
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
        expandedRow: null,
        expandedbusinessHours: null,
        expandedHolidays: null,
      }
    },
    watch: {
      filterOrder: {
        handler(newFilterOrder) {
          this.filterData(newFilterOrder);
          this.extractGroups(newFilterOrder.customer);
          console.log(newFilterOrder.customer, newFilterOrder.group);
        },
        deep: true
      },
    },
    methods : {
      togleGroup(index){
        // 클릭한 행의 인덱스를 저장하여 토글 기능 구현
        if (index >= 0 && index < tableData.length) { 
          // this.expandedRow = index;
          this.expandedRow = this.expandedRow === index ? null : index;
          this.expandedbusinessHours = tableData[this.expandedRow].businessHours;
          this.expandedHolidays = tableData[this.expandedRow].holidays;
          // this.expandedDetail = JSON.stringify(tableData[this.expandedRow],null,2);
          console.log(this.expandedRow);
        }
      },
      extractCustomers() {
        const customersSet = new Set();
        tableData.forEach(item => {
          customersSet.add(item.customer);
        });
        this.options = Array.from(customersSet);
        this.options.push('전체');
      },
      extractGroups(newCustomer) {
        if(newCustomer){
          const groupsSet = new Set();
          tableData.forEach(item => {
              if (newCustomer === item.customer) {
                groupsSet.add(item.group);}
              });
          this.optGroups = Array.from(groupsSet);
          this.optGroups.push('전체');
        }
      },
      filterData(filterOrder) {
        if (filterOrder.customer === '전체') {
          // '전체' 값을 선택한 경우 필터링을 건너뛰고 원본 데이터를 보여줍니다.
          this.table1.data = tableData;
          return;
        }else if(filterOrder.group === '전체'){
          this.table1.data = tableData.filter(row => {
            const customerMatch = filterOrder.customer ? row.customer.toLowerCase().includes(filterOrder.customer.toLowerCase()) : true;
          return customerMatch;
          });
        }else{
          this.table1.data = tableData.filter(row => {
          const customerMatch = filterOrder.customer ? row.customer.toLowerCase().includes(filterOrder.customer.toLowerCase()) : true;
          const groupMatch = filterOrder.group ? row.group.toLowerCase().includes(filterOrder.group.toLowerCase()) : true;
          return customerMatch && groupMatch;
          });
        }
      },
      updateGroup(row){
          console.log("updateGroup :" + row.id);
          this.$router.push("/admin/timetditform/"+row.id);
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
    created() {
    this.extractCustomers();
  },
}
</script>