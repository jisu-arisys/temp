<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">사용자 관리</h4>
              <p class="card-category">수정된 사용자 목록을 표시하고 관리할 수 있는 페이지.12명 이상이면 스크롤 발생</p>
              <div class="col-12">
                <router-link :to="{path:'/admin/userupdate'}" class="btn float-right btn-success btn-sm" >Add</router-link>
              </div>
            </template>
            <ud-table class="table-hover table-striped"
                     :columns="table1.columns"
                     :data="table1.data">
            </ud-table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import UdTable from 'src/components/TableUpdateDelete.vue'
  import Card from 'src/components/Cards/Card.vue'
  const tableColumns = ['Id', '사용자ID', '사용자명']
  const tableData = [{
    id: 1,
    사용자id: 'admin',
    사용자명: '관리자',
  },
  {
    id: 2,
    사용자id: 'test1',
    사용자명: '테스터',
  },
  {
    id: 3,
    사용자id: 'test2',
    사용자명: '테스터2',
  },
  {
    id: 4,
    사용자id: 'test3',
    사용자명: '테스터3',
  },
  {
    id: 5,
    사용자id: 'user',
    사용자명: '사용자',
  }]
  export default {
    components: {
      UdTable,
      Card
    },
    data () {
      return {
        table1: {
          columns: [...tableColumns],
          data: [...tableData]
        },
        table2: {
          columns: [...tableColumns],
          data: [...tableData]
        }
      }
    },
    methods : {
     
    }
  }
</script>
<style>
</style>
