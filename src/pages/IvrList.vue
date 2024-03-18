<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">고객사 관리</h4>
              <p class="card-category">등록된 고객사 목록을 표시하고 관리할 수 있는 페이지.</p>
            </template>
            <l-table class="table-hover table-striped"
                     :columns="table1.columns"
                     :data="table1.data">
            </l-table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  const tableColumns = ['Id', 'customer', 'Ivr', 'updateat', 'CID']
  const tableData = [{
    id: 1,
    ivr: 7332,
    updateat: '2024-02-11 13:07:03',
    cid: '0124',
    customer: 'A사'
  },
  {
    id: 2,
    ivr: 7333,
    updateat: '2024-02-11 13:07:03',
    cid: '0125',
    customer: 'A사'
  },
  {
    id: 3,
    ivr: 7334,
    updateat: '2024-02-11 13:07:03',
    cid: '0125',
    customer: 'A사'
  },
  {
    id: 4,
    ivr: 7336,
    updateat: '2024-02-11 13:07:03',
    cid: '0126',
    customer: 'O사'
  },
  {
    id: 5,
    ivr: 7337,
    updateat: '2024-02-11 13:07:03',
    cid: '0126',
    customer: 'O사'
  }]
  export default {
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
    }
  }
</script>
<style>
</style>
