<template>
  <div class="flow-set-list">
    <div v-if="!isShownFlow" @click="showFlow()" class="_link-mini-line-white _marginS">
      <img src="@/assets/images/icon-book-white.png" class="_link-mini-icon" alt="">
      <p class="_link-mini-text">セットリスト作成の流れ</p>
    </div>
    <div v-if="isShownFlow" @click="showFlow()" class="_flow">
      <div class="_flow-container">
        <p class="_flow-main-title">セットリスト作成の流れ</p>
        <p class="_flow-main-text">毎ライブの際に登録された楽曲を並び変えるだけでセットリストが簡単に作成出来ます。各楽曲の要望等や曲情報を毎回記入する面倒な手間が省けます。</p>
        <div class="_flow-box">
          <p class="_flow-title">楽曲の登録</p>
          <p class="_flow-text">各曲情報を選択・入力。</p>
        </div>
        <img src="@/assets/images/triangle.png" alt="" class="_flow-arrow">
        <div class="_flow-box">
          <p class="_flow-title">セットリストの作成・編集</p>
          <p class="_flow-text">登録した楽曲を SE や MC も含め、ライブ当日の順番に並べる。</p>
        </div>
        <img src="@/assets/images/triangle.png" alt="" class="_flow-arrow">
        <div class="_flow-box">
          <p class="_flow-title">PDF(もしくは JPEG)書き出し</p>
          <p class="_flow-text">作成した曲順等を確認して問題なければ書き出しで完成。ご使用端末に保存。</p>
        </div>
      </div>
    </div>
  </div>

  
</template>

<script>
import Mixin from '@/mixin/mixin.js'

export default {
  props:{


  },
  data(){
    return{
      isShownFlow: false,
    }
  },
  mixins:[
    Mixin
  ],
  methods:{
    showFlow(){
      this.isShownFlow = !this.isShownFlow
    },
  }
}
</script>

<style scoped>


@media screen and (min-width:600px){

}
</style>