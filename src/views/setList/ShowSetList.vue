<template>
  <div class="_base-s">
    <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_show">
      <div class="_show-content">
        <div class="_show-top">
          <p v-if="errorMessage !== ''" class="_error-message">{{errorMessage}}</p>
          <div class="_show-logo">
            <img src="@/assets/images/icon-mic-white.png" alt="" class="_show-icon">
            <p class="_show-title">{{setList.name}}</p>
          </div>
          <p class="_show-description">CDを使用する場合はCDのトラック番号を指定、その他PC等の音源を使用する場合はチャンネル数・端子を指定して下さい。</p>
        </div>
        <ShowSe v-if="setList.isSe" :type="'SE'" :seObject="setList.se"></ShowSe>
        <ShowLists :type="'main'" :lists="this.lists"></ShowLists>
        <ShowSe v-if="setList.isEndSe" :type="'END SE'" :seObject="setList.endSe"></ShowSe>
        <ShowSe v-if="setList.isSeOfEncore" :type="'アンコール SE'" :seObject="setList.seOfEncore"></ShowSe>
        <ShowLists :type="'encore'" :lists="this.listsOfEncore"></ShowLists>
        <ShowSe v-if="setList.isEndSeOfEncore" :type="'アンコール END SE'" :seObject="setList.endSeOfEncore"></ShowSe>
        <div v-if="isNecessarySource" class="_container">
          <div class="_label-white">音源設定</div>
          <div class="_multi-box _multi-box-start">
            <router-link :to="{name: 'Complement', params:{id: $route.params.id}}" class="_multi-inner">
              <img  src="@/assets/images/icon-arrow-r.png" alt="" class="_multi-icon _arrow">
              <p v-if="setList.output.channel === null" class="_multi-text _red">チャンネル数未入力</p>
              <p v-else class="_multi-text">チャンネル数：{{setList.output.channel}}</p>
            </router-link>
          </div>
          <div class="_multi-box _multi-box-end">
            <router-link :to="{name: 'Complement', params:{id: $route.params.id}}" class="_multi-inner _multi-inner-end">
              <img  src="@/assets/images/icon-arrow-r.png" alt="" class="_multi-icon _arrow">
              <p v-if="setList.output.terminal === null" class="_multi-text _red">端子種類未入力</p>
              <p v-else class="_multi-text">端子種類：{{setList.output.terminal}}</p>
            </router-link>
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
    <div class="_show-footer">
      <div class="_show-footer-container">
        <div @click="goExport()" class="_show-footer-export">
          <img src="@/assets/images/icon-pdf-white.png" class="_link-mini-icon" alt="">
          <p class="_link-mini-text">PDFで書き出し</p>
        </div>
        <div @click="goEdit()" class="_show-footer-edit">
          <p class="_link-mini-text">編集</p>
        </div>
      </div>
    </div>
    <Alert :isShown="isAlertShownForTruckNumber" :message="alertMessageForTruckNumber" @closeAlert="closeAlert()"></Alert>
    <Alert :isShown="isAlertShownForSource" :message="alertMessageForSource" @closeAlert="closeAlert()"></Alert>
  </div>
</template>

<script>
import Mixin from '@/mixin/mixin.js'
import SubHeader from '@/components/SubHeader.vue'
import ShowSe from '@/components/ShowSe.vue'
import ShowLists from '@/components/ShowLists.vue'
import Alert from '@/components/Alert.vue'

import SetList from '@/class/SetList.js'

import db from '@/firebase/modules/db.js'

export default {
  name: 'SetList',
  components: {
    SubHeader,
    ShowSe,
    ShowLists,
    Alert,
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
      errorMessage: "",

      setList: new SetList(),
      lists: [],
      listsOfEncore: [],
      originMusics:[],
      incompletionTruckNumber: false,
      incompletionSource: false,
      isNecessarySource: false,

      helper:{
        note:{
          title:"セットリスト内容",
          text:"作成したセットリストの曲順と各曲の詳細が表示されます。"
        },
      },

      // アラートモーダル用 トラックナンバー
      isAlertShownForTruckNumber: false,
      alertMessageForTruckNumber: "音源のトラックナンバーが未入力です。【音源トラックナンバーの入力】から設定して下さい。",

      // アラートモーダル用 音源
      isAlertShownForSource: false,
      alertMessageForSource: "音源設定が未設定です。【音源設定の入力】から設定して下さい。",

    }
  },
  async created(){
    this._authCheck()
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
      this._userCheck(this.setList.userId)
    })
    .catch((error)=>{
      console.log(error.message)
    })

    this.margeMusicData(this.setList.lists, this.lists)
    this.margeMusicData(this.setList.listsOfEncore, this.listsOfEncore)
    this.incompletionCheckForSe(this.setList.se)
    this.incompletionCheckForSe(this.setList.endSe)
    this.incompletionCheckForSe(this.setList.seOfEncore)
    this.incompletionCheckForSe(this.setList.endSeOfEncore)
    this.incompletionCheckForLists(this.lists)
    this.incompletionCheckForLists(this.listsOfEncore)
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
          this.incompletionTruckNumber = true
        }
      }else if(seObject.typeOfSource === "PC" || seObject.typeOfSource === "その他" ){
        this.isNecessarySource = true
        if(this.setList.output.channel === null || this.setList.output.terminal === null){
          this.incompletionSource = true
        }
      }
    },
    incompletionCheckForLists(lists){
      for(const music of lists){
        if(music.type === "music"){
          if(music.data.isSource){
            if(music.data.source.typeOfSource === "CD"){
              if(music.truckNumber === null){
                this.incompletionTruckNumber = true
              }
            }else if(music.data.source.typeOfSource === "PC" || music.data.source.typeOfSource === "その他"){
              this.isNecessarySource = true
              if(this.setList.output.channel === null || this.setList.output.terminal === null){
                this.incompletionSource = true
              }
            }
          }
        }
      }
    },
    goExport(){

      if(this.incompletionTruckNumber){
        this._stop(true)
        this.isAlertShownForTruckNumber = true
      }else if(this.incompletionSource){
        this._stop(true)
        this.isAlertShownForSource = true  
      }else{
        this.$store.commit('data/setExportSetList', null)
        this.setList.lists = this.lists
        this.setList.listsOfEncore = this.listsOfEncore
        this.setList.isNecessarySource = this.isNecessarySource
        this.$store.commit('data/setExportSetList', this.setList)
        this.$router.push({name: 'ExportSetList', params:{id: this.setList.id}})
      }
    },
    closeAlert(){
      this._stop(false)
      this.isAlertShownForTruckNumber = false
      this.isAlertShownForSource = false
    },
  },
  computed:{
  },


}
</script>

<style scoped>


@media screen and (min-width:600px){

}


</style>