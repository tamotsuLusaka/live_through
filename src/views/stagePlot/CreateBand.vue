<template>
  <div class="_base">
    <Spinner v-if="inactiveButton"></Spinner>
    <SubHeader  :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content">
      <p v-if="errorMessage !== ''" class="_error-message">{{errorMessage}}</p>
      <div class="_container">
        <label for="name" class="_label">ステージプロット名</label><Helper :helperObject="helper.tune"></Helper>
        <input type="text" v-model="band.name" @blur="v$.band.name.$touch()" placeholder="20文字以内で入力" :class="{'_input-error': v$.band.name.$error}" class="_input-text">
        <p v-if="v$.band.name.$error" class="_input-error-message">20文字以内で入力してください。</p>
      </div>
      <div class="_container">
        <label for="tune" class="_label">メンバーリスト</label>
        <div @click="addMember()" class="_link-mini-white _margin20">
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
        <label class="_label">パート配置図</label><Helper :helperObject="helper.tune"></Helper>
        <StageLayout v-if="isBandFetched" mode="display" :band="band" class="_margin20"></StageLayout>
      </div>

      <div class="_container">
        <label for="textForLighting" class="_label">備考</label>
        <textarea v-model="band.text" @blur="v$.band.text.$touch()" placeholder="200文字以内で入力 任意" :class="{'_input-error': v$.band.text.$error}" class="_input-textarea"></textarea>
        <p v-if="v$.band.text.$error" class="_input-error-message">200文字以内で入力してください。</p>
      </div>

      
      <div v-if="this.mode === 'create'" class="_button-container">
        <button  :disabled="v$.band.$invalid || inactiveButton" @click="createBand()" :class="{'_invalid-button': v$.band.$invalid}" class="_button-s">登録</button>
      </div>
      <div v-if="this.mode === 'edit'" class="_button-container">
        <button  :disabled="v$.band.$invalid || inactiveButton" @click="editBand()" :class="{'_invalid-button': v$.band.$invalid}" class="_button-s _margin30">編集</button>
        <button  :disabled="inactiveButton" @click="deleteBand()"  class="_button-red">削除</button>
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
      isBack: "/stage_plot",
      isPcTitle: true,
      inactiveButton: false,
      mode: "create", //"create", "edit"
      errorMessage: "",

      band: new Band(),
      isBandFetched: false,

      helper:{
        tune:{
          id:"tune",
          text:"説明文をここに入力。説明文をここに入力。説明文をここに入力。\n説明文をここに入力。"
        }
      },

    }
  },
  created(){
    if(this.$route.params.id){
      db.getBand(this.$route.params.id)
      .then((doc)=>{
        this.band = doc.data()
        this.band

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
    // editMusic(){
    //   db.editMusic(this.music)
    //   .then(()=>{
    //     this.inactiveButton = false
    //     this.$router.push({name:'Music'})
    //   })
    //   .catch((error)=>{
    //     console.log(error.message)
    //     this.errorMessage = "更新に失敗しました。もう一度やり直して下さい。"
    //     this._goToTop()
    //   })
    // },
    // deleteMusic(){
    //   db.deleteMusic(this.music.id)
    //   .then(()=>{
    //     this.$router.push({name:'Music'})
    //   })
    //   .catch((error)=>{
    //     console.log(error.message)
    //     this.errorMessage = "削除に失敗しました。もう一度やり直して下さい。"
    //     this._goToTop()
    //   })
    // },
    addMember(){
      this.$router.push({name: 'SelectInstrument', params:{id: this.$route.params.id}})
    },
  },
	


  validations(){
    return{
      band:{
        name:{
          required,
          maxLength: maxLength(20)
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