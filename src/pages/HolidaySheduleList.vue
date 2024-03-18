<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">고객사 그룹별 근무시간/휴일 관리</h4>
              <p class="card-category">등록된 고객사 목록을 표시하고 관리할 수 있는 페이지.</p>
            </template>

            <div class="d-flex">
              <div class="col-3 p-3">
                <input type="month" value="월"  class="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-1 text-sm"/>
              </div>
              <div class="col-6 p-3 lg">
                <label>
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
                     @edit = "updateGroup"
                     @del = "deleteGroup">
            </u-table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  const tableColumns = ['Id','customer', 'group', 'Vdn' ,'updateat']
  const tableData = [{
    id: 1,
    customer: 'A사',
    group: 'A1',
    vdn: '3678,4567',
    updateat: '2024-02-11 13:07:03',

  },
  { id: 2,
    customer: 'A사',
    group: 'A2',
    vdn: '2678,2567',
    updateat: '2024-02-11 13:07:03',
  },
  {
    id: 3,
    customer: 'A사',
    group: 'A5',
    vdn: '5678,5567',
    updateat: '2024-02-11 13:07:03',
  },
  {
    id: 4,
    customer: 'O사',
    group: 'O7',
    vdn: '3678,4567',
    updateat: '2024-02-11 13:07:03',
  },
  {
    id: 7,
    customer: 'O사',
    group: 'O9',
    vdn: '9678,9567',
    updateat: '2024-02-11 13:07:03',
  }]
  export default {
    customer: "",
        group:"",
    data () {
      return {
        table1: {
          columns: [...tableColumns],
          data: [...tableData]
        },
        filterOrder: {
          customer: "",
              group:"",
        },
        options:[],
        optGroups:[],
      }
    },
    methods : {
      updateGroup(row){
          console.log("updateGroup :" + row.id);
          this.$router.push("/admin/holidayshedule/"+row.id);
      },
      deleteGroup(row){
        if(confirm(row.id +" " + row.vdn + "를 삭제하시겠습니까?")){
          console.log("deleteGruop :" + row.id);
        }
      },
      addGroup(){
        if(confirm("그룹을 추가하시겠습니까?")){
          this.$router.push("/admin/holidayshedule/-1");
        }
      }
    }

}
</script>