<template>
  <div class="_base-s">
    <div v-if="this.$store.getters['auth/isSignedIn']" class="after">
      <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
      <div class="_content-s">
        <div class="list">
          <router-link :to="{name: 'CreateSetList'}" class="_link _margin30">
            <div class="_link-container">
              <img src="@/assets/images/icon-mic-blue-t.png" class="_link-icon" alt="セットリスト">
              <div class="_link-box">
                <p class="_link-p">セットリストの新規作成</p>
              </div>
            </div>
          </router-link>
          <div v-if="setLists.length !== 0" class="_label-white">セットリスト一覧</div>
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
          <div class="_link-mini-line-white">
            <img src="@/assets/images/icon-video-white.png" class="_link-mini-icon" alt="">
            <p class="_link-mini-text">LIVE Through の使い方</p>
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

import db from '@/firebase/modules/db.js'

export default {
  name: 'SetList',
  components: {
    SubHeader,
    Footer
  },
  mixins:[
    Mixin
  ],
  data(){
    return{
      pageType: "setList",
      pageTitle:"セットリスト",
      isBack:"/",
      isPcTitle: false,

      setLists: []
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