<template>
  <div class="content">
    <div class="container">
  <card>
    <h4 slot="header" class="card-title">Holidays</h4>
    <form>
      <div class="row">
        <div class="col-md-6">
          <div v-if="errors.length">
            <div
            class="alert alert-danger"
            v-bind:key="index"
            v-for="(error, index) in errors"
            >
            {{ error }}
          </div>
        </div>
        </div>
      </div>
      

      <div class="row">
        <div class="col-md-3">
          <label>CUSTOMER</label>
          <span class="p-4">{{ data.customer }}</span>
        </div>
        <div class="col-md-3">
          <label>GROUP</label>
          <span class="p-4">{{ data.group }}</span>
          <!-- <base-input type="text"
                    label="group"
                    placeholder="group"
                    v-model="data.group">
          </base-input> -->
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <label for="customSwitch">공휴일 사용여부</label>
        </div>
        <div class="col-md-4">
          <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" id="customSwitch" v-model="data.isPublicHoliday">
            <label class="custom-control-label" for="customSwitch"> {{data.isPublicHoliday}}</label>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <hr>
        </div>
      </div>

      <div class="row">
        <div class="col-md-5">
          <label>정기휴무 </label>
        </div>
        <div class="col-md-1">
          <button @click="cycleSize++" class="btn float-right btn-success btn-xs">add</button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <label>* 주기와 요일을 모두 입력해야 등록이 가능합니다.</label>
          <label>{{ cycleHolidays }}</label>
        </div>
      </div>

      <div class="row" v-for="index in cycleSize" :key="index">
        <div class="col-md-5">
          <label class="px-4">{{ index }}</label>
          <select v-model="cycleHolidays[index-1].cycle" class="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2">
            <option v-for="(option) in options.cycle" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
          &nbsp;
          <select v-model="cycleHolidays[index-1].dayOfWeek" class="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2">
            <option v-for="(option) in options.dayOfWeek" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
        </div>
        <div class="col-md-1">
          <button @click="cycleSizeDecrease(index-1)" class="btn float-right btn-danger btn-xs">remove</button>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="validateAndSubmit">
          Update
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
        
</div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        errors: [],
        cycleSize: 1,
        options:{
          cycle:[
            {label:'매월 첫째주', value:"w1"},
            {label:'매월 둘째주', value:"w2"},
            {label:'매월 셋째주', value:"w3"},
            {label:'매월 마지막주', value:"wl"},
            {label:'매주',value:"aw"}
          ],
          dayOfWeek:[
          {label:'월요일', value:"mon"},
          {label:'화요일', value:"tue"},
          {label:'수요일', value:"wed"},
          {label:'목요일', value:"thu"},
          {label:'금요일', value:"fri"},
          ],
        },
        cycleHolidays:  [{cycle:'w1', dayOfWeek: 'mon'}, {cycle:'w2', dayOfWeek: 'tue'}],
        data: {
          id: 1,
          customer: '현대카드',
          group: 'H1',
          vdn: '36',
          isPublicHoliday: true,
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
          }
        }
      }
    },
    methods: {
      cycleSizeDecrease(index){
        this.cycleSize--;
        this.cycleHolidays.splice(index, 1);
        // this.cycleHolidays.dayOfWeek.splice(index, 1);
      },
      setHolyHours(id, openingTime, closingTime, isHoly) {
      this.businessHours[id].openingTime = openingTime;
      this.businessHours[id].closingTime = closingTime;
      this.businessHours[id].isHoly = isHoly;
      },
      getTimeDiff(time1,time2){
        const openingTime = this.$dayjs(`2024-03-14T${time1}:00`);
        const closingTime = this.$dayjs(`2024-03-14T${time2}:00`);
        const timeDiff = closingTime.diff(openingTime,'minutes');
        console.log(time1 +'~' +time2 + ':'+ timeDiff);
        return timeDiff;
      },
      checkDuplication(){
        //정기휴무일의 중복여부를 확인
        const duplicateItems = [];
        const duplicateIndexes = [];

        this.cycleHolidays.cycle.forEach((item, index) => {
          if (this.cycleHolidays.cycle.indexOf(item) !== index) {
            // 중복된 항목이 있다면 duplicateItems 배열에 추가하고 중복된 인덱스를 duplicateIndexes 배열에 저장합니다.
            duplicateItems.push(item);
            duplicateIndexes.push(index);
          }
        });
        return duplicateIndexes;
      },
      validateAndSubmit(e) {
      this.errors = [];

      if (!this.cycleHolidays) {
        this.errors.push("Enter valid values");
      } else if (this.checkDuplication()>0) {

        this.errors.push("정기휴무일은 중복되지 않아야 합니다." + this.checkDuplication());
      }

      if (this.errors.length === 0) {
        if (this.id == -1) {
          // UserDataService.createUser({
          //   firstName: this.firstName,
          //   lastName: this.lastName,
          //   emailId: this.emailId,
          // }).then(() => {
            alert('Your data: ' + JSON.stringify(this.cycleHolidays))
            this.$router.push("/admin/grouplist");
          // });
        } else {
          // UserDataService.updateUser(this.id, {
          //   id: this.id,
          //   firstName: this.firstName,
          //   lastName: this.lastName,
          //   emailId: this.emailId,
          // }).then(() => {
            alert('Your data: ' + JSON.stringify(this.businessHours))
            this.$router.push("/admin/grouplist");
          // });
        }
      }
    },
    }
  }

</script>
<style>
</style>
