<template>
  <div class="_base-s">
    <div v-if="this.$store.getters['auth/isSignedIn']" class="after">
      <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
      <div class="_content-s">
        <div class="list">
          <div @click="newCreate()" class="_link _marginM">
            <div class="_link-container">
              <img src="@/assets/images/icon-stage-blue-t.png" class="_link-icon" alt="セットリスト">
              <div class="_link-box">
                <p  v-if="mq.current === 'md'" class="_link-p">ステージプロットの<br>新規作成</p>
                <p  v-if="mq.current === 'lg'" class="_link-p">ステージプロットの新規作成</p>
              </div>
            </div>
          </div>
          <div class="_label-white">保存済みステージプロット一覧</div><Helper :helperObject="helper.list"></Helper>
          <p v-if="stagePlots.length === 0" class="_not-yet">保存済みのステージプロットはありません</p>
          <div v-for="(stagePlot, index) in stagePlots" :key="index" class="_multi-box" :class="{'_multi-box-start': index === 0, '_multi-box-end': stagePlots.length -1 === index}" >
            <div v-if="stagePlot.type ==='band'">
              <router-link :to="{name: 'ShowBand', params:{id: stagePlot.id}}" class="_multi-inner" :class="{'_multi-inner-end': stagePlots.length -1 === index}">
                <p class="_multi-text">{{stagePlot.name}}</p>
                <img  src="@/assets/images/icon-arrow-r.png" alt="" class="_multi-icon _arrow">
              </router-link>
            </div>
            <div v-else-if="stagePlot.type ==='idol'">
              <router-link :to="{name: 'ShowIdol', params:{id: stagePlot.id}}" class="_multi-inner" :class="{'_multi-inner-end': stagePlots.length -1 === index}">
                <p class="_multi-text">{{stagePlot.name}}</p>
                <img  src="@/assets/images/icon-arrow-r.png" alt="" class="_multi-icon _arrow">
              </router-link>
            </div>
          </div>
        </div>

        <div class="info">
          <router-link :to="{name: 'ManualForSetList'}" class="_link-mini-line-white _marginS">
            <img src="@/assets/images/icon-book-white.png" class="_link-mini-icon" alt="">
            <p class="_link-mini-text">ステージプロット作成の流れ</p>
          </router-link>
        </div>
        <Ad></Ad>
      </div>
      <Footer></Footer>
      <Alert :isShown="isAlertShown" :message="alertMessage" @closeAlert="closeAlert()"></Alert>
    </div>
  </div>
</template>

<script>
import Mixin from '@/mixin/mixin.js'

import SubHeader from '@/components/SubHeader.vue'
import Footer from '@/components/Footer.vue'
import Helper from '@/components/Helper.vue'
import Alert from '@/components/Alert.vue'
import Ad from '@/components/Ad.vue'

import db from '@/firebase/modules/db.js'

export default {
  name: 'SetList',
  components: {
    SubHeader,
    Footer,
    Helper,
    Alert,
    Ad,
  },
  mixins:[
    Mixin
  ],
  data(){
    return{
      pageType: "stagePlot",
      pageTitle:"ステージプロット",
      isBack: true,
      isPcTitle: false,
      isAlertShown: false,
      alertMessage: "ステージプロットの上限に達しています。不要なステージプロットを削除してください。",

      stagePlots: [],
      maxStagePlot: 5,

      helper:{
        list:{
          title:"保存済みステージプロット一覧",
          text:"【ステージプロットの新規作成】で作成されたステージプロットが表示されます。\n作成済みステージプロットの内容変更、PDF書き出しをする際は保存されたステージプロットを選択して下さい。"
        }
      },
    }
  },
  created(){
    this._authCheck()
    db.getBands(this.$store.getters['auth/userId'])
    .then((querySnapShot)=>{
      querySnapShot.forEach(doc => {
        this.stagePlots.push(doc.data())
      })
    })
    .catch((error)=>{
      console.log(error.message)
    })
    db.getIdols(this.$store.getters['auth/userId'])
    .then((querySnapShot)=>{
      querySnapShot.forEach(doc => {
        this.stagePlots.push(doc.data())
      })
    })
    .catch((error)=>{
      console.log(error.message)
    })
  },
  mounted(){
    
  },
  methods:{
    newCreate(){
      if(this.stagePlots.length < this.maxStagePlot){
        this.$router.push({name: 'CreateStagePlot'})
      }else{
        this._stop(true)
        this.isAlertShown = true
      }
    },
    closeAlert(){
      this._stop(false)
      this.isAlertShown = false
    }
  },
  computed:{
  },


}
</script>

<style scoped>
/* ログイン */
.name{
  color: var(--white);
  margin-bottom: 30px;
}
.list{
  margin-bottom: 80px;
}
.music{
  margin-bottom: 60px;
}


</style>