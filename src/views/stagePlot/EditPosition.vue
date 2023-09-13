<template>
  <div class="_base">
    <Spinner v-if="inactiveButton"></Spinner>
    <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content">
      <div class="_container">
        <label class="_label">パート配置図</label>
        <Helper :helperObject="helper.tune"></Helper>
        <template v-if="isBandFetched">

      <!-- ToDo: Booleanでの受け取りがうまくいかないのでStringで"true"/"false"を受け取る -->
          <StageLayout :mode="isAmp === 'true' ? 'editAmp' : 'editInst'" :band="band" :instrument="instrument" @instChanged="instChanged($event)"></StageLayout>
        </template>
      </div>
    </div>
    <Footer></Footer>
    <Alert :isShown="isAlertShown" :text="alertText" @closeAlert="closeAlert()"></Alert>
  </div>
</template>

<script>
import Mixin from '@/mixin/mixin.js'
import SubHeader from '@/components/SubHeader.vue'
import Spinner from '@/components/Spinner.vue'
import Helper from '@/components/Helper.vue'
import Alert from '@/components/Alert.vue'
import Footer from '@/components/Footer.vue'
import StageLayout from '@/components/stagePlot/StageLayout.vue'
import db from '@/firebase/modules/db.js'

export default {
  components: {
    SubHeader,
    Spinner,
    Helper,
    Alert,
    StageLayout,
    Footer
  },
  mixins:[
    Mixin,
  ],
  props: {
    isAmp: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      pageType: "editPlot",
      pageTitle: "配置",
      band: {},
      instrument: {},
      isBandFetched: false,
      inactiveButton: false,
      isBack: true,
      isPcTitle: true,
      isAlertShown: false,
      alertText: "",
      helper:{
        tune:{
          id:"tune",
          text:"十字ボタンをタップしてパートを配置したい箇所に動かしてください。"
        }
      }
    }
  },
  created() {
    this._authCheck()
    db.getBand(this.$route.params.id)
    .then((doc)=>{
      this.band = doc.data()
      this._userCheck(this.band.userId)
      this.isBandFetched = true
    })
    .catch((error)=>{
      this.errorMessage = "データの取得に失敗しました。"
      console.log(error.message)
    })

    //全画面からinstrumentインスタンスをstore経由で受け取る
    if(this.$store.getters["data/instrument"] != null) {
      this.instrument = this.$store.getters["data/instrument"]
    } else {
      this.alertText = "楽器情報を読み込めませんでした。"
      this.isAlertShown = true
      this._stop(true)
    }
  },
  methods: {
    closeAlert() {
      this.isAlertShown = false
      this._stop(false)
      this.$router.back()
    },
    instChanged(event) {
      if(typeof event === 'object') {
        //event経由で変更済みInstrumentインスタンスを受け取る
        this.instrument = event

        //全画面へ戻る際に、Store経由でInstrumentインスタンスを受け渡す
        this.$store.commit('data/setInstrument', this.instrument)
        this.$router.back()
      } else {
        this.alertMessage = "楽器情報の取得に失敗しました。"
        this.isAlertShown = true
      }
    }
  }
}
</script>