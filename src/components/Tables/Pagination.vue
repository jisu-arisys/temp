<template>
  <div class="overflow-auto">
    <div class="mt-3">
      <h6>Goto first and last button number</h6>
      <!-- <b-pagination 
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      ></b-pagination> -->
    </div>
  </div>
</template>
<script setup>
  export default {
    data () {
      return {
        rows: 100, //전체페이지수
        perPage: 1, //페이지당 게시물 수
        currentPage: 5 //현재 페이지
      }
    }
  }

</script>