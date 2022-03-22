<template>
  <div class="_base-s">
    <div v-if="this.$store.getters['auth/isSignedIn']" class="after">
      <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
      <div class="_content-s">
        <div class="list">
          <router-link :to="{name: 'CreateSetList'}" class="_link _marginM">
            <div class="_link-container">
              <img src="@/assets/images/icon-mic-blue-t.png" class="_link-icon" alt="セットリスト">
              <div class="_link-box">
                <p class="_link-p">セットリストの新規作成</p>
              </div>
            </div>
          </router-link>
          <div v-if="setLists.length !== 0" class="_label-white">保存済みセットリスト一覧</div><Helper v-if="setLists.length !== 0" :helperObject="helper.list"></Helper>
          <div v-for="(setList, index) in setLists" :key="index" class="_multi-box" :class="{'_multi-box-start': index === 0, '_multi-box-end': setLists.length -1 === index}" >
            <router-link :to="{name: 'ShowSetList', params:{id: setList.id}}" class="_multi-inner" :class="{'_multi-inner-end': setLists.length -1 === index}">
              <p class="_multi-text">{{setList.name}}</p>
              <img  src="@/assets/images/icon-arrow-r.png" alt="" class="_multi-icon _arrow">
            </router-link>
          </div>
        </div>
        <div class="music">
          <router-link :to="{name: 'Music'}" class="_link-mini-white">
            <img src="@/assets/images/icon-music-blue.png" class="_link-mini-icon" alt="">
            <p class="_link-mini-text">楽曲の登録・編集</p>
          </router-link>

        </div>
        <div class="info">
          <div v-if="!isShownFlow" @click="showFlow()" class="_link-mini-line-white _marginS">
            <img src="@/assets/images/icon-book-white.png" class="_link-mini-icon" alt="">
            <p class="_link-mini-text">セットリスト作成の流れ</p>
          </div>
          <div v-if="isShownFlow" @click="showFlow()" class="_flow">
            <div class="_flow-container">
              <p class="_flow-main-title">セットリスト作成の流れ</p>
              <p class="_flow-main-text">毎ライブの際に登録された楽曲を並び変えるだけでセットリストが簡単に作成出来ます。各楽曲の要望等や曲情報を毎回記入する面倒な手間が省けます。</p>
              <div class="_flow-box">
                <p class="_flow-title">楽曲の登録</p>
                <p class="_flow-text">各曲情報を選択・入力。</p>
              </div>
              <img src="@/assets/images/triangle.png" alt="" class="_flow-arrow">
              <div class="_flow-box">
                <p class="_flow-title">セットリストの作成・編集</p>
                <p class="_flow-text">登録した楽曲を SE や MC も含め、ライブ当日の順番に並べる。</p>
              </div>
              <img src="@/assets/images/triangle.png" alt="" class="_flow-arrow">
              <div class="_flow-box _marginL">
                <p class="_flow-title">PDF(もしくは JPEG)書き出し</p>
                <p class="_flow-text">作成した曲順等を確認して問題なければ書き出しで完成。ご使用端末に保存。</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Mixin from '@/mixin/mixin.js'

import SubHeader from '@/components/SubHeader.vue'
import Footer from '@/components/Footer.vue'
import Helper from '@/components/Helper.vue'

import db from '@/firebase/modules/db.js'

export default {
  name: 'SetList',
  components: {
    SubHeader,
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

      setLists: [],
      isShownFlow: false,

      helper:{
        list:{
          title:"保存済みセットリスト一覧",
          text:"【セットリストの新規作成】で作成されたセットリストが表示されます。\n作成済みセットリストの内容変更、PDF書き出しをする際は保存されたセットリストを選択して下さい。"
        },
      }
    }
  },
  created(){
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
    showFlow(){
      this.isShownFlow = !this.isShownFlow
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


</style>