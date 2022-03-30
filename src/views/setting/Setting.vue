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
        <div class="info _marginS">
          <div v-if="!isShownSetListFlow" @click="ShowSetListFlow()" class="_link-mini-line-white ">
            <img src="@/assets/images/icon-book-white.png" class="_link-mini-icon" alt="">
            <p class="_link-mini-text">セットリスト作成の流れ</p>
          </div>
          <div v-if="isShownSetListFlow" @click="ShowSetListFlow()" class="_flow">
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
        <div class="info _marginS">
          <div v-if="!isShownStagePlotFlow" @click="ShowStagePlotFlow()" class="_link-mini-line-white">
            <img src="@/assets/images/icon-book-white.png" class="_link-mini-icon" alt="">
            <p class="_link-mini-text">ステージプロット作成の流れ</p>
          </div>
          <div v-if="isShownStagePlotFlow" @click="ShowStagePlotFlow()" class="_flow">
            <div class="_flow-container">
              <p class="_flow-main-title">ステージプロット作成の流れ</p>
              <p class="_flow-main-text">各項目に沿って選択・入力するだけで、エンジニアに必要な情報を含めたプロットが簡単に作成出来ます。<br>3つまで保存可能。編成や配置等の変更がある場合に容易に更新、普段と違ったパターンのプロット作成も出来ます。</p>
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

      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Mixin from '@/mixin/mixin.js'

import SubHeader from '@/components/SubHeader.vue'
import Footer from '@/components/Footer.vue'

import User from '@/class/User.js'

import db from '@/firebase/modules/db.js'
import auth from '@/firebase/modules/auth.js'

export default {
  name: 'Setting',
  components: {
    SubHeader,
    Footer,
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