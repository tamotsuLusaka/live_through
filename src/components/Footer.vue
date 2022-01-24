<template>
  <div v-if="mq.current === 'lg'" class="footer">
    <img src="@/assets/images/logo-white.png" class="logo" alt="">
    <div class="link-container">
      ｜<router-link :to="{name: 'Home'}" class="link">利用規約</router-link>｜<router-link :to="{name: 'Home'}" class="link">プライバシーポリシー</router-link>｜
    </div>
    <div class="right">Copyright LIVE THROUGH All Rights Reserved.</div>
  </div>
  
</template>

<script>
import Mixin from '@/mixin/mixin.js'

export default {
  props:{


  },
  data(){
    return{

    }
  },
  mixins:[
    Mixin
  ],

}
</script>

<style scoped>
.footer{
  position: relative;
  background-color: var(--blue-low);
  width: 100%;
  height: 100px;
  bottom: 0;
  left: 0;
  right: 0;
}
.logo{
  position: absolute;
  top: 22px;
  left: 30px;
  width: 180px;
}
.link-container{
  color: var(--white);
  position: absolute;
  left: 24px;
  bottom: 20px;
  font-size: 1.2rem;
}
.link{
  color: var(--white);
}
.right{
  position: absolute;
  right: 30px;
  bottom: 20px;
  color: var(--white);
  font-size: 1.0rem;
}
</style>