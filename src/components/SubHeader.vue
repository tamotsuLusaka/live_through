<template>
  <div class="sub-header">
    <div v-if="mq.current === 'md'" class="sp-sub-header">
      <div v-if="pageType === 'home'" class="sp-sub-header-left">
        <img src="@/assets/images/logo.png" class="sp-sub-header-logo" alt="">
      </div>
      <div v-else class="sp-sub-header-left">
        <div v-if="isBack" @click="goBack()"><img src="@/assets/images/icon-arrow-l.png" alt="矢印" class="_arrow sp-sub-header-arrow"></div>
        <p class="sp-sub-header-title">{{ pageTitle }}</p>
      </div>
      <img v-if="pageType !== 'sign'" src="@/assets/images/burger.png" @click="open()" alt="burger" class="sp-sub-header-burger">
    </div>
    <div v-if="mq.current === 'lg'" class="pc-sub-header">
      <router-link :to="{name: 'Home'}" class="pc-sub-header-left">
        <img src="@/assets/images/logo.png" class="pc-sub-header-logo" alt="">
      </router-link>
      <div v-if="pageType !== 'sign'" class="pc-sub-header-right">
        <router-link :to="{name: 'SetList'}" class="pc-sub-header-link">
          <img v-if="pageType === 'setList'" src="@/assets/images/icon-mic-blue.png" alt="" class="pc-link-icon">
          <img v-else src="@/assets/images/icon-mic-gray.png" alt="" class="pc-link-icon">
        </router-link>
        <router-link :to="{name: 'StagePlot'}" class="pc-sub-header-link">
          <img v-if="pageType === 'stagePlot'" src="@/assets/images/icon-stage-blue.png" alt="" class="pc-link-icon">
          <img v-else src="@/assets/images/icon-stage-gray.png" alt="" class="pc-link-icon">
        </router-link>
        <router-link :to="{name: 'SetList'}" class="pc-sub-header-link">
          <img v-if="pageType === 'profile'" src="@/assets/images/icon-person-blue.png" alt="" class="pc-link-icon">
          <img v-else src="@/assets/images/icon-person-gray.png" alt="" class="pc-link-icon">
        </router-link>
      </div>
    </div>
    <p v-if="mq.current === 'lg' && isPcTitle" class="pc-sub-header-title">{{ pageTitle }}</p>

    <div class="menu" :class="{'appear': isShown}">
      <img src="@/assets/images/cross.png" @click="close()" class="menu-close" alt="">
      <div class="menu-container">
        <div class="menu-top">
          <img src="@/assets/images/logo.png" class="menu-logo" alt="ロゴ">
          <ul>
            <li class="menu-link"><router-link :to="{name: 'SetList'}" ><img src="@/assets/images/icon-mic-blue.png" class="menu-icon" alt=""><span>セットリスト</span></router-link></li>
            <li class="menu-link"><router-link :to="{name: 'SetList'}" ><img src="@/assets/images/icon-stage-blue.png" class="menu-icon" alt=""><span>ステージプロット</span></router-link></li>
            <li class="menu-link"><router-link :to="{name: 'SetList'}" ><img src="@/assets/images/icon-person-blue.png" class="menu-icon" alt=""><span>プロフィール</span></router-link></li>
            <li @click="signOut()" class="menu-link"><img src="@/assets/images/icon-signout-red.png" class="menu-icon" alt=""><span>ログアウト</span></li>
          </ul>
        </div>
        <div class="menu-bottom">
          <router-link :to="{name: 'SetList'}" class="menu-sub">利用規約</router-link>
          <router-link :to="{name: 'SetList'}" class="menu-sub">プライバシーポリシー</router-link>
          <div class="right">Copyright LIVE THROUGH All Rights Reserved.</div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import Mixin from '@/mixin/mixin.js'
import auth from '@/firebase/modules/auth.js'

export default {
  props:{
    pageType:{
      type: String
    },
    pageTitle:{
      type: String
    },
    isBack:{
      type: Boolean
    },
    isPcTitle:{
      type: Boolean
    }

  },
  data(){
    return{
      isShown: false
    }
  },
  mixins:[
    Mixin
  ],
  methods:{
    open(){
      this._stop(true)
      this.isShown = true
    },
    close(){
      this._stop(false)
      this.isShown = false
    },
    signOut(){
      auth.signOut()
      this.$router.push({name: 'Home'})
    },
    goBack(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .sp-sub-header{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    width: 100%;
    height: 50px;
    background-color: var(--white);
    /* background-color:aqua; */
    border-bottom:1px solid var(--gray-hi);
    box-sizing: border-box;
    align-items: center;
  }
  .sp-sub-header-arrow{
    position: absolute;
    top:15px;
    left: 10px;
  }
  .sp-sub-header-title{
    font-size: 1.5rem;
    color: var(--gray-low);
    text-align: center;
    line-height: 50px;
  }
  .sp-sub-header-logo{
    width: 160px;
    margin: 12px 0 0 16px;
  }
  .sp-sub-header-burger{
    position: absolute;
    right: 16px;
    top: 15px;
    width: 20px;
    height: 20px;
  }
  .pc-sub-header{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    width: 100%;
    height: 60px;
    background-color: var(--white);
    /* background-color:aqua; */
    border-bottom:1px solid var(--gray-hi);
    box-sizing: border-box;
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  .pc-sub-header-left{
    position: relative;
    width: 300px;
  }
  .pc-sub-header-logo{
    position: absolute;
    width: 180px;
    top: 50%;
    left: 20px;
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
  }
  .pc-sub-header-right{
    width: 110px;
    height: 100%;
    margin-right: 60px;
    display: flex;
    justify-content: space-between;
  }
  .pc-sub-header-link{
    position: relative;
  }
  .pc-link-icon{
    position: absolute;
    top:50%;
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
    width: 26px;
    height: 26px;
  }
  .pc-sub-header-title{
    font-size: 2.2rem;
    letter-spacing: 1px;
    padding: 170px 0 0;
    color: var(--gray-low);
    font-weight: 700;
    color: var(--blue);
    text-align: center;
  }
  .menu{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 50;
    background-color: var(--white);
    transition: 0.3s;
    -webkit-transform: translate(105%, 0);
    transform: translate(105%, 0);
  }
  .menu-close{
    position: absolute;
    right: 16px;
    top: 15px;
    width: 20px;
    height: 20px;
  }

  .menu-container{
    width: 80%;
    height: 100vh;
    margin: 0 auto;
    text-align: left;
    position: relative;
  }
  .menu-top{
    position: absolute;
    top: 80px;
    left: 0;
  }
  .menu-bottom{
    position: absolute;
    bottom: 80px;
    left: 0;
  }
  .menu-logo{
    width: 70%;
    margin-bottom: 40px;

  }
  .menu-link{
    margin-bottom: 20px;
  }
  .menu-icon{
    width: 20px;
    height: 20px;
        -webkit-transform: translate(0, 3px);
    transform: translate(0, 3px);
  }
  .menu-link span{
    margin-left: 10px;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--black);
  }
  .menu-sub{
    color: var(--black);
    font-size: 1.4rem;
    display: block;
    margin-top: 10px;
  }

  .right{
    margin-top: 20px;
    font-size: 1.2rem;
  }
  .appear{
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
</style>