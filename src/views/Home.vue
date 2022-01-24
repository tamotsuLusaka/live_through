<template>
  <div class="_base-s">
    <div v-if="this.$store.getters['auth/isSignedIn']" class="after">
      <SubHeader :pageType="pageType" :pageTitle="pageTitle" :backPath="backPath" :isPcTitle="isPcTitle"></SubHeader>
      <div class="_content-s">
        <p class="name">{{this.$store.getters['auth/userName']}}</p>

        <div class="main">
          <router-link :to="{name: 'SetList'}" class="_link _margin40">
            <div class="_link-container">
              <img src="@/assets/images/icon-mic-blue-t.png" class="_link-icon" alt="セットリスト">
              <div class="_link-box">
                <p class="_link-title">セットリスト</p>
                <p class="_link-text">セットリストの説明。セットリストの説明。セットリストの説明。</p>
              </div>
            </div>
          </router-link>
          <div class="_link">
            <div class="_link-container">
              <img src="@/assets/images/icon-stage-blue-t.png" class="_link-icon" alt="セットリスト">
              <div class="_link-box">
                <p class="_link-title">セットリスト</p>
                <p class="_link-text">セットリストの説明。セットリストの説明。セットリストの説明。</p>
              </div>
            </div>
          </div>
        </div>

        <div class="sub">
          <div class="_link-mini-line-white">
            <img src="@/assets/images/icon-video-white.png" class="_link-mini-icon " alt="">
            <p class="_link-mini-text">LIVE Through の使い方</p>
          </div>
        </div>

      </div>
    </div>
    <div v-else class="before" >
      <div class="top" :style="{ 'background-image': 'url(' + topBackgroundImage +')'}">
        <img src="@/assets/images/logo-c.png" alt="ロゴ" class="logo">
        <div class="sign">
          <router-link :to="{name: 'SignUp'}" class="_button-s _margin30">アカウント作成</router-link>
          <router-link :to="{name: 'SignIn'}" class="_button-a">ログイン</router-link>
        </div>
      </div>
      <div class="about">

      </div>
      <div class="use">

      </div>
    </div>
    <Footer></Footer>


  </div>
</template>

<script>
import Mixin from '@/mixin/mixin.js'

import SubHeader from '@/components/SubHeader.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    SubHeader,
    Footer
  },
  mixins:[
    Mixin
  ],
  data(){
    return{
      pageType: "home",
      pageTitle:"home",
      backPath:"",
      isPcTitle: false,
      topBackgroundImage: require("@/assets/images/top-image-sp.jpg"),
    }
  },
  methods:{

  },
  computed:{
  },

  mounted(){
    
  },

  created(){
 
  },
}
</script>

<style scoped>
/* ログイン */
.name{
  color: var(--white);
  margin-bottom: 30px;
}
.main{
  margin-bottom: 80px;
}

/* 未ログイン */
.top{
  width: 100%;
  height: 100vh;
  background-position: center;
  background-size: cover;
  position: relative;
}
.logo{
  width: 70%;
  position: absolute;
  left: 50%;
  top:40%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.sign{
  width: 100%;
  position: absolute;
  bottom: 50px;
}
</style>