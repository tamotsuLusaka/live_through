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
      <div class="_container">
        <label for="email" class="_label">メールアドレス</label>
        <input type="text" v-model="user.email" @blur="v$.user.email.$touch()" id="email" placeholder="半角英数字で入力" :class="{'_input-error': v$.user.email.$error}" class="_input-text">
        <p v-if="v$.user.email.$error" class="_input-error-message">有効なメールアドレスを入力してください。</p>
      </div>
      <div class="_container">
        <label for="password" class="_label">パスワード</label>
        <div class="_input-icon-box">
          <input :type="passwordInputType" v-model="user.password" @blur="v$.user.password.$touch()" id="password" placeholder="半角英数字8文字以上で入力" :class="{'_input-error': v$.user.password.$error}" class="_input-text">
          <img @click="showPassword()" :src="showPasswordIcon" alt="" class="_input-icon-image">
        </div>
        <p v-if="v$.user.password.$error" class="_input-error-message">8文字以上の英数字で入力してください。</p>
      </div>

      <div class="_container">
        <p class="_label">居住地</p>
        <div class="_multi-box _multi-box-start" >
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="user.prefecture"  @change="_selectColor($event)" @blur="v$.user.prefecture.$touch()" required id="prefecture" :class="{'_input-error': v$.user.prefecture.$error}" class="_multi-select" >
              <option :value="null" disabled class="_select-default">都道府県の選択</option>
              <option v-for="prefecture in $store.getters['select/prefecture']" :key="prefecture.id" :value="prefecture.text" :style="{'color': '#131313'}" >{{prefecture.text}}</option>
            </select>
          </div>
        </div>
        <div class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.user.city.$error}">
          <div class="_multi-inner _multi-inner-end">
            <input type="text" v-model="user.city" @blur="v$.user.city.$touch()" id="city" placeholder="市町村名を入力 任意"  class="_multi-input-text">
          </div>
        </div>
        <p v-if="v$.user.city.$error" class="_input-error-message">10文字以内で市町村名のみを入力してください。</p>
      </div>
      <div class="_button-container">
        <button :disabled="v$.user.$invalid || inactiveButton" @click="signUp()" :class="{'_invalid-button': v$.user.$invalid}" class="_button-s">アカウント作成</button>
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

import auth from '@/firebase/modules/auth.js'
import db from '@/firebase/modules/db.js'
import useVuelidate from '@vuelidate/core'
import { required, email, alphaNum, minLength, maxLength } from '@vuelidate/validators'

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
      pageType: "sign",
      pageTitle: "新規アカウント作成",
      isBack: "/",
      isPcTitle: true,
      inactiveButton: false,
      errorMessage:"",
      user: new User(),
      // パスワードの表示切り替えステータス
      passwordInputType: "password",
      showPasswordIcon: require("@/assets/images/visibility-on.png")
    }
  },
  methods:{
    showPassword(){
      if(this.passwordInputType === "password"){
        this.passwordInputType = "text"
        this.showPasswordIcon = require("@/assets/images/visibility-off.png")
      }else{
        this.passwordInputType = "password"
        this.showPasswordIcon = require("@/assets/images/visibility-on.png")
      }
    },
    signUp(){
      this.inactiveButton = true
      auth.signUp(this.user.email, this.user.password)
      .then((userCredential)=>{
        this.user.id = userCredential.user.uid
        db.createUser(this.user)
        .then(()=>{
          this.$store.commit('auth/setUserName', this.user.name)
          this.$router.push({name: 'Home'})
        })
        .catch((error)=>{
          this.inactiveButton = false
          console.log(error.message)
        })
      })
      .catch((error)=>{
        console.log(error.message)
        this.inactiveButton = false
        if(error.message === "Firebase: Error (auth/email-already-in-use)."){
          this.errorMessage = "このメールアドレスはすでに使用されています。"
        }else{
          this.errorMessage = "アカウント作成に失敗しました。再度やり直して下さい。"
        }
         
      })
    }
  },
	

  mounted(){
    
  },

  created(){

  },
  validations(){
    return{
      user:{
        name:{
          required,
          maxLength: maxLength(18)
        },
        email:{
          required,
          email
        },
        password:{
          required,
          alphaNum,
          minLength: minLength(8)
        },
        prefecture:{
          required,
        },
        city:{
          maxLength: maxLength(10)
        },
      }
    }
  },
}
</script>

<style scoped>

</style>