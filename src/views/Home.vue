<template>
  <div class="_base-h">
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
        <Ad class="home-ad"></Ad>
      </div>
    </div>
    <div v-else class="before" >
      <div class="top" :style="{ 'background-image': 'url(' + topBackgroundImage +')', 'height': $store.getters['data/innerHeight'] + 'px'}">
        <img src="@/assets/images/logo-c.png" alt="ロゴ" class="logo">
        <div class="sign">
          <router-link :to="{name: 'SignUp'}" class="_button-s _marginS">アカウント作成</router-link>
          <router-link :to="{name: 'SignIn'}" class="_button-a">ログイン</router-link>
        </div>
      </div>
      <div class="about-content">
        <div class="about">
          <div class="about-left">
            <img src="@/assets/images/logo-i-white.png" class="about-image">
          </div>
          <div class="about-right">
            <div class="about-title">
              <h1 class="about-title-main">LIVE Through</h1>
              <p class="about-title-sub">ライブスルーとは</p>
            </div>
            <p class="about-text">
              ライブスルーはアーティストがライブ活動を行うにあたって必要な資料【セットリスト】【ステージプロット】をホームページ上で簡単に作成する事が出来る無料のWEBアプリです。<br>
              ライブハウスや各種イベントに出演される際、事前にステージプロット(ステージのセッティング図)の提出を求められたり、ライブ当日のセットリスト(曲順表)をご用意しているはずです。ライブスタッフ（以下 エンジニア）へ情報が伝わる事により円滑にライブを行われる為の必要な資料です。<br>
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
              <img src="@/assets/images/icon-understand-blue.png" class="use-image" alt="">
              <p class="use-topic">簡単作成</p>
              <p class="use-text">専門ソフト不要。ホームページ上で順を追って各項目を選択・記入していくだけで、どなたでも簡単にセットリスト・ステージプロットを作成することができます。</p>
            </div>
            <div class="use-box">
              <img src="@/assets/images/icon-device-blue.png" class="use-image" alt="">
              <p class="use-topic">スマホ&PC対応</p>
              <p class="use-text">WEBサイト上のアプリなのでスマホ・PCのブラウザからどの場所からでも使えます。<br><span class="small">※推奨ブラウザSafari, Chrome, Edge, Firefox。</span></p>
            </div>
            <div class="use-box">
              <img src="@/assets/images/icon-cloud-blue.png" class="use-image" alt="">
              <p class="use-topic">保存＆編集</p>
              <p class="use-text">アカウントを作成してデータ保存が可能。ログインすればどの端末からでも訂正や編集ができます。</p>
            </div>
            <div class="use-box">
              <img src="@/assets/images/icon-pdf2-blue.png" class="use-image" alt="">
              <p class="use-topic">PDF出力</p>
              <p class="use-text">PDFファイルとして出力。関係者へデータ送信、もしくはプリンターで印刷して提出できます。<br><span class="small">※出力されたPDFはご使用のPC・スマホ端末にて保存して下さい。</span></p>
            </div>
            <div class="use-box">
              <img src="@/assets/images/icon-memo-blue.png" class="use-image" alt="">
              <p class="use-topic">的確な情報</p>
              <p class="use-text">あらかじめ項目が決まっているので、エンジニアに求められている情報を的確に資料に記載する事ができます。</p>
            </div>
            <div class="use-box">
              <img src="@/assets/images/icon-free-blue.png" class="use-image" alt="">
              <p class="use-topic">完全無料</p>
              <p class="use-text">ライブスルーはどなたでも無料でご利用いただけます。</p>
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
    Ad,
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

.after{
  
}
/* ログイン */
.name{
  color: var(--white);
  margin-bottom: 30px;
}
.main{
  margin-bottom: 60px;
}

/* 未ログイン */
.top{
  width: 100%;
  background-position: center;
  background-size: cover;
  position: relative;
}
.logo{
  width: 70%;
  position: absolute;
  left: 50%;
  top:48%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.sign{
  width: 100%;
  position: absolute;
  bottom: 90px;
}

.before{
  background-color: var(--white);
  padding-bottom: 50px;
}
.about-content{
  padding:60px 0 ;
  background: linear-gradient(180deg, rgb(0, 127, 199), rgb(2, 73, 115));
}
.about{
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
}
.about-left{
  text-align: center;
  margin-bottom: 10px;
}
.about-image{
  width: 100px;
}
.about-title{
  margin-bottom: 30px;
  text-align: center;
}
.about-title-main{
  font-size: 2.6rem;
  font-weight: 700;
  color: var(--white);
  
}
.about-title-sub{

  font-size: 1.4rem;
  font-weight: 400;
  color: var(--white);
  
}
.about-right{
  width: 100%;
}
.about-text{
  /* background-color: var(--white); */
  color: var(--white);
  line-height: 1.8;
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
  color: var(--blue);
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
  text-align: center;
}
.use-image{
  width: 20%;
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
  line-height: 1.7;
  display: block;
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
.small{
  font-size: 1.3rem;
  line-height: 1.0;
}

@media screen and (min-width:600px){
  .logo{
    width: 40%;
  }
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
    opacity: 1;
    width: 60%;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .about-title{
    font-size: 2.4rem;
  }
  .about-right{
    width: 60%;
  }
  .before{
    padding-bottom: 0;
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
    width: calc(33% - 15px);
    margin: 0 0 30px 0;
    padding: 2%;
    box-sizing: border-box;
  }
  .use-image{
    width: 30%;
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

  .home-ad{
    margin: 60px auto 0;
    width: 90%;
    max-width: 1000px;
  }
}
</style>