<template>
  <div class="_base">
    <Spinner v-if="inactiveButton"></Spinner>
    <SubHeader  :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content">
      <p v-if="errorMessage !== ''" class="_error-message">{{errorMessage}}</p>
      <div class="_container">
        <label for="name" class="_label">ステージプロット名</label>
        <input type="text" v-model="band.name" @blur="v$.band.name.$touch()" placeholder="18文字以内で入力" :class="{'_input-error': v$.band.name.$error}" class="_input-text">
        <p v-if="v$.band.name.$error" class="_input-error-message">18文字以内で入力してください。</p>
      </div>
      <div class="_container">
        <label for="tune" class="_label">メンバーリスト</label><Helper :helperObject="helper.list"></Helper>
        <div @click="addMember()" class="_link-mini-white _marginSS">
          <img src="@/assets/images/icon-set-blue.png" class="_link-mini-icon" alt="">
          <p class="_link-mini-text">メンバー（パート）を追加</p>
        </div>
        <div v-for="(part, index) in band.lists" :key="index" class="_multi-box" :class="{'_multi-box-start': index === 0, '_multi-box-end': band.lists.length -1 === index}" >
          <router-link :to="{name: 'EditInstrument', params:{id: band.id, instrumentId: part.id}}" class="_multi-inner" :class="{'_multi-inner-end': band.lists.length -1 === index}">
            <p class="_multi-text">{{$store.getters['select/getInstrumentValue'](part.type)}}. {{part.member}}</p>
            <img  src="@/assets/images/icon-arrow-r.png" alt="" class="_multi-icon _arrow">
          </router-link>
        </div>
      </div>

      <div class="_container">
        <label class="_label">パート配置図</label><Helper :helperObject="helper.position"></Helper>
        <StageLayout v-if="isBandFetched" mode="display" :band="band" class="_marginS"></StageLayout>
      </div>

      <div class="_container">
        <label for="textForLighting" class="_label">備考</label><Helper :helperObject="helper.note"></Helper>
        <textarea v-model="band.text" @blur="v$.band.text.$touch()" placeholder="200文字以内で入力 任意" :class="{'_input-error': v$.band.text.$error}" class="_input-textarea"></textarea>
        <p v-if="v$.band.text.$error" class="_input-error-message">200文字以内で入力してください。</p>
      </div>

      <div class="_button-container">
        <button  :disabled="v$.band.$invalid || inactiveButton" @click="editBand()" :class="{'_invalid-button': v$.band.$invalid}" class="_button-s _marginM">保存</button>
        <button  :disabled="inactiveButton" @click="deleteBand()"  class="_button-red">削除</button>
      </div>
    </div>
    <Footer></Footer>
    <Alert :isShown="isAlertShown" :message="alertMessage" @closeAlert="closeAlert()"></Alert>
  </div>
</template>

<script>

import SubHeader from '@/components/SubHeader.vue'
import Helper from '@/components/Helper.vue'
import Spinner from '@/components/Spinner.vue'
import Mixin from '@/mixin/mixin.js'
import Footer from '@/components/Footer.vue'
import Alert from '@/components/Alert.vue'
import StageLayout from '@/components/stagePlot/StageLayout.vue'

import Band from '@/class/Band.js'

import db from '@/firebase/modules/db.js'

import useVuelidate from '@vuelidate/core'
import { required, maxLength} from '@vuelidate/validators'

  

export default {
  name: 'CreateBand',
  components: {
    Spinner,
    SubHeader,
    Helper,
    Footer,
    Alert,
    StageLayout
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
      pageTitle: "バンドステージの作成",
      isBack: true,
      isPcTitle: true,
      inactiveButton: false,
      errorMessage: "",
      isAlertShown: false,
      alertMessage: "",

      band: new Band(),
      isBandFetched: false,
      maxMember: 6, //最大人数

      helper:{
        list:{
          title:"メンバーリスト",
          text:"【メンバーを追加】から各メンバーのパート・位置・機材等を設定して下さい。\n登録されたメンバーが下部に表示されます。表示されたメンバーを選択すると内容の編集が出来ます。"
        },
        position:{
          title:"パート配置図",
          text:"各メンバー登録で指定された配置図が表示されます。\n変更の際は各メンバーの編集からおこなって下さい。"
        },
        note:{
          title:"備考",
          text:"全体的な要望等があれば入力して下さい。"
        },
      },

    }
  },
  created(){
    if(this.$route.params.id){
      db.getBand(this.$route.params.id)
      .then((doc)=>{
        this.band = doc.data()

        this.isBandFetched = true
      })
      .catch((error)=>{
        this.errorMessage = "データの取得に失敗しました。"
        console.log(error.message)
      })
    }
  },
  mounted(){
    
  },
  methods:{
    // createMusic(){
    //   this.inactiveButton = true
    //   this.music.userId = this.$store.getters['auth/userId']
    //   db.createMusic(this.music)
    //   .then(()=>{
    //     this.inactiveButton = false
    //     this.$router.push({name:'Music'})
    //   })
    //   .catch((error)=>{
    //     this.inactiveButton = false
    //     console.log(error.message)
    //     this.errorMessage = "登録に失敗しました。もう一度やり直して下さい。"
    //     this._goToTop()
    //   })
    // },
    editBand(){
      db.editBand(this.band)
      .then(()=>{
        this.inactiveButton = false
        this.$router.push({name:'ShowBand', params:{id: this.band.id}})
      })
      .catch((error)=>{
        console.log(error.message)
        this.errorMessage = "更新に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    },
    deleteBand(){
      db.deleteBand(this.band.id)
      .then(()=>{
        this.$router.push({name:'StagePlot'})
      })
      .catch((error)=>{
        console.log(error.message)
        this.errorMessage = "削除に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    },
    addMember(){
      if(this.band.lists.length < this.maxMember){
        this.$router.push({name: 'SelectInstrument', params:{id: this.$route.params.id}})
      }else{
        this.alertMessage = "メンバー追加の上限に達しています。"
        this._stop(true)
        this.isAlertShown = true
      }
    },
    closeAlert(){
      this._stop(false)
      this.isAlertShown = false
      this.alertMessage = null
    }
  },

  validations(){
    return{
      band:{
        name:{
          required,
          maxLength: maxLength(18)
        },

        text:{
          maxLength: maxLength(200)
        },


      }
    }
  },
}
</script>

<style scoped>

</style>