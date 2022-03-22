<template>
  <div class="_base-s">
    <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="show-top">
      <div class="show-top-content">
        <p v-if="errorMessage !== ''" class="_error-message">{{errorMessage}}</p>
        <div class="show-logo">
          <img src="@/assets/images/icon-people-blue.png" alt="" class="show-icon">
          <p>{{idol.name}}</p>
        </div>
        <div @click="goEdit()" class="_link-mini-line-blue _marginS">
          <p class="_link-mini-text">ステージプロットの編集</p>
        </div>
        <div @click="goExport()" class="_link-mini-blue _marginS">
          <img src="@/assets/images/icon-pdf-white.png" class="_link-mini-icon " alt="">
          <p class="_link-mini-text">PDFで書き出し</p>
        </div>
        <p class="_description">下記に【プロット詳細】を確認して訂正がある場合は【ステージプロットを編集】問題なければ【PDFで書き出し】。<br>全体的な要望等があれば一番下の【その他、要望】に入力して下さい。</p>
      </div>
    </div>
    <div class="show-bottom">
      <div class="show-bottom-content">
        <p class="show-title">プロット詳細<Helper :helperObject="helper.note"></Helper></p>
        <div class="_container">
          <label class="_label-white">メンバー</label>
          <div v-for="(member, index) in idol.lists" :key="member">
            <div  class="_multi-box" :class="{'_multi-box-start': index === 0, '_multi-box-end': index + 1 === idol.lists.length}">
              <div class="_flex-multi-inner" :class="{'_multi-inner-end': index + 1 === idol.lists.length}">
                <p class="text">{{member.name}}</p>
                <p v-if="member.micNumber !== null" class="text">Mic No.{{member.micNumber}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="_container">
          <!-- マイク -->
          <div v-if="idol.isBroughtMic" class="_multi-box _multi-box-start">
            <div class="_flex-multi-inner">
              <p class="_multi-sub_title-blue">ワイヤレスマイク</p>
              <p class="text">持ち込み有り</p>
              <p class="text">{{idol.mic.type}}</p>
              <p class="text">メモ：{{idol.mic.text}}</p>
            </div>
          </div>
          <div v-if="!idol.isBroughtMic" class="_multi-box _multi-box-start">
            <div class="_flex-multi-inner">
              <p class="_multi-sub_title-blue">ワイヤレスマイク</p>
              <p class="text">持ち込み無し</p>
            </div>
          </div>

          <!-- 音源 -->
          <div  class="_multi-box">
            <div class="_flex-multi-inner">
              <p class="_multi-sub_title-blue">音源（オケ）</p>
              <p class="text">音源：{{idol.source.type}}</p>
              <p v-if="idol.source.type ==='その他'" class="text">{{idol.source.other}}</p>
              <p class="text">アウト端子：{{idol.source.terminal}}</p>
              <p class="text">チャンネル：{{idol.source.channel}}</p>
            </div>
          </div>
          <!-- イヤモニ -->
          <div v-if="!idol.isMonitor" class="_multi-box">
            <div class="_flex-multi-inner">
              <p class="_multi-sub_title-blue">イヤモニ</p>
              <p class="text">無し</p>
            </div>
          </div>
          <div v-if="idol.isMonitor && idol.isBroughtMonitor" class="_multi-box">
            <div class="_flex-multi-inner">
              <p class="_multi-sub_title-blue">イヤモニ</p>
              <p class="text">持ち込み有り</p>
              <p class="text">{{idol.monitor.type}}</p>
              <p class="text">チャンネル：{{idol.monitor.channel}}</p>
            </div>
          </div>
          <div v-if="idol.isMonitor && !idol.isBroughtMonitor" class="_multi-box">
            <div class="_flex-multi-inner">
              <p class="_multi-sub_title-blue">イヤモニ</p>
              <p class="text">持ち込み無し</p>
            </div>
          </div>
          <!-- 備考 -->
          <div class="_multi-box _multi-box-end">
            <div class="_flex-multi-inner _multi-inner-end">
              <p class="_multi-sub_title-blue">備考</p>
              <p>{{idol.text}}</p>
            </div>
          </div>
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
import Helper from '@/components/Helper.vue'

import Idol from '@/class/Idol.js'

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
      errorMessage: "",

      idol: new Idol(),

      helper:{
        note:{
          title:"プロット詳細",
          text:"作成したステージプロットの各詳細が表示されます。"
        },
      }
    }
  },
  created(){
    db.getIdol(this.$route.params.id)
    .then((doc)=>{
      this.idol = doc.data()
    })
    .catch((error)=>{
      console.log(error.message)
    })

  },
  mounted(){
    
  },
  methods:{

    // なぜかrouter-linkを使うとエラーになったからこれを使った。
    goEdit(){
      this.$router.push({name: 'EditIdol', params:{id: this.idol.id}})
    },
    goExport(){
      this.$store.commit('data/setExportIdol', this.idol)
      this.$router.push({name: 'ExportIdol', params:{id: this.idol.id}})
    },

  },
  computed:{
  },


}
</script>

<style scoped>
.red{
  color: var(--red);
}
.show-top{
  width: 100%;
  background-color: var(--white);
}
.show-top-content{
  width: 90%;
  padding:110px 0 60px;
  margin: 0 auto;
}
.show-logo{
  text-align: center;
  margin-bottom: 40px;
}
.show-icon{
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}
.show-name{
  font-size: 1.6rem;
}
.show-bottom-content{
  width: 90%;
  padding:60px 0 60px;
  margin: 0 auto;
}
.show-title{
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 30px;
}

.text-sub{
  font-size: 1.3rem;
}
@media screen and (min-width:600px){
  .show-top-content{
    max-width: 600px;
    height:auto;
  }
  .show-bottom-content{
    max-width: 600px;
    height:auto;
    min-height: calc(100vh - 778px);
  }
}


</style>