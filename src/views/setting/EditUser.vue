<template>
  <div class="_base">
    <Spinner v-if="inactiveButton"></Spinner>
    <SubHeader  :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content">
      <p v-if="errorMessage !== ''" class="_error-message">{{errorMessage}}</p>
      <div class="_container">
        <label for="name" class="_label">アーティスト名</label>
        <input type="text" v-model="user.name" @blur="v$.user.name.$touch()" id="name" placeholder="18字以内で入力" :class="{'_input-error': v$.user.name.$error}" class="_input-text">
        <p v-if="v$.user.name.$error" class="_input-error-message">18文字以内で入力してください。</p>
      </div>
      <div class="_button-container">
        <button :disabled="v$.user.$invalid || inactiveButton" @click="editUser()" :class="{'_invalid-button': v$.user.$invalid}" class="_button-s">保存</button>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>

import SubHeader from '@/components/SubHeader.vue'
import Mixin from '@/mixin/mixin.js'
import Footer from '@/components/Footer.vue'
import Spinner from '@/components/Spinner.vue'

import User from '@/class/User.js'

import db from '@/firebase/modules/db.js'
import useVuelidate from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators'

export default {
  name: 'SignUp',
  components: {
    SubHeader,
    Footer,
    Spinner
  },
  mixins:[
    Mixin
  ],
  setup(){
    return { v$: useVuelidate()}
  },
  data(){
    return{
      pageType: "setting",
      pageTitle: "アーティスト名の変更",
      isBack: true,
      isPcTitle: true,
      inactiveButton: false,
      errorMessage:"",

      user: new User(),
    }
  },
  created(){
    db.getUser(this.$store.getters['auth/userId'])
    .then((doc)=>{
      this.user = doc.data()
    })
    .catch((error)=>{
      console.log(error.message)
    })
  },
  methods:{
    editUser(){
      this.inactiveButton = true
      db.editUser(this.user)
      .then(()=>{
        this.inactiveButton = false
        this.$router.push({name:'Setting'})
      })
      .catch((error)=>{
        this.inactiveButton = false
        console.log(error.message)
        this.errorMessage = "保存に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    },
  },
	

  mounted(){
    
  },


  validations(){
    return{
      user:{
        name:{
          required,
          maxLength: maxLength(18)
        },
      }
    }
  },
}
</script>

<style scoped>

</style>