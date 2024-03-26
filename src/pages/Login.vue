<template>
  <div class="content">
    <div class="container">
      <div class="row">
        <div>
          <h3>User</h3>
          <div class="container">
            <form @submit="validateAndSubmit">
              <div v-if="errors.length">
                <div
                  class="alert alert-danger"
                  v-bind:key="index"
                  v-for="(error, index) in errors"
                >
                  {{ error }}
                </div>
              </div>
              <fieldset class="form-group">
                <label>Id</label>
                <input type="text" class="form-control" v-model="userid" required/>
              </fieldset>
              <fieldset class="form-group">
                <label>Pw</label>
                <input type="password" class="form-control" v-model="userpw" required/>
              </fieldset>
              <fieldset class="form-group">
                <label>isSaveId</label>
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="customSwitch" v-model="isSaveId">
                  <label class="custom-control-label" for="customSwitch"> {{isSaveId}}</label>
                </div>              
              </fieldset>
              <button class="btn btn-success" type="submit" @click.prevent="validateAndSubmit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "User",
  data() {
    return {
      tableData: [
        { id: 1, userid: 'admin', userpw: 'admin', isSaveId: true },
        { id: 2, userid: 'test1', userpw: 'test1', isSaveId: true },
        { id: 3, userid: 'test2', userpw: 'test2', isSaveId: true },
        { id: 4, userid: 'test3', userpw: 'test3', isSaveId: true },
        { id: 5, userid: 'user', userpw: 'user', isSaveId: true }
      ],
      userid: "",
      userpw: "",
      isSaveId: "",
      errors: [],
      
    };
  },
  methods: {
    refreshUserDetails() {
      const isLoggedIn = this.$store.getters.isLoggedIn;
      const userId = this.$store.getters.userId;
      const isSavedId = this.$store.getters.isSavedId;

      // console.log(isLoggedIn, userId, isSavedId);
      
      this.isSaveId = isSavedId;
      // console.log(this.isSaveId);

      if(!isLogined){
        this.userid = userId;
      }else{
        this.$router.push("/admin/overview");
      }
    },
    validateAndSubmit() {
      this.errors = [];
      if (!this.userid) {
        this.errors.push("Enter valid values");
      } else if (this.userid.length < 4) {
        this.errors.push("Enter atleast 4 characters in Id");
      }
      if (!this.userpw) {
        this.errors.push("Enter valid values");
      } else if (this.userpw.length < 4) {
        this.errors.push("Enter atleast 4 characters in Pw");
      }

      //임시 확인
      const userData  = this.tableData.find(user => user.userid === this.userid && user.userpw === this.userpw);
      
      if(userData){
        console.log(this.userid + " login success");
      }else{
        this.errors.push(this.userid + " and password is not found");
      }

      if (this.errors.length === 0) {
        // UserDataService.updateUser(this.id, {
        //   id: this.id,
        //   userid: this.userid,
        //   userpw: this.userpw,
        //   emailId: this.emailId,
        // }).then(() => {
          this.logIn();
        // });
      }
    },
    logIn(){
        this.$store.dispatch('login',this.userid);
        this.$router.push("/admin/overview");
    },
  },
  created() {
    this.refreshUserDetails();
  },
};
</script>