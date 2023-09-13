<template>
  <div class="flow-stage-plot">
    <div v-if="!isShownFlow" @click="showFlow()" class="_link-mini-line-white _marginS">
      <img src="@/assets/images/icon-book-white.png" class="_link-mini-icon" alt="">
      <p class="_link-mini-text">ステージプロット作成の流れ</p>
    </div>
    <div v-if="isShownFlow" @click="showFlow()" class="_flow">
      <div class="_flow-container">
        <p class="_flow-main-title">ステージプロット作成の流れ</p>
        <p class="_flow-main-text">各項目に沿って選択・入力するだけで、エンジニアに必要な情報を含めたプロットが簡単に作成出来ます。<br>5つまで保存可能。編成や配置等の変更がある場合に容易に更新、普段と違ったパターンのプロット作成も出来ます。</p>
        <p class="_flow-sub-title">バンドステージ</p>
        <div class="_flow-box">
          <p class="_flow-title">ステージプロットの新規作成</p>
          <p class="_flow-text">バンドステージ(バンド・アコースティック等の楽器を使った編成)を選択</p>
        </div>
        <img src="@/assets/images/triangle.png" alt="" class="_flow-arrow">
        <div class="_flow-box">
          <p class="_flow-title">メンバーを追加</p>
          <p class="_flow-text">在籍するメンバーを1人ずつ登録していきます。</p>
        </div>
        <img src="@/assets/images/triangle.png" alt="" class="_flow-arrow">
        <div class="_flow-box">
          <p class="_flow-title">メンバーのパート選択</p>
          <p class="_flow-text">配置や機材の各項目を選択・入力。</p>
        </div>
        <img src="@/assets/images/triangle.png" alt="" class="_flow-arrow">
        <div class="_flow-box">
          <p class="_flow-text">『メンバーを追加』を繰り返し全メンバーを登録。</p>
        </div>
        <img src="@/assets/images/triangle.png" alt="" class="_flow-arrow">
        <div class="_flow-box _marginL">
          <p class="_flow-title">PDF(もしくは JPEG)書き出し</p>
          <p class="_flow-text">作成したステージプロット詳細を確認して問題なければ書き出しで完成。ご使用端末に保存。</p>
        </div>

        <p class="_flow-sub-title">アイドルステージ</p>
        <div class="_flow-box">
          <p class="_flow-title">ステージプロットの新規作成</p>
          <p class="_flow-text">アイドルステージ(アイドル等の楽器を使わずオケで歌うグループ)を選択</p>
        </div>
        <img src="@/assets/images/triangle.png" alt="" class="_flow-arrow">
        <div class="_flow-box">
          <p class="_flow-title">メンバーを追加</p>
          <p class="_flow-text">在籍するメンバーを1人ずつ登録していきます。</p>
        </div>
        <img src="@/assets/images/triangle.png" alt="" class="_flow-arrow">
        <div class="_flow-box">
          <p class="_flow-text">『メンバーを追加』を繰り返し全メンバーを登録。</p>
        </div>
        <img src="@/assets/images/triangle.png" alt="" class="_flow-arrow">
        <div class="_flow-box">
          <p class="_flow-text"> マイクや音源の詳細を選択・入力。</p>
        </div>
        <img src="@/assets/images/triangle.png" alt="" class="_flow-arrow">
        <div class="_flow-box">
          <p class="_flow-title">PDF(もしくは JPEG)書き出し</p>
          <p class="_flow-text">作成したステージプロット詳細を確認して問題なければ書き出しで完成。ご使用端末に保存。</p>
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