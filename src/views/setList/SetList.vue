<template>
  <div class="_base-s">
    <div v-if="this.$store.getters['auth/isSignedIn']" class="after">
      <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
      <div class="_content-s">
        <div class="list">
          <div @click="newCreate()" class="_link _marginM">
            <div class="_link-container">
              <img src="@/assets/images/icon-mic-blue-t.png" class="_link-icon" alt="セットリスト">
              <div class="_link-box">
                <p class="_link-p">セットリストの新規作成</p>
              </div>
            </div>
          </div>
          <div class="_label-white">保存済みセットリスト一覧</div><Helper v-if="setLists.length !== 0" :helperObject="helper.list"></Helper>
          <p v-if="setLists.length === 0" class="_not-yet">保存済みのセットリストはありません</p>
          <div v-for="(setList, index) in setLists" :key="index" class="_multi-box" :class="{'_multi-box-start': index === 0, '_multi-box-end': setLists.length -1 === index}" >
            <router-link :to="{name: 'ShowSetList', params:{id: setList.id}}" class="_multi-inner" :class="{'_multi-inner-end': setLists.length -1 === index}">
              <p class="_multi-text">{{setList.name}}</p>
              <img  src="@/assets/images/icon-arrow-r.png" alt="" class="_multi-icon _arrow">
            </router-link>
          </div>
        </div>
        <div class="music">
          <router-link :to="{name: 'Music'}" class="_link-mini-yellow">
            <img src="@/assets/images/icon-music-black.png" class="_link-mini-icon" alt="">
            <p class="_link-mini-text">楽曲の登録・編集</p>
          </router-link>

        </div>
        <div class="info">
          <router-link :to="{name: 'ManualForSetList'}" class="_link-mini-line-white _marginS">
            <img src="@/assets/images/icon-book-white.png" class="_link-mini-icon" alt="">
            <p class="_link-mini-text">セットリスト作成の流れ</p>
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
      pageType: "setList",
      pageTitle:"セットリスト",
      isBack: true,
      isPcTitle: false,
      isAlertShown: false,
      alertMessage: "セットリストの上限に達しています。不要なセットリストを削除してください。",

      setLists: [],
      maxSetList: 5,

      helper:{
        list:{
          title:"保存済みセットリスト一覧",
          text:"【セットリストの新規作成】で作成されたセットリストが表示されます。\n作成済みセットリストの内容変更、PDF書き出しをする際は保存されたセットリストを選択して下さい。"
        },
      }
    }
  },
  created(){
    this._authCheck()
    db.getSetLists(this.$store.getters['auth/userId'])
    .then((querySnapShot)=>{
      querySnapShot.forEach(doc => {
        this.setLists.push(doc.data())
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
      if(this.setLists.length < this.maxSetList){
        this.$router.push({name: 'CreateSetList'})
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
  margin-bottom: 30px;
}
.music{
  margin-bottom: 60px;
}
.yellow{
  background-color: var(--yellow-hi);
}


</style>