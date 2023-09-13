<template>
  <div class="_base">
    <Spinner v-if="inactiveButton"></Spinner>
    <SubHeader  :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content">
      <p v-if="errorMessage !== ''" class="_error-message">{{errorMessage}}</p>
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
import Spinner from '@/components/Spinner.vue'

import auth from '@/firebase/modules/auth.js'
import useVuelidate from '@vuelidate/core'
import { required, email, alphaNum, minLength,} from '@vuelidate/validators'

export default {
  name: 'SignIn',
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
      pageTitle: "ログイン",
      isBack: "/",
      isPcTitle: true,
      inactiveButton: false,
      errorMessage:"",
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
      this.inactiveButton = true
      auth.signIn(this.user.email, this.user.password)
      .then(()=>{
        this.inactiveButton = false
        this.$router.push({name: 'Home'})
      })
      .catch((error)=>{
        this.inactiveButton = false
        if(error.code === "auth/wrong-password"){
          this.errorMessage = "メールアドレスまたはパスワードが間違っています。"
        }else if(error.code === "auth/user-not-found"){
          this.errorMessage = "メールアドレスまたはパスワードが間違っています。"
        }else if(error.code === "auth/user-disabled"){
          this.errorMessage = "アカウントが無効です。"
        }else if(error.code === "auth/invalid-email"){
          this.errorMessage = "メールアドレスまたはパスワードが間違っています。"
        }else if(error.code === "auth/too-many-requests"){
          this.errorMessage = "間違ったパスワードが複数回入力されたのでログインがブロックされました。"
        }else{
          this.errorMessage = "ログインに失敗しました。"
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