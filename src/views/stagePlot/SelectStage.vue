<template>
  <div class="_base-s">
    <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content-s">
        <router-link :to="{name: 'CreateBand'}" class="_link _margin40">
          <div class="_link-container">
            <img src="@/assets/images/icon-set-blue.png" class="_link-icon" alt="セットリスト">
            <div class="_link-box">
              <p class="_link-title">バンドステージ</p>
              <p class="_link-text">セットリストの説明。セットリストの説明。セットリストの説明。</p>
            </div>
          </div>
        </router-link>
        <router-link :to="{name: 'StagePlot'}" class="_link">
          <div class="_link-container">
            <img src="@/assets/images/icon-people-blue.png" class="_link-icon" alt="セットリスト">
            <div class="_link-box">
              <p class="_link-title">アイドルステージ</p>
              <p class="_link-text">セットリストの説明。セットリストの説明。セットリストの説明。</p>
            </div>
          </div>
        </router-link>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Mixin from '@/mixin/mixin.js'

import SubHeader from '@/components/SubHeader.vue'
import Footer from '@/components/Footer.vue'


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
      pageTitle:"ステージの選択",
      isBack:"/stage_plot",
      isPcTitle: false,

      setLists: []
    }
  },
  created(){

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



</style>