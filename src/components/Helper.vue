<template>
  <div class="helper">
    <img :id="helperObject.id" @click="open()" src="@/assets/images/help.png" class="button" alt="">
    <div v-if="isShown" class="pop">
      <div @click="close()" class="cover"></div>
      <div class="content">
        <p class="help-title">{{helperObject.title}}</p>
        <p class="help-text">{{helperObject.text}}</p>
      </div>
    </div>
  </div>
  
</template>

<script>
import Mixin from '@/mixin/mixin.js'

export default {
  props:{
    helperObject:{
      type: Object
      // title: 
      // text: "入れ込みたい文章"
    },
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

  }
}
</script>

<style scoped>
.helper{
  display: inline;
}
.button{
  width: 15px;
  height: 15px;
  -webkit-transform: translate(5px, 2px);
  transform: translate(5px, 2px);
}
.cover{
  position: fixed;
  z-index: 60;
  display: block;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.content{
  position: fixed;
  z-index: 70;
  width: 70%;
  max-width: 500px;
  height: auto;
  background-color: var(--white);
  padding: 24px 16px;
  border-radius: 10px;
  top: 50%;
  left: 50%;
-webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.help-title{
  text-align: center;
  font-size: 1.7rem;
  color: var(--blue);
  margin-bottom: 10px;
}
.help-text{
  text-align: justify;
  white-space: pre-wrap;
  font-size: 1.5rem;
  color: var(--black);
  font-weight: 300;
}
</style>