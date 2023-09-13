<template>
  <div class="_base-h">
    <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content-s">
      <div class="_flow">
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
      <Ad class="home-ad"></Ad>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Mixin from '@/mixin/mixin.js'

import SubHeader from '@/components/SubHeader.vue'
import Footer from '@/components/Footer.vue'
import Ad from '@/components/Ad.vue'

export default {
  name: 'Home',
  components: {
    SubHeader,
    Footer,
    Ad,
  },
  mixins:[
    Mixin
  ],
  data(){
    return{
      pageType: "stagePlot",
      pageTitle:"ステージプロット作成の流れ",
      isBack:true,
      isPcTitle: false,
      topBackgroundImage: require("@/assets/images/top-image.jpg"),

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



@media screen and (min-width:600px){

}
</style>