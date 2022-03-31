<template>
  <div class="_base">
    <Spinner v-if="inactiveButton"></Spinner>
    <SubHeader  :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content">
      <p v-if="errorMessage !== ''" class="_error-message">{{errorMessage}}</p>
      <div class="_container">
        <label class="_label">メンバー名</label><Helper :helperObject="helper.name"></Helper>
        <input type="text" v-model="member.name" @blur="v$.member.name.$touch()" placeholder="18文字以内で入力" :class="{'_input-error': v$.member.name.$error}" class="_input-text">
        <p v-if="v$.member.name.$error" class="_input-error-message">18文字以内で入力してください。</p>
      </div>
      <div class="_container">
        <label  class="_label">マイクナンバー</label><Helper :helperObject="helper.mic"></Helper>
        <div class="_select-box">
          <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_select-icon _arrow">
          <select v-model="member.micNumber" :class="{'_input-select-exist': member.micNumber !== null}" class="_input-select" >
            <option :value="null" disabled >マイクナンバーを選択 任意</option>
            <option v-for="select in 16" :key="select" :value="select" :style="{'color': '#131313'}" >マイクナンバー：{{select}}</option>
          </select>
        </div>
      </div>
      <div v-if="mode === 'create'" class="_button-container">
        <button  :disabled="v$.member.$invalid || inactiveButton" @click="addMember()" :class="{'_invalid-button': v$.member.$invalid}" class="_button-s _marginM">追加</button>
      </div>
      <div v-if="mode === 'edit'" class="_button-container">
        <button  :disabled="v$.member.$invalid || inactiveButton" @click="editMember()" :class="{'_invalid-button': v$.member.$invalid}" class="_button-s _marginM">保存</button>
        <button  :disabled="inactiveButton" @click="deleteMember()"  class="_button-red">削除</button>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>

import SubHeader from '@/components/SubHeader.vue'
import Helper from '@/components/Helper.vue'
import Spinner from '@/components/Spinner.vue'
import Mixin from '@/mixin/mixin.js'
import Footer from '@/components/Footer.vue'

import Idol from '@/class/Idol.js'

import db from '@/firebase/modules/db.js'
import useVuelidate from '@vuelidate/core'
import { required, maxLength} from '@vuelidate/validators'

  

export default {
  name: 'AddIdolMember',
  components: {
    Spinner,
    SubHeader,
    Helper,
    Footer,
  },
  mixins:[
    Mixin
  ],
  setup(){
    return { v$: useVuelidate()}
  },
  data(){
    return{
      pageType: "stagePlot",
      pageTitle: "メンバーの追加",
      isBack: true,
      isPcTitle: true,
      inactiveButton: false,
      errorMessage: "",
      isAlertShown: false,
      alertMessage: "",
      mode:"create", //"create", "edit"

      idol: new Idol(),
      member:{
        id: null,
        name: null,
        micNumber: null
      },

      helper:{
        name:{
          title:"メンバー名",
          text:"メンバー名（ステージネーム）を入力して下さい。"
        },
        mic:{
          title:"マイクナンバー",
          text:"使用するマイクの番号を決まっているいる場合は番号を選択して下さい。"
        }
      },

    }
  },
  created(){
    this._authCheck()
    this.idol = this.$store.getters['data/idol']
    if(this.$route.params.memberId){
      this.member = this.idol.lists.find(member=> member.id === this.$route.params.memberId)
      this.mode = "edit"
    }else{
      this.mode = "create"
    }
    console.log(this.mode)
  },
  mounted(){
    
  },
  methods:{
    addMember(){
      this.member.id = this._generateId(this.idol.id)
      this.idol.lists.push(this.member)
      db.editIdol(this.idol)
      .then(()=>{
        this.inactiveButton = false
        this.$router.push({name:'EditIdol', params:{id: this.idol.id}})
      })
      .catch((error)=>{
        console.log(error.message)
        this.errorMessage = "更新に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    },
    editMember(){
      this.idol.lists[this.idol.lists.findIndex(member=> member.id === this.$route.params.memberId)] = this.member
      db.editIdol(this.idol)
      .then(()=>{
        this.inactiveButton = false
        this.$router.push({name:'EditIdol', params:{id: this.idol.id}})
      })
      .catch((error)=>{
        console.log(error.message)
        this.errorMessage = "更新に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    },

    deleteMember(){
      this.idol.lists.splice(this.idol.lists.findIndex(member=> member.id === this.$route.params.memberId), 1)
      db.editIdol(this.idol)
      .then(()=>{
        this.inactiveButton = false
        this.$router.push({name:'EditIdol', params:{id: this.idol.id}})
      })
      .catch((error)=>{
        console.log(error.message)
        this.errorMessage = "更新に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    },

  },
	


  validations(){
    return{
      member:{
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
.add-text{
  color: var(--blue);
  text-align: center;
  font-weight: 700;
}
.cross{
  width: 28px;
  height: 28px;
  z-index:30;
  pointer-events:all
}
</style>