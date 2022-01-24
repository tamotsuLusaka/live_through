<template>
  <div class="_base-s">
    <div v-if="this.$store.getters['auth/isSignedIn']" class="after">
      <SubHeader :pageType="pageType" :pageTitle="pageTitle" :backPath="backPath" :isPcTitle="isPcTitle"></SubHeader>
      <div class="_content-s">
        <router-link :to="{name: 'CreateMusic'}" class="_link _margin30">
          <div class="_link-container">
            <img src="@/assets/images/icon-music-blue.png" class="_link-icon" alt="セットリスト">
            <div class="_link-box">
              <p class="_link-p">楽曲の新規登録</p>
            </div>
          </div>
        </router-link>
        <div class="_label-white">楽曲一覧</div>
        <div v-for="(music, index) in musics" :key="index" class="_multi-box" :class="{'_multi-box-start': index === 0, '_multi-box-end': musics.length -1 === index}" >
          <router-link :to="{name: 'EditMusic', params:{id: music.id}}" class="_multi-inner" :class="{'_multi-inner-end': musics.length -1 === index}">
            <p class="_multi-text">{{music.name}}</p>
            <img  src="@/assets/images/icon-arrow-r.png" alt="" class="_multi-icon _arrow">
          </router-link>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import SubHeader from '@/components/SubHeader.vue'
import Footer from '@/components/Footer.vue'
import Mixin from '@/mixin/mixin.js'

import db from '@/firebase/modules/db.js'


export default {
  name: 'Music',
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
      pageTitle:"楽曲の登録・編集",
      backPath:"/set_list",
      isPcTitle: false,
      musics: []
    }
  },
  created(){
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
.name{
  color: var(--white);
  margin-bottom: 30px;
}
.set_list{
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