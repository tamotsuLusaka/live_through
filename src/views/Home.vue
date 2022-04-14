<template>
  <div class="base">
    <div v-if="this.$store.getters['auth/isSignedIn']" class="after">
      <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
      <div class="_content-s">
        <p class="name">{{this.$store.getters['auth/userName']}}</p>
        <div class="main">
          <router-link :to="{name: 'SetList'}" class="_link _marginL">
            <div class="_link-container">
              <img src="@/assets/images/icon-mic-blue-t.png" class="_link-icon" alt="セットリスト">
              <div class="_link-text-box">
                <p class="_link-title">セットリスト</p>
                <p class="_link-text">セットリスト(曲順表)の作成・編集</p>
              </div>
            </div>
          </router-link>
          <router-link :to="{name: 'StagePlot'}" class="_link">
            <div class="_link-container">
              <img src="@/assets/images/icon-stage-blue-t.png" class="_link-icon" alt="セットリスト">
              <div class="_link-text-box">
                <p class="_link-title">ステージプロット</p>
                <p class="_link-text">ステージプロット(セッティング図)の作成・編集</p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="info">
          <div v-if="!isShownSetListFlow" @click="showSetListFlow()" class="_link-mini-line-white _marginS">
            <img src="@/assets/images/icon-book-white.png" class="_link-mini-icon" alt="">
            <p class="_link-mini-text">セットリスト作成の流れ</p>
          </div>
          <div v-if="isShownSetListFlow" @click="showSetListFlow()" class="_flow">
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
        <div class="_info">
          <div v-if="!isShownStagePlotFlow" @click="showStagePlotFlow()" class="_link-mini-line-white _marginS">
            <img src="@/assets/images/icon-book-white.png" class="_link-mini-icon" alt="">
            <p class="_link-mini-text">ステージプロット作成の流れ</p>
          </div>
          <div v-if="isShownStagePlotFlow" @click="showStagePlotFlow()" class="_flow">
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
        <Ad></Ad>
      </div>
    </div>
    <div v-else class="before" >
      <div class="top" :style="{ 'background-image': 'url(' + topBackgroundImage +')'}">
        <img src="@/assets/images/logo-c.png" alt="ロゴ" class="logo">
        <div class="sign">
          <router-link :to="{name: 'SignUp'}" class="_button-s _marginM">アカウント作成</router-link>
          <router-link :to="{name: 'SignIn'}" class="_button-a">ログイン</router-link>
        </div>
      </div>
      <div class="about-content">
        <div class="about">
          <div class="about-left">
            <img src="@/assets/images/icon-set-blue.png" class="about-image">
          </div>
          <div class="about-right">
            <h1 class="about-title">LIVE Throughとは</h1>
            <p>
              LIVE Through(読み ライブスルー)とはアーティストがライブ活動を行うにあたって必要な資料(セットリスト・ステージプロット)をホームページ上で簡単に作成する事が出来る無料のWEBアプリです。<br>
              基本的にライブハウスや各種イベントに出演される際、事前にステージプロット(ステージのセッティング図)の提出を求められたり、ライブ当日のセットリスト(曲順表)をご用意しているはずです。ライブスタッフ（以下 エンジニア）へ情報が伝わる事により円滑にライブを行われる為の必要な資料です。<br>
              しかし、アーティストには「エンジニアにどんな情報を求められている？」「どの様に作成及び記載すれば良いかわからない」「資料を作る環境がない」という方も多数いらっしゃると思います。そんな問題を解決する為に作られたWEBアプリがライブスルーです。
            </p>
          </div>
        </div>
      </div>
      <div class="use-content">
        <div class="use">
          <p class="use-title">【ライブスルーで出来る事】</p>
          <div class="use-container">
            <div class="use-box">
              <p class="use-topic">簡単作成</p>
              <p class="use-text">専門ソフト不要。ホームページ上で順を追って各項目を選択・記入していくだけで、どなたでも簡単にセットリスト・ステージプロットを作成。</p>
            </div>
            <div class="use-box">
              <p class="use-topic">スマホ＆PC対応</p>
              <p class="use-text">WEBサイト上のアプリなのでPC・スマホのブラウザからどの場所からでも使える。（※1 インターネットに繋がっている場合に限る ※2 推奨ブラウザSafari, Chrome, Edge, Firefox）</p>
            </div>
            <div class="use-box">
              <p class="use-topic">曲を並び変え</p>
              <p class="use-text">セットリストは自身の曲情報を登録して、ライブの曲順に曲を並びていくだけ。ドラッグ＆ドロップで簡単に並び替えも可能。</p>
            </div>
            <div class="use-box">
              <p class="use-topic">保存＆編集</p>
              <p class="use-text">データ保存が可能。作成後からでも訂正や編集が容易。</p>
            </div>
            <div class="use-box">
              <p class="use-topic">PDF出力</p>
              <p class="use-text">PDFファイルとして出力。関係者へデータ送信、もしくはプリンターで印刷して提出。（※出力されたPDFはご使用のPC・スマホ端末にて保存して下さい。）</p>
            </div>
            <div class="use-box">
              <p class="use-topic">的確な情報</p>
              <p class="use-text">あらかじめ項目が決まっているので、エンジニアに求められている情報を的確に資料に記載する事が出来る。</p>
            </div>
            <div class="use-box">
              <p class="use-topic">パフォーマンス向上</p>
              <p class="use-text">資料作りの煩わしさを無くしエンジニアへ正確に情報を伝えれる事により、ライブ当日に無駄な時間を割く事無く充実したリハーサルを行え、結果良いパフォーマンスに繋がる。</p>
            </div>
            <div class="use-box">
              <p class="use-topic">完全無料</p>
              <p class="use-text"></p>
            </div>
          </div>
        </div>
        <div class="sample">
          <p class="sample-title">作成サンプル</p>
          <div class="sample-container">
            <a href="https://firebasestorage.googleapis.com/v0/b/live-through-42f07.appspot.com/o/SAMPLE_setlist_202211.pdf?alt=media&token=6c7cec5f-5f1a-4dd8-84fc-d84ffc11cc9a" class="sample-button" target="_blank" rel="noopener noreferrer">セットリスト</a>
            <a href="https://firebasestorage.googleapis.com/v0/b/live-through-42f07.appspot.com/o/SAMPLE_stageplot_2022410_1.pdf?alt=media&token=fbfe8081-45d8-4473-aaec-b8c3149101fc" class="sample-button" target="_blank" rel="noopener noreferrer">ステージプロット（弾語り）</a>
            <a href="https://firebasestorage.googleapis.com/v0/b/live-through-42f07.appspot.com/o/SAMPLE_stageplot_2022410_2.pdf?alt=media&token=11a7fe32-279b-4a79-b2e1-f033622e31d8" class="sample-button" target="_blank" rel="noopener noreferrer">ステージプロット（バンド）</a>
            <a href="https://firebasestorage.googleapis.com/v0/b/live-through-42f07.appspot.com/o/SAMPLE_stageplot_2022410_3.pdf?alt=media&token=fca22068-06c1-46de-9e67-eec6375aedf7" class="sample-button" target="_blank" rel="noopener noreferrer">ステージプロット（アイドル）</a>
          </div>
        </div>
        <Ad class="home-ad"></Ad>
      </div>
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
    Ad
  },
  mixins:[
    Mixin
  ],
  data(){
    return{
      pageType: "home",
      pageTitle:"home",
      isBack:"",
      isPcTitle: false,
      topBackgroundImage: require("@/assets/images/top-image.jpg"),

      isShownSetListFlow: false,
      isShownStagePlotFlow: false,
    }
  },
  methods:{
    showSetListFlow(){
      this.isShownSetListFlow = !this.isShownSetListFlow
    },
    showStagePlotFlow(){
      this.isShownStagePlotFlow = !this.isShownStagePlotFlow
    },
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
.base{
  background-color: var(--blue);
  min-height: 100vh;
}
.after{
  
}
/* ログイン */
.name{
  color: var(--white);
  margin-bottom: 30px;
}
.main{
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

.before{
  background-color: var(--white);
}
.about-content{
  padding:60px 0 ;

}
.about{
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
}
.about-left{
  display: none;
}
.about-title{
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--blue);
  margin-bottom: 20px;
  text-align: center;
}

.about-right{
  width: 100%;
}
.about p{
  /* background-color: var(--white); */
  line-height: 1.6;
  text-align: justify;
}

.use-content{
  background-color: var(--bg);
  padding: 60px 0 30px;
}
.use{
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 0 40px;
}
.use-title{
  font-size: 2.0rem;
  margin-bottom: 40px;
  text-align: center;
  font-weight: 700;
}
.use-container{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.use-box{
  width: calc(100% - 32px);
  background-color: var(--white);
  margin: 0 0 20px 0;
  border-radius: 10px;
  padding: 16px;
}
.use-topic{
  font-size: 1.7rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
  color: var(--blue);
}
.use-text{
  text-align: justify;
}

.sample{
  margin: 0 auto;
  background-color: var(--white);
  border-radius: 10px;
  width: 90%;
  max-width: 1000px;
  padding: 16px 0;
}
.sample-title{
  font-size: 1.7rem;
  text-align:center;
  margin:10px 0 20px;
  font-weight: 700;
}
.sample-container{
  display: block;
  width: 90%;
  margin:0 auto 10px;
}
.sample-button{
  display: block;
  color: var(--blue);
  background-color: var(--white);
  border: 3px solid var(--blue);
  /* padding: 10px; */
  border-radius: 10px;
  font-weight: 700;
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 20px;
  height: 40px;
  line-height: 40px;
}
.home-ad{
  margin: 60px auto 0;
  width: 90%;
  max-width: 1000px;
}

@media screen and (min-width:600px){
  .sign{
    display: flex;
    justify-content: space-between;
    width: 500px;
    margin: 0 auto;
    left: 50%;
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }
  .about-content{
    padding: 120px 0 ;
  }
  .about{
    display: flex;
    justify-content: space-between;
  }
  .about-title{
    text-align: left;
  }
  .about-left{
    display: block;
    width: 40%;
    position: relative;
  }
  .about-image{
    opacity: 0.3;
    width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .about-title{
    font-size: 2.4rem;

    margin-bottom: 30px;
  }
  .about-right{
    width: 60%;
  }

  .use-content{
    padding: 120px 0 30px;
  }
  .use{
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 0 30px;
  }
  .use-title{
    font-size: 2.0rem;
    margin-bottom: 40px;
    text-align: center;
  }
  .use-box{
    width: 19%;
    margin: 0 0 30px 0;
    padding: 2%;
  }
  .sample{
    width: 90%;
  }
  .sample-container{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: calc(100% - 32px);
    margin: 0 auto;
    padding-bottom: 10px;
  }
  .sample-button{
    width: calc(50% - 10px);
    margin-bottom: 10px;
  }
}
</style>