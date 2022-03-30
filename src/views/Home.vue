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

        <div class="sub">
          <div class="_link-mini-line-white">
            <img src="@/assets/images/icon-video-white.png" class="_link-mini-icon " alt="">
            <p class="_link-mini-text">LIVE Through の使い方</p>
          </div>
        </div>

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
              LIVE Through(以下 ライブスルー)とはアーティストがライブ活動を行うにあたって必要な資料(セットリスト・ステージプロット)をホームページ上で簡単に作成する事が出来る無料のWEBサイトです。<br>
              基本的にライブハウスや各種イベントに出演される際、事前にステージプロット(ステージのセッティング図)の提出を求められたり、当日に曲のセットリスト(ライブの曲順表)をご用意しているはずです。
              ライブスタッフ（以下 エンジニア）へ情報が伝わる事により円滑にライブを行われる為の必要な資料です。<br>
              しかし、アーティストにとって「エンジニアにどんな情報を求められている？」、「どの様に作成及び記載すれば良いかわからない」と思っている方も多数いらっしゃると思います。そんな問題を解決する為に作られたWEBサイトがライブスルーです。<br>
              コロナ過ということもありライブ活動が自粛されていたり、ライブ活動を新たに始める人も少なくなっているのではないでしょうか？ライブスルーをきっかけに、ライブ活動が簡単・身近になり、全国各地で更なる感動が増えればと願っております。
            </p>
          </div>
        </div>

      </div>
      <div class="use-content">
        <div class="use">
          <p class="use-title">【ライブスルーで出来る事】</p>
          <ul class="use-list">
            <li class="line">順を追って各項目を選択・記入をするだけで、どなたでも簡単にセットリスト・ステージプロットを作成（PDF出力）。</li>
            <li class="line">あらかじめ項目が決まっているので、エンジニアに求められている内容を資料に記載する事が出来る。</li>
            <li class="line">セットリストは曲を登録して、ライブによって並び変えるだけ。</li>
            <li class="line">作成後からでもに保存データによって訂正や編集が容易。</li>
            <li class="line">PDFデータとして出力されるので、関係者へデータ送信、もしくは自宅及びコンビニ等のプリンターで印刷して提出。（※出力されだPDFデータはサイト上では保存されません。PC・スマホ等のデバイスにて保存して下さい。）</li>
            <li class="line">WEBサイト上のアプリなのでPC・スマホのブラウザからどの場所からでも使える。（※インターネットに繋がっている場合に限る）</li>
            <li class="line">資料作りの煩わしさを無くしエンジニアへ正確に情報を伝えれる事により、ライブ当日に無駄な時間を割く事無く充実したリハーサルを行え、結果良いパフォーマンスに繋がる。</li>
            <li class="no-line">完全無料。</li>
          </ul>
        </div>
      </div>

    </div>
    <Footer></Footer>


  </div>
</template>

<script>
import Mixin from '@/mixin/mixin.js'

import SubHeader from '@/components/SubHeader.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    SubHeader,
    Footer
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
}
.use{
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 0;
}
.use-title{
  font-size: 2.0rem;
  margin-bottom: 30px;
  text-align: center;
}
.use-list{
  list-style: none;
  margin: 0 auto;
}
.use-list li{
  padding: 10px 0;
  text-align: justify;
  
}
.line{
  border-bottom: 1px solid var(--gray-low);
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
  }
  .use{
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 60px 0;
  }
  .use-title{
    font-size: 2.0rem;
    margin-bottom: 30px;
    text-align: center;
  }
  .use-list{
    list-style: disc;
    margin: 0 auto;
  }
  .use-list li{
    padding: 15px 0;
  }
}
</style>