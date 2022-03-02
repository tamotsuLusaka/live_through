<template>
  <div class="_base-s">
    <div v-if="this.$store.getters['auth/isSignedIn']" class="after">
      <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
      <div class="_content-s">
        <div class="list">
          <router-link :to="{name: 'CreateStagePlot'}" class="_link _margin30">
            <div class="_link-container">
              <img src="@/assets/images/icon-stage-blue-t.png" class="_link-icon" alt="セットリスト">
              <div class="_link-box">
                <p class="_link-p">ステージプロットの<br>新規作成</p>
              </div>
            </div>
          </router-link>
          <div v-if="stagePlots.length !== 0" class="_label-white">ステージプロット一覧</div>
          <div v-for="(stagePlot, index) in stagePlots" :key="index" class="_multi-box" :class="{'_multi-box-start': index === 0, '_multi-box-end': stagePlots.length -1 === index}" >
            <router-link :to="{name: 'EditBand', params:{id: stagePlot.id}}" class="_multi-inner" :class="{'_multi-inner-end': stagePlots.length -1 === index}">
              <p class="_multi-text">{{stagePlot.name}}</p>
              <img  src="@/assets/images/icon-arrow-r.png" alt="" class="_multi-icon _arrow">
            </router-link>
          </div>
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
      pageType: "stagePlot",
      pageTitle:"ステージプロット",
      isBack:"/",
      isPcTitle: false,

      stagePlots: []
    }
  },
  created(){
    db.getBands(this.$store.getters['auth/userId'])
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