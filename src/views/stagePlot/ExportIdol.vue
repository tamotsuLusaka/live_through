<template>
  <div class="_base">
    <Spinner v-if="inactiveButton"></Spinner>
    <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="content">
      <img src="@/assets/images/logo-c.png" alt="" class="logo">
      <p class="_description _marginS">【PDF書き出し】でステージプロットが完成します。<br>※作成されたPDFはサイト上に保存されません。ご使用端末に保存して下さい。</p>
      <div class="_button-container">
        <button :disabled=" inactiveButton" @click="exportPDF()"  class="_button-s _marginM">PDF書き出し</button>
        <p class="_description _marginS">※PDF書き出し保存がうまくいかない場合は下記【画像を表示】でJPEG画像が表示されます。表示された画像を保存して下さい。</p>
        <button :disabled="inactiveButton" @click="viewImage()"  class="_button-s">画像を表示</button>
      </div>

      <!-- <a id="download" target="_blank">ダウンロードスイッチ</a> -->
      <div class="render-container">
        <img  v-show="isView" id="renderSpace" class="render-space" :src="renderImage">
      </div>

      <!-- 1ページ構成 -->

      <div id="pdf"  class="pdf">
        <div class="title">
          <p class="title-name t-l">{{userName}}</p>
          <p class="title-sub t-m">Stage Plot</p>
        </div>
        <div class="day t-s">{{exportPreparation.date.year}}.{{exportPreparation.date.month}}.{{exportPreparation.date.day}}</div>

        <div class="stage">
          <div v-if="isSeparate" class="stage-member lists-second">
            <div v-for="member in secondLists" :key="member" class="stage-member-box">
                <img src="@/assets/images/stage-person.png" alt="" class="stage-member-person">
                <img src="@/assets/images/stage-mic.png" alt="" class="stage-member-mic">
                <p class="stage-member-text">{{member.name}}</p>
                <p v-if="member.micNumber !== null" class="stage-member-text">Mic No.{{member.micNumber}}</p>
            </div>
          </div>
          <div v-if="isSeparate" class="stage-member lists-first">
            <div v-for="member in firstLists" :key="member" class="stage-member-box">
                <img src="@/assets/images/stage-person.png" alt="" class="stage-member-person">
                <img src="@/assets/images/stage-mic.png" alt="" class="stage-member-mic">
                <p class="stage-member-text">{{member.name}}</p>
                <p v-if="member.micNumber !== null" class="stage-member-text">Mic No.{{member.micNumber}}</p>
            </div>
          </div>
          <div v-if="!isSeparate" class="stage-member">
            <div v-for="member in idol.lists" :key="member" class="stage-member-box">
                <img src="@/assets/images/stage-person.png" alt="" class="stage-member-person">
                <img src="@/assets/images/stage-mic.png" alt="" class="stage-member-mic">
                <p class="stage-member-text">{{member.name}}</p>
                <p v-if="member.micNumber !== null" class="stage-member-text">Mic No.{{member.micNumber}}</p>
            </div>
          </div>

          <div class="stage-bottom">
            <img v-for="n in 4" :key="n" src="@/assets/images/stage-monitor1.png" alt="">
          </div>
          <div class="stage-side">
            <img src="@/assets/images/stage-monitor-drum.png" class="stage-left" alt="">
            <img src="@/assets/images/stage-monitor-drum.png" class="" alt="">
          </div>
        </div>

        <div class="info">
          <div class="info-container">
            <div class="info-box">
              <p v-if="idol.isBroughtMic" class="info-t">ワイヤレスマイク：{{$store.getters['select/getLinePlot'](idol.mic.type)}}<span v-if="idol.mic.text !== null">-{{idol.mic.text}}</span></p>
              <p v-if="!idol.isBroughtMic" class="info-t">ワイヤレスマイク：持込み無し（主催レンタル）</p>
              <p class="info-t">音源：<span v-if="idol.source.type === 'その他'">{{idol.source.other}}</span><span v-else>{{idol.source.type}}</span>-{{$store.getters['select/getChannelPlot'](idol.source.channel)}}-{{$store.getters['select/getTerminalPlot'](idol.source.terminal)}}</p>
              <p v-if="idol.isMonitor" class="info-t">IEM：<span v-if="idol.isBroughtMonitor">{{idol.source.other}}持込み{{$store.getters['select/getLinePlot'](idol.monitor.type)}}-{{$store.getters['select/getChannelPlot'](idol.monitor.channel)}}</span><span v-else>持込み無し</span></p>
              <p v-else class="info-t">IEM：無し</p>
            </div>
          </div>
        </div>

        <div class="note">
          <p>備考：{{idol.text}}</p>
        </div>

        <img src="@/assets/images/logo.png" class="pdf-logo" alt="">

      </div>

    </div>
    <Footer></Footer>
  </div>
</template>


<script>
import Mixin from '@/mixin/mixin.js'
import SubHeader from '@/components/SubHeader.vue'
import Spinner from '@/components/Spinner.vue'
import Footer from '@/components/Footer.vue'

import Idol from '@/class/Idol.js'

import db from '@/firebase/modules/db.js'
import { jsPDF } from 'jspdf'
import * as html2canvas from 'html2canvas'


export default {
  name: 'ExportIdol',
  components: {
    Spinner,
    SubHeader,
    Footer
  },
  mixins:[
    Mixin
  ],
  data(){
    return{
      pageType: "stagePlot",
      pageTitle:"ステージプロットの書き出し",
      isBack: true,
      isPcTitle: false,
      inactiveButton: false,
      errorMessage: "",

      idol: new Idol(),
      userName: "",

      mainCounter: 0,
      encoreCounter: 0,
      sheetType: "single", // "single" or "double"
      isSeparate: false,
      firstLists: [],
      secondLists: [],

      daysMax: null,
      exportPreparation:{
        date:{
          year: null,
          month: null,
          day: null
        },
      },
      renderImage: null,
      isView: false,

      // 楽器に番号振ろうとした残骸
      // instrumentNameLists:[],
      // overlapLists:[],
      // overlapObjectLists: [],
    }
  },
  async created(){
    this.idol = this.$store.getters['data/exportIdol']
    this._userCheck(this.idol.userId)
    await db.getUser(this.$store.getters['auth/userId'])
    .then((doc)=>{
      this.userName = doc.data().name
    })

    if(this.idol.lists.length > 8){
      this.isSeparate = true
      this.idol.lists.forEach((member, index) => {
        if(index < 8){
          this.firstLists.push(member)
        }else{
          this.secondLists.push(member)
        }
      })
    }
    const today = new Date()
    this.exportPreparation.date.year = today.getFullYear()
    this.exportPreparation.date.month = today.getMonth()+1
    this.exportPreparation.date.day = today.getDate()
  },
  mounted(){
    
  },
  methods:{
        
    async exportPDF(){
      this.inactiveButton = true
      const doc = new jsPDF({format: 'a4'})
      const width = doc.internal.pageSize.width
      let fileName = ""
      let imgData = null
      // 画像表示を初期化
      let renderSpace = document.getElementById("renderSpace")
      renderSpace.src = null
      this.isView = false

      fileName = "stage_plot" + this._generateDay() + ".pdf"

      const source = document.getElementById('pdf')
      await html2canvas(source).then(capture => {
        imgData = capture.toDataURL('image/jpeg')
        doc.addImage(imgData, 'JPEG', 10, 10, width * 0.9, 0)
      })

      doc.save(fileName)
      this.inactiveButton = false
    },

    async viewImage(){
      this.inactiveButton = true
      this.isView = true
      let imgData = null
      let renderSpace = document.getElementById("renderSpace")
      renderSpace.src = null

      const source = document.getElementById('pdf')
      await html2canvas(source).then(capture => {
        imgData = capture.toDataURL('image/jpeg')
      })
      
      renderSpace.src = imgData
      this.inactiveButton = false
    },

  },
  computed:{

  },
  watch:{

  },

}

</script>

<style scoped>
.logo{
  display: block;
  margin: 100px auto;
  width: 70%;
}
.t-ss{
  font-size: 10px;
}
.t-s{
  font-size: 12px;
  word-break: break-all;
}
.t-m{
  font-size: 15px;
}
.t-l{
  font-weight: 700;
  font-size: 36px;
}
.red{
  color: var(--red);
}
.content{
  width: 90%;
  min-height: calc(100% - 50px);
  padding:90px 0 0;
  margin: 0 auto;
}

.pdf{
  position: fixed;
  top: 105%;
  left: 0;
  z-index: 100;
  width: 1100px;
  height: 1555px;
  /* 偽物 */
  /* height: 2555px; */
  max-width: none;
  max-height: none;
  min-height: none;
  padding: 5px;
  background-color: var(--white);
}

.title{
  padding: 30px 0 10px;
  text-align: center;
}
.title-name{
  margin-bottom: 10px;
}
.title-sub{
  font-weight: 700;
}
.day{
  text-align: right;
}

.stage{
  position: relative;
  width: 100%;
  height: calc(1100px / 15 * 9);
  border: 1px solid black;
  margin-bottom: 30px;
}
.stage-side{
  position: absolute;
  top: 60%;
  left: 50%;
  width: 96%;
  display: flex;
  justify-content: space-between;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}
.stage-left{
  -webkit-transform: rotateZ(-180deg);
  transform: rotateZ(-180deg);
}
.stage-bottom{
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content:space-between;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}
.stage-bottom img{
  display: block;
}
.stage-member{
  margin: 300px auto 0;
  width: 83%;
  display: flex;
  justify-content: space-around;
}
.lists-second{
  margin: 160px auto 0;
}
.lists-first{
  margin: 60px auto 0;
}
.stage-member-box{
  display: block;
  width: 90px;
}
.stage-member-person{
  width: 100%;
  margin-bottom: 0;
}
.stage-member-mic{
  width: 20%;
  display: block;
  margin: 0 auto 10px;
}
.stage-member-text{
  font-size: 13px;
}

.info{
  display: flex;
  justify-content: space-between;
}
.info-container{
  width: 100%;
}
.info-title{
  font-weight: 700;
  margin: 0 0 5px 10px;
}
.info-box{
  border-left: 5px solid var(--black);
  height: 400px;
}
.info-instrument{
  margin: 0 0 10px 10px;
}
.info-instrument span{
  font-size: 12px;
}
.info-t{
  margin:0 0 10px 5px;
  word-break: break-all;
}

.note{
  margin: 10px 0;
  font-size: 15px;
}
.pdf-logo{
  position: absolute;
  bottom: 20px;
  right: 10px;
  display: block;
  width: 150px;
}
.render-space{
  width: 100%;
  height: auto;
  margin-bottom: 30px;
}

@media screen and (min-width:600px){
  .content{
    padding:50px 0 0;
    max-width: 600px;
    height:auto;
    margin-bottom: 100px;
    min-height: calc(100vh - 250px);
  }

}

</style>

