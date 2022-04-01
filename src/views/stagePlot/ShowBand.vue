<template>
  <div class="_base-s">
    <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="show-top">
      <div class="show-top-content">
        <p v-if="errorMessage !== ''" class="_error-message">{{errorMessage}}</p>
        <div class="show-logo">
          <img src="@/assets/images/icon-mic-blue.png" alt="" class="show-icon">
          <p>{{band.name}}</p>
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
          <label class="_label-white">パート配置図</label>
          <StageLayout v-if="isBandFetched" mode="display" :band="band" class="_marginS"></StageLayout>
        </div>
        <div v-for="instrument in band.lists" :key="instrument.id" class="instrument-container">
          <div class="_container">
            <div class="_label-white">{{$store.getters['select/getInstrumentValue'](instrument.type)}}. {{instrument.type}}</div>
            <div class="_multi-box _multi-box-start">
              <div class="_multi-inner">
                <p class="_multi-text">{{instrument.member}}</p>
              </div>
            </div>
            <!-- ボーカル -->
            <div v-if="tag(instrument.type) !== 'VOCAL' && instrument.isVocal" class="_multi-box">
              <div class="_flex-multi-inner">
                <p class="_multi-sub_title-blue">マイクの使用用途</p>
                <p class="text">{{instrument.vocal.part}}</p>
              </div>
            </div>
            <!-- マイク -->
            <div v-if="instrument.isBroughtMic" class="_multi-box">
              <div class="_flex-multi-inner">
                <p class="_multi-sub_title-blue">マイク</p>
                <p class="text">持込み有り</p>
                <p class="text">{{instrument.mic.type}}</p>
                <p class="text">メーカー：{{instrument.mic.brand}}</p>
                <p class="text">メーカー：{{instrument.mic.model}}</p>
              </div>
            </div>
            <div v-if="instrument.isVocal &&  !instrument.isBroughtMic" class="_multi-box">
              <div class="_flex-multi-inner">
                <p class="_multi-sub_title-blue">マイク</p>
                <p class="text">持込み無し</p>
              </div>
            </div>
            <!-- スピーカー -->
            <div v-if="instrument.type !== 'ドラム'" class="_multi-box">
              <div class="_flex-multi-inner">
                <p class="_multi-sub_title-blue">モニタースピーカー</p>
                <p v-if="instrument.vocal.part === 'ボーカル'" class="text">2台</p>
                <p v-else-if="instrument.speaker === null" class="text">1台</p>
                <p v-else-if="instrument.speaker === 2" class="text">2台</p>
                <p v-else-if="instrument.speaker === 0" class="text">無し</p>
              </div>
            </div>
            <div v-if="instrument.isVocal &&  !instrument.isBroughtMic" class="_multi-box">
              <div class="_flex-multi-inner">
                <p class="_multi-sub_title-blue">マイク</p>
                <p class="text">持込み無し</p>
              </div>
            </div>
            <!-- アンプ -->
            <div v-if="instrument.isAmp" class="_multi-box">
              <div class="_flex-multi-inner">
                <p class="_multi-sub_title-blue">アンプ</p>
                <p class="text">{{$store.getters['select/getAmpText'](instrument.amp.type)}}</p>
                <p v-if="instrument.amp.brandOfHead !== null" class="text">ヘッドメーカー：{{instrument.amp.brandOfHead}}</p>
                <p v-if="instrument.amp.brandOfCab !== null" class="text">キャビメーカー：{{instrument.amp.brandOfCab}}</p>
                <p v-if="instrument.amp.brandOfCombo !== null" class="text">コンボメーカー：{{instrument.amp.brandOfCombo}}</p>
              </div>
            </div>
            <!-- アコギ -->
            <div v-if="instrument.isLineOutForAcousticGuitar" class="_multi-box">
              <div class="_flex-multi-inner">
                <p class="_multi-sub_title-blue">アコギ出力</p>
                <p class="text">{{instrument.acousticGuitar.type}}</p>
                <p v-if="instrument.acousticGuitar.text !== null" class="text-sub">※{{instrument.acousticGuitar.text}}</p>
              </div>
            </div>
            <!-- DI -->
            <div v-if="instrument.idBroughtDi" class="_multi-box">
              <div class="_flex-multi-inner">
                <p class="_multi-sub_title-blue">DI</p>
                <p class="text">持込み有り</p>
                <p class="text">{{instrument.di.brand}}</p>
                <p class="text">{{instrument.di.model}}</p>
              </div>
            </div>
            <!-- ドラム -->
            <div v-if="instrument.type === 'ドラム'" class="_multi-box">
              <div class="_flex-multi-inner">
                <p class="_multi-sub_title-blue">会場レンタル機材</p>
                <div v-for="item in instrument.drum.rent" :key="item">
                  <p v-if="item.use" class="text">{{item.text}}</p>
                </div>
              </div>
            </div>
            <div v-if="instrument.type === 'ドラム'" class="_multi-box">
              <div class="_flex-multi-inner">
                <p class="_multi-sub_title-blue">持込み機材</p>
                <p class="text">{{instrument.drum.bring}}</p>
              </div>
            </div>
            <div v-if="instrument.type === 'ドラム' && instrument.isSyncForDrum" class="_multi-box">
              <div class="_flex-multi-inner">
                <p class="_multi-sub_title-blue">同期</p>
                <p class="text">{{instrument.syncForDrum.type}}</p>
                <p class="text">チャンネル：{{instrument.syncForDrum.channel}}</p>
                <p class="text">アウト端子：{{instrument.syncForDrum.terminal}}</p>
                <p class="text">配置：{{instrument.syncForDrum.site}}</p>
              </div>
            </div>
            <div v-if="instrument.type === 'ドラム' && !instrument.isSyncForDrum" class="_multi-box">
              <div class="_flex-multi-inner">
                <p class="_multi-sub_title-blue">同期</p>
                <p class="text">無し</p>
              </div>
            </div>
            <!-- パーカッション -->
            <div v-if="instrument.type === 'パーカッション'" class="_multi-box">
              <div class="_flex-multi-inner">
                <p class="_multi-sub_title-blue">会場レンタル機材</p>
                <div v-for="item in instrument.percussion.bring" :key="item">
                  <p v-if="item.use" class="text">{{item.text}}</p>
                </div>
              </div>
            </div>
            <!-- キーボード -->
            <div v-if="instrument.type === 'キーボード'" class="_multi-box">
              <div class="_flex-multi-inner">
                <p class="_multi-sub_title-blue">キーボード（レンタル）</p>
                  <p v-if="instrument.isRentedKeyboard" class="text">{{instrument.rentKeyboard.number}}台</p>
                  <p v-else class="text">無し</p>
              </div>
            </div>
            <div v-if="instrument.type === 'キーボード'" class="_multi-box">
              <div class="_flex-multi-inner">
                <p class="_multi-sub_title-blue">キーボード（持込み）</p>
                <div v-if="instrument.bringKeyboardLists.length !== 0">
                  <div v-for="(item, index) in instrument.bringKeyboardLists" :key="item">
                    <p class="text">{{item.name}}</p>
                    <p class="text">チャンネル：{{item.channel}}</p>
                    <p class="text" :class="{'_marginS': index !== instrument.bringKeyboardLists.length - 1}">アウト端子：{{item.terminal}}</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- バイオリン -->
            <div v-if="instrument.type === 'バイオリン'" class="_multi-box">
              <div class="_flex-multi-inner">
                <p class="_multi-sub_title-blue">PAへのラインアウト</p>
                <p class="text">アウト端子：{{instrument.lineOutForViolin.terminal}}</p>
                <p v-if="instrument.lineOutForViolin.isDi" class="text">DI持込み有り</p>
                <p v-else class="text">DI持込み無し</p>
              </div>
            </div>

            <!-- 楽器用マイク -->
            <div v-if="tag(instrument.type) === 'BRASS' || instrument.type === 'その他' " class="_multi-box">
              <div class="_flex-multi-inner">
                <p class="_multi-sub_title-blue">楽器用マイク</p>
                <div v-if="instrument.isBroughtMicForInstrument">
                  <p class="text">持込み有り</p>
                  <p class="text">{{instrument.micForInstrument.type}}</p>
                  <p class="text">メーカー：{{instrument.micForInstrument.brand}}</p>
                  <p class="text">メーカー：{{instrument.micForInstrument.model}}</p>
                </div>
                <p v-else class="text">持込み無し</p>
              </div>
            </div>
            <!-- ラインアウト -->
            <div v-if="instrument.type === 'DJ' || instrument.type === 'その他'" class="_multi-box">
              <div class="_flex-multi-inner">
                <p class="_multi-sub_title-blue">PAへのラインアウト</p>
                <div v-if="instrument.lineOutLists.length !== 0">
                  <div v-for="(item, index) in instrument.lineOutLists" :key="item">
                    <p class="text">{{item.name}}</p>
                    <p class="text">チャンネル：{{item.channel}}</p>
                    <p class="text" :class="{'_marginS': index !== instrument.lineOutLists.length - 1}">アウト端子：{{item.terminal}}</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- 同期 -->
            <div v-if="instrument.type !== 'ドラム' && instrument.type !== 'バイオリン' && tag(instrument.type) !== 'BRASS' && instrument.isSync" class="_multi-box">
              <div class="_flex-multi-inner">
                <p class="_multi-sub_title-blue">同期</p>
                <p class="text">{{instrument.sync.type}}</p>
                <p class="text">チャンネル：{{instrument.sync.channel}}</p>
                <p class="text">アウト端子：{{instrument.sync.terminal}}</p>
              </div>
            </div>
            <!-- イヤモニ -->
            <div v-if="instrument.isBroughtMonitor" class="_multi-box">
              <div class="_flex-multi-inner">
                <p class="_multi-sub_title-blue">イヤモニ</p>
                <p class="text">持込み有り</p>
                <p class="text">{{instrument.monitor.type}}</p>
                <p class="text">チャンネル：{{instrument.monitor.channel}}</p>
                <p class="text">アウト端子：{{instrument.monitor.terminal}}</p>
              </div>
            </div>
            <!-- 電源 -->
            <div class="_multi-box _multi-box-end">
              <div class="_flex-multi-inner _multi-inner-end">
                <p class="_multi-sub_title-blue">足元電源</p>
                <p v-if="instrument.isPower" class="text">有り</p>
                <p v-else class="text">無し</p>
              </div>
            </div>
            <!-- 備考 -->
            <!-- <div class="_multi-box _multi-box-end">
              <div class="_flex-multi-inner _multi-inner-end">
                <p class="_multi-sub_title-blue">備考</p>
                <p>{{instrument.text}}</p>
              </div>
            </div> -->
          </div>
        </div>
    
        <div v-if="band.text !== null" class="_container">
          <div class="_label-white">その他、要望</div>
          <div class="_box">
            <div class="_inner">
              <div class="_textarea">{{band.text}}</div>
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
import StageLayout from '@/components/stagePlot/StageLayout.vue'
import Helper from '@/components/Helper.vue'

import Band from '@/class/Band.js'

import db from '@/firebase/modules/db.js'

export default {
  name: 'SetList',
  components: {
    SubHeader,
    Footer,
    StageLayout,
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

      band: new Band(),
      isBandFetched: false,

      helper:{
        note:{
          title:"プロット詳細",
          text:"作成したステージプロットの各詳細が表示されます。"
        },
      }
    }
  },
  created(){
    this._authCheck()
    db.getBand(this.$route.params.id)
    .then((doc)=>{
      this.band = doc.data()
      this._userCheck(this.band.userId)
      this.isBandFetched = true
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
      this.$router.push({name: 'EditBand', params:{id: this.band.id}})
    },
    goExport(){
      this.$store.commit('data/setExportBand', this.band)
      this.$router.push({name: 'ExportBand', params:{id: this.band.id}})
    },
    tag(type){
      let tag = "NONE"
      if(type === "ボーカル" || type === "コーラス" || type === "MC"){
        tag = "VOCAL"
      }else if(type === "サックス" || type === "トランペット" || type === "トロンボーン"){
        tag = "BRASS"
      }
      return tag
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
.text{

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