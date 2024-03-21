<template>
  <div class="col-md-5">
    <label> &nbsp;{{ openingTime +' ~ '+ closingTime }}</label>
    <div class="p-2">
      <!-- vue3부터 v-model 값에 prop을 담을 수 없음. @click이 있어서 v-model은 지움 -->
      <!-- <input type="radio" :id="idSet[1]" :name="id" value="18:00" v-model="closingTime" @click="setHolyHours('09:00','18:00',false)"/> -->
      <input type="radio" :id="idSet[1]" :name="id" value="18:00" @click="setHolyHours('09:00','18:00',false)"/>
      <label class="px-3" :for="idSet[1]">영업</label>

      <input type="radio" :id="idSet[2]" :name="id" value="00:00" @click="setHolyHours('00:00','00:00',true)" />
      <label class="px-3" :for="idSet[2]">휴일</label>

      <input type="radio" :id="idSet[3]" :name="id" value="24:00" @click="setHolyHours('00:00','24:00',true)" />
      <label class="px-3" :for="idSet[3]">24시간</label>
    </div>
  </div>
</template>
<script>
export default {
  name: "time-radio",
  props: {
    openingTime: String,
    closingTime: String,
    id : String,
  },

  data() {
    return {
      idSet: []
    };
  },
  methods : {
    setId(){
      if(this.id){
        idSet[1]= id + '-open';
        idSet[2]= id + '-closed';
        idSet[3]= id + '-24';
      }
    },
    setHolyHours (open,close, holy) {
      this.$emit('hours',this.id, open,close, holy)
    },
  }

}
</script>