<template>
  <div class="_base-s">
    <div v-if="this.$store.getters['auth/isSignedIn']" class="after">
      <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
      <div class="_content-s">
        <div class="list">
          <router-link :to="{name: 'CreateStagePlot'}" class="_link _marginM">
            <div class="_link-container">
              <img src="@/assets/images/icon-stage-blue-t.png" class="_link-icon" alt="セットリスト">
              <div class="_link-box">
                <p  v-if="mq.current === 'md'" class="_link-p">ステージプロットの<br>新規作成</p>
                <p  v-if="mq.current === 'lg'" class="_link-p">ステージプロットの新規作成</p>
              </div>
            </div>
          </router-link>
          <div class="_label-white">保存済みステージプロット一覧</div><Helper :helperObject="helper.list"></Helper>
          <p v-if="stagePlots.length === 0" class="_not-yet">保存済みのステージプロットはありません</p>
          <div v-for="(stagePlot, index) in stagePlots" :key="index" class="_multi-box" :class="{'_multi-box-start': index === 0, '_multi-box-end': stagePlots.length -1 === index}" >
            <div v-if="stagePlot.type ==='band'">
              <router-link :to="{name: 'ShowBand', params:{id: stagePlot.id}}" class="_multi-inner" :class="{'_multi-inner-end': stagePlots.length -1 === index}">
                <p class="_multi-text">{{stagePlot.name}}</p>
                <img  src="@/assets/images/icon-arrow-r.png" alt="" class="_multi-icon _arrow">
              </router-link>
            </div>
            <div v-else-if="stagePlot.type ==='idol'">
              <router-link :to="{name: 'ShowIdol', params:{id: stagePlot.id}}" class="_multi-inner" :class="{'_multi-inner-end': stagePlots.length -1 === index}">
                <p class="_multi-text">{{stagePlot.name}}</p>
                <img  src="@/assets/images/icon-arrow-r.png" alt="" class="_multi-icon _arrow">
              </router-link>
            </div>
          </div>
        </div>

        <div class="_info">
          <div v-if="!isShownFlow" @click="showFlow()" class="_link-mini-line-white _marginS">
            <img src="@/assets/images/icon-book-white.png" class="_link-mini-icon" alt="">
            <p class="_link-mini-text">ステージプロット作成の流れ</p>
          </div>
          <div v-if="isShownFlow" @click="showFlow()" class="_flow">
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
import Helper from '@/components/Helper.vue'

import db from '@/firebase/modules/db.js'

export default {
  name: 'SetList',
  components: {
    SubHeader,
    Footer,
    Helper,
  },
  mixins:[
    Mixin
  ],
  data(){
    return{
      pageType: "stagePlot",
      pageTitle:"ステージプロット",
      isBack: true,
      isPcTitle: false,

      stagePlots: [],
      isShownFlow: false,

      helper:{
        list:{
          title:"保存済みステージプロット一覧",
          text:"【ステージプロットの新規作成】で作成されたステージプロットが表示されます。\n作成済みステージプロットの内容変更、PDF書き出しをする際は保存されたステージプロットを選択して下さい。"
        }
      },
    }
  },
  created(){
    this._authCheck()
    db.getBands(this.$store.getters['auth/userId'])
    .then((querySnapShot)=>{
      querySnapShot.forEach(doc => {
        this.stagePlots.push(doc.data())
      })
    })
    .catch((error)=>{
      console.log(error.message)
    })
    db.getIdols(this.$store.getters['auth/userId'])
    .then((querySnapShot)=>{
      querySnapShot.forEach(doc => {
        this.stagePlots.push(doc.data())
      })
    })
    .catch((error)=>{
      console.log(error.message)
    })
  },
  mounted(){
    
  },
  methods:{
    showFlow(){
      this.isShownFlow = !this.isShownFlow
    }
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
.list{
  margin-bottom: 80px;
}
.music{
  margin-bottom: 60px;
}


</style>