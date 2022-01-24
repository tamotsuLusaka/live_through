<template>
  <div class="_base-s">
    <SubHeader :pageType="pageType" :pageTitle="pageTitle" :backPath="backPath" :isPcTitle="isPcTitle"></SubHeader>
    <div class="show-top">
      <div class="show-top-content">
        <p v-if="errorMessage !== ''" class="_error-message">{{errorMessage}}</p>
        <div class="show-logo">
          <img src="@/assets/images/icon-mic-blue.png" alt="" class="show-icon">
          <p>{{setList.name}}</p>
        </div>
        <router-link :to="{name: 'Complement', params:{id: $route.params.id}}" class="_link-mini-line-blue _margin20">
          <p class="_link-mini-text">音源詳細を入力</p>
        </router-link>
        <div @click="goEdit()" class="_link-mini-line-blue _margin20">
          <p class="_link-mini-text">セットリスの編集</p>
        </div>
        <div @click="goExport()" class="_link-mini-blue _margin20">
          <img src="@/assets/images/icon-pdf-white.png" class="_link-mini-icon " alt="">
          <p class="_link-mini-text">PDFで書き出し</p>
        </div>
      </div>
    </div>
    <div class="show-bottom">
      <div class="show-bottom-content">
        <ShowSe v-if="setList.isSe" :type="'SE'" :seObject="setList.se"></ShowSe>
        <ShowLists :type="'main'" :lists="this.lists"></ShowLists>
        <ShowSe v-if="setList.isEndSe" :type="'END SE'" :seObject="setList.endSe"></ShowSe>
        <ShowSe v-if="setList.isSeOfEncore" :type="'アンコール SE'" :seObject="setList.seOfEncore"></ShowSe>
        <ShowLists :type="'encore'" :lists="this.listsOfEncore"></ShowLists>
        <ShowSe v-if="setList.isEndSeOfEncore" :type="'アンコール END SE'" :seObject="setList.endSeOfEncore"></ShowSe>
        <div class="_container">
          <div class="_label-white">音源設定</div>
          <div class="_multi-box _multi-box-start">
            <router-link :to="{name: 'Complement', params:{id: $route.params.id}}" v-if="setList.output.channel === null" class="_multi-inner">
              <img  src="@/assets/images/icon-arrow-r.png" alt="" class="_multi-icon _arrow">
              <p class="_multi-text red">チャンネル数未入力</p>
            </router-link>
            <div v-else class="_multi-inner" >
              <p class="_multi-text">チャンネル数：{{setList.output.channel}}</p>
            </div>
          </div>
          <div class="_multi-box _multi-box-end">
            <router-link :to="{name: 'Complement', params:{id: $route.params.id}}" v-if="setList.output.terminal === null" class="_multi-inner _multi-inner-end">
              <img  src="@/assets/images/icon-arrow-r.png" alt="" class="_multi-icon _arrow">
              <p class="_multi-text red">端子種類未入力</p>
            </router-link>
            <div v-else class="_multi-inner" >
              <p class="_multi-text">端子種類：{{setList.output.terminal}}</p>
            </div>
          </div>
        </div>
        <div v-if="setList.text !== null" class="_container">
          <div class="_label-white">その他、要望</div>
          <div class="_box">
            <div class="_inner">
              <div class="_textarea">{{setList.text}}</div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    <Footer></Footer>
    <Alert :isShown="isAlertShown" :message="alertMessage" @closeAlert="closeAlert()"></Alert>
  </div>
</template>

<script>
import Mixin from '@/mixin/mixin.js'
import SubHeader from '@/components/SubHeader.vue'
import ShowSe from '@/components/ShowSe.vue'
import ShowLists from '@/components/ShowLists.vue'
import Alert from '@/components/Alert.vue'
import Footer from '@/components/Footer.vue'

import SetList from '@/class/SetList.js'

import db from '@/firebase/modules/db.js'

export default {
  name: 'SetList',
  components: {
    SubHeader,
    ShowSe,
    ShowLists,
    Alert,
    Footer
  },
  mixins:[
    Mixin
  ],
  data(){
    return{
      pageType: "setList",
      pageTitle:"セットリスト",
      backPath:"/set_list",
      isPcTitle: false,
      errorMessage: "",

      setList: new SetList(),
      lists: [],
      listsOfEncore: [],
      originMusics:[],
      incompletion: false,

      // アラートモーダル用
      isAlertShown: false,
      alertMessage: "音源のトラックナンバーまたは設定が未設定です。【音源詳細を入力】から設定して下さい。",

    }
  },
  async created(){
    await db.getMusics(this.$store.getters['auth/userId'])
    .then((querySnapShot)=>{
      querySnapShot.forEach(doc => {
        this.originMusics.push(doc.data())
      })
    })
    .catch((error)=>{
      this.errorMessage = "データの取得に失敗しました。"
      console.log(error.message)
    })
    this.$store.commit('data/setMyMusicLists', this.originMusics)

    await db.getSetList(this.$route.params.id)
    .then((doc)=>{
      this.setList = doc.data()
    })
    .catch((error)=>{
      console.log(error.message)
    })

    this.margeMusicData(this.setList.lists, this.lists)
    this.margeMusicData(this.setList.listsOfEncore, this.listsOfEncore)
  },
  mounted(){
    
  },
  methods:{
    margeMusicData(setListLists, displayLists){
      for (const targetMusic of setListLists){
        if(targetMusic.type === 'music'){
          const musicData = this.$store.getters['data/myMusicLists'].find((music)=> music.id === targetMusic.id)
          targetMusic.data = musicData
          displayLists.push(targetMusic)
        }else if(targetMusic.type === 'mc'){
          displayLists.push(targetMusic)
        }
      }
    },
    // なぜかrouter-linkを使うとエラーになったからこれを使った。
    goEdit(){
      this.$router.push({name: 'EditSetList', params:{id: this.setList.id}})
    },
    incompletionCheckForSe(seObject){
      if(seObject.typeOfSource === "CD"){
        if(seObject.truckNumber === null){
          this.incompletion = true
        }
      }
    },
    incompletionCheckForLists(lists){
      for(const music of lists){
        if(music.type === "music"){
          if(music.data.isSource){
            if(music.data.source.typeOfSource === "CD"){
              if(music.truckNumber === null){
                this.incompletion = true
              }
            }
          }
        }
      }
    },
    goExport(){
      this.incompletionCheckForSe(this.setList.se)
      this.incompletionCheckForSe(this.setList.endSe)
      this.incompletionCheckForSe(this.setList.seOfEncore)
      this.incompletionCheckForSe(this.setList.endSeOfEncore)
      this.incompletionCheckForLists(this.lists)
      this.incompletionCheckForLists(this.listsOfEncore)
      if(this.setList.output.channel === null || this.setList.output.terminal === null){
        this.incompletion = true
      }
      if(this.incompletion){
        this._stop(true)
        this.isAlertShown = true
      }else{
        this.$store.commit('data/setExportSetList', null)
        this.setList.lists = this.lists
        this.setList.listsOfEncore = this.listsOfEncore
        this.$store.commit('data/setExportSetList', this.setList)
        this.$router.push({name: 'ExportSetList', params:{id: this.setList.id}})
      }
    },
    closeAlert(){
      this._stop(false)
      this.isAlertShown = false
    },
  },
  computed:{
  },


}
</script>

<style scoped>
.red{
  color: var(--red);
}
.show-top{
  width: 100%;
  background-color: var(--white);
}
.show-top-content{
  width: 90%;
  padding:110px 0 60px;
  margin: 0 auto;
}
.show-logo{
  text-align: center;
  margin-bottom: 40px;
}
.show-icon{
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}
.show-name{
  font-size: 1.6rem;
}
.show-bottom-content{
  width: 90%;
  padding:60px 0 60px;
  margin: 0 auto;
}

@media screen and (min-width:600px){
  .show-top-content{
    max-width: 600px;
    height:auto;
  }
  .show-bottom-content{
    max-width: 600px;
    height:auto;
    min-height: calc(100vh - 778px);
  }
}


</style>