<template>
  <div class="_base-s">
    <div v-if="this.$store.getters['auth/isSignedIn']" class="after">
      <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
      <div class="_content-s">
        <router-link :to="{name: 'CreateMusic'}" class="_link _marginM">
          <div class="_link-container">
            <img src="@/assets/images/icon-music-blue.png" class="_link-icon" alt="セットリスト">
            <div class="_link-box">
              <p class="_link-p">楽曲の新規登録</p>
            </div>
          </div>
        </router-link>
        <div class="_label-white">楽曲一覧</div><Helper :helperObject="helper.list"></Helper>
        <p v-if="musics.length === 0" class="_not-yet">保存済みの楽曲はありません</p>
        <div v-for="(music, index) in musics" :key="index" class="_multi-box" :class="{'_multi-box-start': index === 0, '_multi-box-end': musics.length -1 === index}" >
          <router-link :to="{name: 'EditMusic', params:{id: music.id}}" class="_multi-inner" :class="{'_multi-inner-end': musics.length -1 === index}">
            <p class="_multi-text">{{music.name}}</p>
            <img  src="@/assets/images/icon-arrow-r.png" alt="" class="_multi-icon _arrow">
          </router-link>
        </div>
        <router-link :to="{name:'SetList'}" class="return">
          <img  src="@/assets/images/icon-arrow-l-white.png" alt="" class="return-arrow">
          <p class="return-text">セットリスト一覧</p>
        </router-link>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import SubHeader from '@/components/SubHeader.vue'
import Footer from '@/components/Footer.vue'
import Mixin from '@/mixin/mixin.js'
import Helper from '@/components/Helper.vue'

import db from '@/firebase/modules/db.js'


export default {
  name: 'Music',
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
      pageTitle:"楽曲の登録・編集",
      isBack: true,
      isPcTitle: false,
      musics: [],

      helper:{
        list:{
          title:"楽曲一覧",
          text:"【楽曲の新規登録】で登録された曲が表示されます。\n登録済み楽曲の内容を変更する場合は曲名を選択して下さい。"
        },
      }
    }
  },
  created(){
    this._authCheck()
    db.getMusics(this.$store.getters['auth/userId'])
    .then((querySnapShot)=>{
      querySnapShot.forEach(doc => {
        this.musics.push(doc.data())
      })
    })
    .catch((error)=>{
      console.log(error.message)
    })
  },
  mounted(){
    
  },
  methods:{

  },
  computed:{
  },


}
</script>

<style scoped>
/* ログイン */
.return{
  display: flex;
  margin-top: 30px;
}
.return-arrow{
  width: 16px;
  height: 16px;
}
.return-text{
  color: var(--white);
  line-height: 1.6rem;
  font-size: 1.4rem;
}
</style>