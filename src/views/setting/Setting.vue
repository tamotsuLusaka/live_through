<template>
  <div class="_base-s">
    <div v-if="this.$store.getters['auth/isSignedIn']" class="after">
      <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
      <div class="_content-s">
        <div class="name">
          <p class="name-text">アーティスト名</p>
          <p class="name-title">{{user.name}}</p>
        </div>
        <router-link :to="{name: 'EditUser'}" class="_link-mini-white _marginS">
          <img src="@/assets/images/icon-person-blue.png" class="_link-mini-icon" alt="">
          <p class="_link-mini-text">プロフィールの変更</p>
        </router-link>
        <div @click="signOut()" class="_link-mini-white _marginL">
          <img src="@/assets/images/icon-signout-red.png" class="_link-mini-icon" alt="">
          <p class="_link-mini-text red">ログアウト</p>
        </div>
        <div class="info">
          <router-link :to="{name: 'ManualForSetList'}" class="_link-mini-line-white _marginS">
            <img src="@/assets/images/icon-book-white.png" class="_link-mini-icon" alt="">
            <p class="_link-mini-text">セットリスト作成の流れ</p>
          </router-link>
        </div>
        <div class="_info">
          <router-link :to="{name: 'ManualForStagePlot'}" class="_link-mini-line-white _marginS">
            <img src="@/assets/images/icon-book-white.png" class="_link-mini-icon" alt="">
            <p class="_link-mini-text">ステージプロット作成の流れ</p>
          </router-link>
        </div>
        <Ad></Ad>
      </div>
      
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Mixin from '@/mixin/mixin.js'

import SubHeader from '@/components/SubHeader.vue'
import Footer from '@/components/Footer.vue'
import Ad from '@/components/Ad.vue'
import User from '@/class/User.js'

import db from '@/firebase/modules/db.js'
import auth from '@/firebase/modules/auth.js'

export default {
  name: 'Setting',
  components: {
    SubHeader,
    Footer,
    Ad
  },
  mixins:[
    Mixin
  ],
  data(){
    return{
      pageType: "setting",
      pageTitle:"設定",
      isBack: true,
      isPcTitle: false,

      user: new User(),
      isShownSetListFlow: false,
      isShownStagePlotFlow: false,

    }
  },
  created(){
    db.getUser(this.$store.getters['auth/userId'])
    .then((doc)=>{
      this.user = doc.data()
    })
    .catch((error)=>{
      console.log(error.message)
    })
  },
  mounted(){
    
  },
  methods:{
    ShowSetListFlow(){
      this.isShownSetListFlow = !this.isShownSetListFlow
    },
    ShowStagePlotFlow(){
      this.isShownStagePlotFlow = !this.isShownStagePlotFlow
    },
    signOut(){
      this._stop(false)
      auth.signOut()
      this.$router.push({name: 'Home'})
    },
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
  text-align: center;
}
.name-title{
  font-size: 2rem;
  font-weight: 700;
}
.name-text{
  font-size: 1.4rem;
  margin-bottom: 3px;
}
.list{
  margin-bottom: 30px;
}
.music{
  margin-bottom: 60px;
}
.red{
  color: var(--red);
}


@media screen and (min-width:600px){
  .name{
    margin-bottom: 50px;
  }
}

</style>