<template>
  <div class="_base-s">
    <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="show-top">
      <div class="show-top-content">
        <p v-if="errorMessage !== ''" class="_error-message">{{errorMessage}}</p>
        <div class="show-logo">
          <img src="@/assets/images/icon-mic-blue.png" alt="" class="show-icon">
          <p>{{setList.name}}</p>
        </div>
        <div @click="goEdit()" class="_link-mini-line-blue _marginS">
          <p class="_link-mini-text">セットリストの編集</p>
        </div>
        <div @click="goExport()" class="_link-mini-blue _marginS">
          <img src="@/assets/images/icon-pdf-white.png" class="_link-mini-icon " alt="">
          <p class="_link-mini-text">PDFで書き出し</p>
        </div>
        <p class="_description">下記【セットリスト内容】を確認して訂正がある場合は【セットリストを編集】問題なければ【PDFで書き出し】。<br>CDを使用する場合はCDのトラック番号を指定、その他PC等の音源を使用する場合はチャンネル数・端子を指定して下さい。</p>
      </div>
    </div>
    <div class="show-bottom">
      <div class="show-bottom-content">
        <p class="show-title">セットリスト内容<Helper :helperObject="helper.note"></Helper></p>
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
              <p v-if="setList.output.channel === null" class="_multi-text red">チャンネル数未入力</p>
              <p v-else class="_multi-text">チャンネル数：{{setList.output.channel}}</p>
            </router-link>
          </div>
          <div class="_multi-box _multi-box-end">
            <router-link :to="{name: 'Complement', params:{id: $route.params.id}}" class="_multi-inner _multi-inner-end">
              <img  src="@/assets/images/icon-arrow-r.png" alt="" class="_multi-icon _arrow">
              <p v-if="setList.output.terminal === null" class="_multi-text red">端子種類未入力</p>
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
    <div class="re-button">
      <div class="re-button-content">
        <div @click="goEdit()" class="_link-mini-line-blue _marginS">
          <p class="_link-mini-text">セットリストの編集</p>
        </div>
        <div @click="goExport()" class="_link-mini-blue _marginS">
          <img src="@/assets/images/icon-pdf-white.png" class="_link-mini-icon " alt="">
          <p class="_link-mini-text">PDFで書き出し</p>
        </div>
      </div>

    </div>
    <Footer></Footer>
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
import Footer from '@/components/Footer.vue'
import Helper from '@/components/Helper.vue'

import SetList from '@/class/SetList.js'

import db from '@/firebase/modules/db.js'

export default {
  name: 'SetList',
  components: {
    SubHeader,
    ShowSe,
    ShowLists,
    Alert,
    Footer,
    Helper,
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
.show-title{
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 30px;
}
.re-button{
  width: 100%;
  background-color: var(--white);
}
.re-button-content{
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
  }
  .re-button-content{
    max-width: 600px;
    height:auto;
  }
}


</style>