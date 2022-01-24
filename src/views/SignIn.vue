<template>
  <div class="_base">
    <SubHeader  :pageType="pageType" :pageTitle="pageTitle" :backPath="backPath" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content">
      <p v-if="emailErrorMessage !== ''" class="_error-message">{{emailErrorMessage}}</p>
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
      <div class="_button-container">
        <button :disabled="v$.user.$invalid || inactiveButton" @click="signIn()" :class="{'_invalid-button': v$.user.$invalid}" class="_button-s">ログイン</button>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>

import SubHeader from '@/components/SubHeader.vue'
import Mixin from '@/mixin/mixin.js'
import Footer from '@/components/Footer.vue'

import auth from '@/firebase/modules/auth.js'
import useVuelidate from '@vuelidate/core'
import { required, email, alphaNum, minLength,} from '@vuelidate/validators'

export default {
  name: 'SignIn',
  components: {
    SubHeader,
    Footer
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
      pageTitle: "ログイン",
      backPath: "/",
      isPcTitle: true,
      inactiveButton: false,
      emailErrorMessage:"",
      user:{
        email:"",
        password:"",
      },
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
    signIn(){
      auth.signIn(this.user.email, this.user.password)
      .then(()=>{
        this.$router.push({name: 'Home'})
        console.log("成功")
      })
      .catch((error)=>{
        console.log(error.message)
        console.log("失敗")
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
        email:{
          required,
          email
        },
        password:{
          required,
          alphaNum,
          minLength: minLength(8)
        },
      }
    }
  },
}
</script>

<style scoped>

</style>