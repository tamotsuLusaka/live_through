<template>
  <div class="_base">
    <Spinner v-if="inactiveButton"></Spinner>
    <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="content">
      <img src="@/assets/images/logo-c.png" alt="" class="logo">
      <p class="_description _marginS">【PDF書き出し】でステージプロットが完成します。<br>※作成されたPDFはサイト上に保存されません。ご使用端末に保存して下さい。</p>
      <div class="_button-container">
        <button :disabled="inactiveButton" @click="exportPDF()" class="_button-s _marginM">PDF書き出し</button>
        <p class="_description _marginS">※PDF書き出し保存がうまくいかない場合は下記【画像を表示】でJPEG画像が表示されます。表示された画像を保存して下さい。</p>
        <button :disabled="inactiveButton" @click="viewImage()" class="_button-s">画像を表示</button>
      </div>

      <!-- <a id="download" target="_blank">ダウンロードスイッチ</a> -->
      <div class="render-container">
        <img  v-show="isView" id="renderSpace" class="render-space" :src="renderImage">
        <img  v-show="isView2" id="renderSpace2" class="render-space" :src="renderImage2">
      </div>

      <!-- 1ページ構成 -->

      <div id="band-pdf-single"  class="pdf">
        <div class="title">
          <p class="title-name t-l">{{userName}}</p>
          <p class="title-sub t-m">Stage Plot</p>
        </div>
        <div class="head">
          <div class="t-m red">※赤字は持込みになります。</div>
          <div class="day t-s">{{exportPreparation.date.year}}.{{exportPreparation.date.month}}.{{exportPreparation.date.day}}</div>
        </div>
        

        <div class="stage">
          <div v-for="instrument in band.lists" :key="instrument.id" class="stage-container">
            <div class="box" v-if="instrument.type !== 'ドラム'" :style="{'top': `${100 / 9 * instrument.position.y}%`, 'left': `${100 / 15 * instrument.position.x}%`, 'width': `${100 / 15 * instrument.position.xSpan}%`, 'height': `${100 / 9 * instrument.position.ySpan}%`}">
              <div class="box-info">
                <div class="box-left">
                  <div class="box-left-top">
                    <p v-if="instrument.vocal.part === 'ボーカル'" class="t-s bold">Vocal</p>
                    <p v-if="instrument.type !== 'ボーカル' && instrument.type !== 'その他' " class="t-s bold">{{$store.getters['select/getInstrumentPlot'](instrument.type)}}</p>
                    <p v-if="instrument.type === 'その他' " class="t-s bold">{{instrument.etc}}</p>
                    <p v-if="instrument.type !== 'コーラス' && instrument.vocal.part === 'コーラス'" class="box-text t-s bold">Cho</p>
                    <p class="t-s">{{instrument.member}}</p>
                    <p v-if="instrument.isLineOutForAcousticGuitar" class="t-s">楽器アウト:<br>{{$store.getters['select/getAcousticGuitarPlot'](instrument.acousticGuitar.type)}}</p>
                  </div>
                  <div class="box-left-bottom">
                    <div v-if="instrument.isSync" class="sync">
                      <img v-if="instrument.sync.type === 'PC'" src="@/assets/images/stage-tag-pc.png" class="box-tag" alt="">
                      <img v-if="instrument.sync.type === 'MTR'" src="@/assets/images/stage-tag-mtr.png" class="box-tag" alt="">
                      <img v-if="instrument.sync.type === 'その他'" src="@/assets/images/stage-tag-other.png" class="box-tag" alt="">
                      <p class="t-s">{{$store.getters['select/getChannelForSyncPlot'](instrument.sync.channel)}}:{{$store.getters['select/getTerminalPlot'](instrument.sync.terminal)}}</p>
                    </div>
                  </div>
                </div>
                <div class="box-center">
                  <img src="@/assets/images/stage-person.png" class="box-person" alt="">
                  <img v-if="instrument.isVocal" src="@/assets/images/stage-mic.png" class="box-mic" alt="">
                </div>
                <div class="box-right">
                  <div class="box-right-top">
                    <p v-if="instrument.isBroughtMic" class="t-s red">[持込]</p>
                    <p v-if="instrument.isBroughtMic" class="box-text-hide t-s red box-margin">{{instrument.mic.model}}</p>
                    <p v-if="instrument.isBroughtMicForInstrument" class="t-s red">楽器Mic:<span v-if="instrument.micForInstrument.type === '有線'">有線</span><span v-else>W/L</span></p>
                    <p v-if="instrument.isBroughtMicForInstrument" class="box-text-hide t-s red box-margin">{{instrument.micForInstrument.model}}</p>
                    <p v-if="instrument.isBroughtMonitor" class="t-s red">IEM:<span v-if="instrument.monitor.type === '有線'">有線</span><span v-else>W/L</span></p>
                    <p v-if="instrument.isBroughtMonitor" class="box-text-hide t-s red">{{$store.getters['select/getChannelPlot'](instrument.monitor.channel)}}</p>
                  </div>
                  <div class="box-right-bottom">
                    <img v-if="instrument.isPower" src="@/assets/images/stage-tag-v.png" class="box-tag" alt="">
                  </div>
                </div>
              </div>
              <div class="box-monitor">
                <img v-if="instrument.vocal.part === 'コーラス' && instrument.vocal.monitor === 2" src="@/assets/images/stage-monitor2.png" alt="">
                <img v-else-if="instrument.vocal.part === 'ボーカル'" src="@/assets/images/stage-monitor2.png" alt="">
                <img v-else src="@/assets/images/stage-monitor1.png" alt="">
              </div>
            </div>
            <div class="box amp-box" v-if="instrument.isAmp" :style="{'top': `${100 / 9 * instrument.amp.position.y}%`, 'left': `${100 / 15 * instrument.amp.position.x}%`, 'width': `${100 / 15 * instrument.amp.position.xSpan}%`, 'height': `${100 / 9 * instrument.amp.position.ySpan}%`}">
              <p v-if="instrument.amp.type === 'rent'" class="amp-box-text t-s">Head&amp;Cabi<br>レンタル</p>
              <p v-if="instrument.amp.type === 'rentCombo'" class="amp-box-text t-s">Combo<br>レンタル</p>
              <p v-if="instrument.amp.type === 'head'" class="amp-box-text t-s"><span class="red">Head持込</span><br>Cabiレンタル</p>
              <p v-if="instrument.amp.type === 'cab'" class="amp-box-text t-s">Headレンタル<br><span class="red">Cabi持込</span></p>
              <p v-if="instrument.amp.type === 'head&cab'" class="amp-box-text t-s red">Head&amp;Cabi<br>持込</p>
              <p v-if="instrument.amp.type === 'combo'" class="amp-box-text t-s red">Combo<br>持込</p>
              <div class="amp-box-box">
                <div class="amp-box-title">{{$store.getters['select/getInstrumentValue'](instrument.type)}}.AMP</div>
                <div v-if="instrument.idBroughtDi" class="amp-box-di t-s red">[持込]DI</div>
              </div>
            </div>
            <div class="box drum-box" v-if="instrument.type === 'ドラム'" :style="{'top': `${100 / 9 * instrument.position.y}%`, 'left': `${100 / 15 * instrument.position.x}%`, 'width': `${100 / 15 * instrument.position.xSpan}%`, 'height': `${100 / 9 * instrument.position.ySpan}%`}">
              <div class="drum-box-info">
                <div class="drum-box-left">
                  <p v-if="instrument.vocal.part === 'ボーカル'" class="t-s bold">Vocal</p>
                  <p class="t-s bold">{{$store.getters['select/getInstrumentPlot'](instrument.type)}}</p>
                  <p v-if="instrument.type !== 'コーラス' && instrument.vocal.part === 'コーラス'" class="box-text t-s bold">Cho</p>
                  <p class="t-s">{{instrument.member}}</p>
                </div>
                <div class="drum-box-center">
                  <img src="@/assets/images/stage-person.png" class="drum-person" alt="">
                  <p class="t-m">{{instrument.drum.tom}}TOM</p>
                </div>
                <div class="drum-box-right">
                  <img v-if="instrument.isVocal" src="@/assets/images/stage-mic.png" class="drum-box-mic" alt="">
                  <img src="@/assets/images/stage-monitor-drum.png" class="drum-box-monitor" alt="">
                </div>
                <div :class="{'drum-box-more-left': instrument.syncForDrum.site === '左側', 'drum-box-more-right': instrument.syncForDrum.site === '右側'}" class="drum-box-more">
                  <img v-if="instrument.isPower" src="@/assets/images/stage-tag-v.png" class="box-tag" alt="">
                  <div v-if="instrument.isSyncForDrum" class="sync  box-margin">
                    <img v-if="instrument.syncForDrum.type === 'PC'" src="@/assets/images/stage-tag-pc.png" class="box-tag" alt="">
                    <img v-if="instrument.syncForDrum.type === 'MTR'" src="@/assets/images/stage-tag-mtr.png" class="box-tag" alt="">
                    <img v-if="instrument.syncForDrum.type === 'その他'" src="@/assets/images/stage-tag-other.png" class="box-tag" alt="">
                    <p class="t-s">{{$store.getters['select/getChannelForSyncPlot'](instrument.syncForDrum.channel)}}:{{$store.getters['select/getTerminalPlot'](instrument.syncForDrum.terminal)}}</p>
                  </div>
                  <p class="t-s red">[持込]</p>
                  <p v-if="instrument.isBroughtMic" class="box-text-hide t-s red box-margin">{{instrument.mic.model}}</p>
                  <p v-if="instrument.isBroughtMonitor" class="t-s red">IEM:<span v-if="instrument.monitor.type === '有線'">有線</span><span v-else>W/L</span></p>
                  <p v-if="instrument.isBroughtMonitor" class="box-text-hide t-s red">{{$store.getters['select/getChannelPlot'](instrument.monitor.channel)}}</p>
                </div>
              </div>
              <div class="drum-box-bring">
                <p class="t-s red">持込：{{instrument.drum.bring}}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="info">
          <div class="info-container">
            <p class="info-title">会場レンタル</p>
            <div class="info-box">
              <div v-for="instrument in band.lists" :key="instrument.id">
                <div class="info-instrument">
                  <span v-if="instrument.type !== 'ボーカル' && instrument.vocal.part === 'ボーカル'">Vocal. </span>
                  <span v-if="instrument.type !== 'その他'">{{$store.getters['select/getInstrumentPlot'](instrument.type)}}</span>
                  <span v-if="instrument.type === 'その他'">{{instrument.etc}}</span>
                  <span v-if="instrument.type !== 'コーラス' && instrument.vocal.part === 'コーラス'">.Chorus</span>
                  <span>/{{instrument.member}}：</span>
                  <!-- DI -->
                  <span v-if="instrument.type === 'ベース' || instrument.isLineOutForAcousticGuitar" class="info-t"><span v-if="instrument.idBroughtDi">DI </span></span>
                  <span v-if=" instrument.type === 'キーボード' && instrument.rentKeyboard !== null" class="info-t">DI </span>
                  <span v-if="instrument.type === 'バイオリン' && !instrument.lineOutForViolin.isDi" class="info-t">DI </span>
                  <span v-if="instrument.lineOutLists.length !== 0" class="info-t"><span v-if="!diCheck(instrument.lineOutLists)">DI </span></span>
                  <span v-if="instrument.bringKeyboardLists.length !== 0" class="info-t"><span v-if="!diCheck(instrument.bringKeyboardLists)">DI </span></span>
                  <!-- アンプ -->
                  <span v-if="instrument.amp.type === 'rent'" class="info-t">{{$store.getters['select/getAmpPlotRent'](instrument.amp.type)}}</span>
                  <span v-if="instrument.amp.type === 'rentCombo'" class="info-t">{{$store.getters['select/getAmpPlotRent'](instrument.amp.type)}}</span>
                  <span v-if="instrument.amp.type === 'head'" class="info-t">{{$store.getters['select/getAmpPlotRent'](instrument.amp.type)}}</span>
                  <span v-if="instrument.amp.type === 'cab'" class="info-t">{{$store.getters['select/getAmpPlotRent'](instrument.amp.type)}}</span>
                  <!-- キーボード -->
                  <span v-if="instrument.rentKeyboard.number !== null">Keyboard×{{instrument.rentKeyboard.number}}</span>
                  <!-- ドラム -->
                  <span v-if="instrument.type === 'ドラム'"><span v-for="item in instrument.drum.rent" :key="item"><span v-if="item.use">{{item.plot}}, </span></span></span>
                </div>
              </div>
            </div>
          </div>
          <div class="info-container">
            <p class="info-title">持込み機材</p>
            <div class="info-box">
              <div v-for="instrument in band.lists" :key="instrument.id">
                <div class="info-instrument">
                  <span v-if="instrument.type !== 'ボーカル' && instrument.vocal.part === 'ボーカル'">Vocal、</span>
                  <span v-if="instrument.type !== 'その他'">{{$store.getters['select/getInstrumentPlot'](instrument.type)}}/</span>
                  <span v-if="instrument.type === 'その他'">{{instrument.etc}}/</span>
                  <span>{{instrument.member}}：</span>
                  <!-- マイク -->
                  <span v-if="instrument.isBroughtMic" class="info-t">[Mic] <span v-if="instrument.mic.type !== '有線'">{{$store.getters['select/getLinePlot'](instrument.mic.type)}}-</span>{{instrument.mic.brand}}/{{instrument.mic.model}}</span>
                  <!-- 楽器マイク -->
                  <span v-if="instrument.isBroughtMicForInstrument" class="info-t">[楽器Mic] <span v-if="instrument.micForInstrument.type !== '有線'">{{$store.getters['select/getLinePlot'](instrument.micForInstrument.type)}}-</span>{{instrument.micForInstrument.brand}}/{{instrument.micForInstrument.model}}</span>
                  <!-- アコギ -->
                  <span v-if="instrument.isLineOutForAcousticGuitar" class="info-t">[Out] {{$store.getters['select/getAcousticGuitarPlot'](instrument.acousticGuitar.type)}}-{{instrument.acousticGuitar.text}}</span>
                  <!-- DI -->
                  <span v-if="instrument.type === 'ベース' || instrument.isLineOutForAcousticGuitar" class="info-t"><span v-if="instrument.idBroughtDi">[DI] {{instrument.di.brand}}/{{instrument.di.model}}</span></span>
                  <span v-if=" instrument.type === 'キーボード' && instrument.bringKeyboardLists.length !== 0" class="info-t"><span v-for="item in instrument.bringKeyboardLists" :key="item">[Keyboard]{{item.name}}-{{$store.getters['select/getChannelPlot'](item.channel)}}-{{$store.getters['select/getTerminalPlot'](item.terminal)}}<span v-if="item.isDi">-DI</span></span></span>
                  <span v-if="instrument.type === 'バイオリン' && instrument.lineOutForViolin.isDi" class="info-t">[DI]</span>
                  <!-- ラインアウト -->
                  <span v-if="instrument.lineOutLists.length !== 0" class="info-t"><span v-for="item in instrument.lineOutLists" :key="item">[Line out]{{item.name}}-{{$store.getters['select/getChannelPlot'](item.channel)}}-{{$store.getters['select/getTerminalPlot'](item.terminal)}}<span v-if="item.isDi">-DI</span></span></span>
                  <!-- キーボード -->
                  <span v-if="instrument.bringKeyboardLists.length !== 0" class="info-t"><span v-for="item in instrument.bringKeyboardLists" :key="item">[Keyboard] {{item.name}}-{{$store.getters['select/getChannelPlot'](item.channel)}}-{{$store.getters['select/getTerminalPlot'](item.terminal)}}<span v-if="item.isDi">-DI</span></span></span>
                  <span v-if="instrument.ampForKeyboard.type === '持込み'">[Amp]</span>
                  <!-- アンプ -->
                  <span v-if="instrument.amp.type === 'head'" class="info-t">{{$store.getters['select/getAmpPlotBring'](instrument.amp.type)}}&nbsp;{{instrument.amp.brandOfHead}}/{{instrument.amp.modelOfHead}}</span>
                  <span v-if="instrument.amp.type === 'cab'" class="info-t">{{$store.getters['select/getAmpPlotBring'](instrument.amp.type)}}&nbsp;{{instrument.amp.brandOfCab}}/{{instrument.amp.modelOfCab}}</span>
                  <span v-if="instrument.amp.type === 'combo'" class="info-t">{{$store.getters['select/getAmpPlotBring'](instrument.amp.type)}}&nbsp;{{instrument.amp.brandOfCombo}}/{{instrument.amp.modelOfCombo}}</span>
                  <span v-if="instrument.amp.type === 'head&cab'" class="info-t">[Amp Head]&nbsp;{{instrument.amp.brandOfHead}}/{{instrument.amp.modelOfHead}} [Amp Cabi]&nbsp;{{instrument.amp.brandOfCab}}/{{instrument.amp.modelOfCab}}</span>
                  <!-- ドラム -->
                  <span v-if="instrument.type === 'ドラム' && instrument.drum.bring !== null" class="info-t">[DrSet] {{instrument.drum.bring}}</span>
                  <!-- パーカッション -->
                  <span v-if="instrument.type === 'パーカッション'" class="info-t">[Percussion]<span v-for="item in instrument.percussion.bring" :key="item"><span v-if="item.use">{{item.plot}}, <span>{{instrument.percussion.other}}</span></span></span></span>
                  <!-- 同期 -->
                  <span v-if="instrument.isSync" class="info-t">[同期] {{instrument.sync.type}}-{{$store.getters['select/getChannelForSyncPlot'](instrument.sync.channel)}}-{{$store.getters['select/getTerminalPlot'](instrument.sync.terminal)}}</span>
                  <span v-if="instrument.isSyncForDrum" class="info-t">[同期] {{instrument.syncForDrum.type}}-{{$store.getters['select/getChannelForSyncPlot'](instrument.syncForDrum.channel)}}-{{$store.getters['select/getTerminalPlot'](instrument.syncForDrum.terminal)}}</span>
                  <!-- イヤモニ -->
                  <span v-if="instrument.isBroughtMonitor" class="info-t">[IEM] {{$store.getters['select/getLineForMonitorPlot'](instrument.monitor.type)}}-{{$store.getters['select/getChannelPlot'](instrument.monitor.channel)}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="note">
          <div class="note-left">
            <p>備考：{{band.text}}</p>
          </div>
          <div class="note-right">
            <img src="@/assets/images/logo.png" class="pdf-logo" alt="">
          </div>
          
        </div>

      </div>

  
      <!-- 2ページ構成 -->
      <!-- <div id="band-pdf-double-1" class="pdf">

      </div>

      <div id="band-pdf-double-2" class="pdf">

      </div> -->

    </div>
    <Footer></Footer>
  </div>
</template>


<script>
import Mixin from '@/mixin/mixin.js'
import SubHeader from '@/components/SubHeader.vue'
import Spinner from '@/components/Spinner.vue'
import Footer from '@/components/Footer.vue'

import Band from '@/class/Band.js'

import db from '@/firebase/modules/db.js'
import { jsPDF } from 'jspdf'
import * as html2canvas from 'html2canvas'

export default {
  name: 'SetList',
  components: {
    Spinner,
    SubHeader,
    Footer
  },
  mixins:[
    Mixin
  ],
  setup(){

  },
  data(){
    return{
      pageType: "stagePlot",
      pageTitle:"ステージプロットの書き出し",
      isBack: true,
      isPcTitle: false,
      inactiveButton: false,
      errorMessage: "",

      band: new Band(),
      userName: "",

      mainCounter: 0,
      encoreCounter: 0,
      sheetType: "single", // "single" or "double"

      // 2枚構成用リスト
      listsForFirst: [],
      listsForSecond: [],

      daysMax: null,
      exportPreparation:{
        date:{
          year: null,
          month: null,
          day: null
        },
      },
      renderImage: null,
      renderImage2: null,
      isView: false,
      isView2: false,

    }
  },
  async created(){
    this.band = this.$store.getters['data/exportBand']
    await db.getUser(this.$store.getters['auth/userId'])
    .then((doc)=>{
      this.userName = doc.data().name
    })

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
      let imgData2 = null
      // 画像表示を初期化
      let renderSpace = document.getElementById("renderSpace")
      let renderSpace2 = document.getElementById("renderSpace2")
      renderSpace.src = null
      renderSpace2.src = null
      this.isView = false
      this.isView2 = false

      fileName = "stage_plot" + this._generateDay() + ".pdf"
      if(this.sheetType === "single"){
        const source = document.getElementById('band-pdf-single')
        await html2canvas(source, {scale: 2}).then(capture => {
          imgData = capture.toDataURL('image/jpeg')
          doc.addImage(imgData, 'JPEG', 10, 10, width * 0.9, 0)
        })
      }else if(this.sheetType === "double"){
        const source1 = document.getElementById('band-pdf-double-1')
        const source2 = document.getElementById('band-pdf-double-2')
        await html2canvas(source1).then(capture => {
          imgData = capture.toDataURL('image/jpeg')
        })
        await html2canvas(source2).then(capture => {
          imgData2 = capture.toDataURL('image/jpeg')
        })
        doc.addImage(imgData, 'JPEG', 10, 10, width * 0.9, 0)
        doc.addPage()
        doc.addImage(imgData2, 'JPEG', 10, 10, width * 0.9, 0)
      }

      doc.save(fileName)
      this.inactiveButton = false
    },

    async viewImage(){
      this.inactiveButton = true
      this.isView = true
      this.isView2 = true
      let imgData = null
      let imgData2 = null
      let renderSpace = document.getElementById("renderSpace")
      let renderSpace2 = document.getElementById("renderSpace2")
      renderSpace.src = null
      renderSpace2.src = null

      if(this.sheetType === "single"){
        this.isView2 = false
        const source = document.getElementById('band-pdf-single')
        await html2canvas(source).then(capture => {
          imgData = capture.toDataURL('image/jpeg')
        })
      }else if(this.sheetType === "double"){
        const source1 = document.getElementById('band-pdf-double-1')
        const source2 = document.getElementById('band-pdf-double-2')
        await html2canvas(source1).then(capture => {
          imgData = capture.toDataURL('image/jpeg')
        })
        await html2canvas(source2).then(capture => {
          imgData2 = capture.toDataURL('image/jpeg')
        })
      }
      
      renderSpace.src = imgData
      renderSpace2.src = imgData2
      this.inactiveButton = false
    },

    // リストの中にDI持込みがあるかチェック
    diCheck(lists){
      let check = false
      for(let element of lists)
        if(element.isDi){
          check = true
        }
      return check
    }
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
.bold{
  font-weight: 700;
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
}
.title-sub{
  font-weight: 700;
}
.head{
  display: flex;
  justify-content: space-between;
}
.day{

}

.stage{
  position: relative;
  width: 100%;
  height: calc(1100px / 15 * 9);
  border: 2px solid black;
  margin-bottom: 30px;
}
.box{
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  /* border: 1px solid var(--black); */
}
.box-text-hide{
  width: 85px; /* この幅を超えると省略 */
  overflow: hidden;
  white-space: nowrap;
  /* text-overflow: ellipsis; */
}
.box-margin{
  margin-bottom: 5px;
}
.box-info{
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 70%;
}
.box-left{
  width: calc(38% - 5px);
  margin: 5px 0 0 5px;
  position: relative;
}
.box-left-top{
  position: absolute;
  top: 0;
  left: 0;
}
.box-left-bottom{
  position: absolute;
  bottom: 0;
  left: 0;
}
.box-tag{
  width: 35px;
}
.box-center{
  width: 24%;
}
.box-person{
  display: block;
  width: 90%;
  margin: 30px auto 10px;
}
.box-mic{
  display: block;
  width: 40%;
  margin: 20px auto 0;
}
.box-right{
  width: calc(38% - 5px);
  margin: 5px 5px 0 0;
  position: relative;
}
.box-right-top{
  position: absolute;
  top: 0;
  left: 0;
}
.box-right-bottom{
  position: absolute;
  bottom: 0;
  left: 0;
}
.box-monitor{
  width: 100%;
  height: 30%;
}
.box-monitor img{
  display: block;
  width: 70%;
  margin: 0 auto;
}

.drum-box{
  border: 2px solid var(--black);
}
.drum-box-info{
  top: 0;
  left: 0;
  margin: 5px;
  display: flex;
  justify-content: space-between;
}
.drum-box-left{
  width: 25%;
}
.drum-box-center{
  width: 16%;
  text-align: center;
}
.drum-person{
  width: 84%;
  margin: 10px 0 0;
}
.drum-box-right{
  width: 25%;
  position: relative;
}
.drum-box-monitor{
  width: 40px;
  position: absolute;
  right: 0;
  top: 0;
}
.drum-box-mic{
  display: block;
  width: 23px;
  transform: rotateZ(-90deg);
  position: absolute;
  top: -10px;
  right: 70px;
}
.drum-box-more{
  position: absolute;
  top: 50px;
}
.drum-box-more-left{
  left: 100px;
}
.drum-box-more-right{
  right: 30px;
}
.drum-box-bring{
  margin: 150px 10px 5px;
}

.amp-box{
  text-align: center;
}
.amp-box-text{
  white-space: pre-wrap;
  margin: 10px auto 5px;
}
.amp-box-box{
  margin: 0 auto;
  width: 100px;
  height: 80px;
  border: 2px solid var(--black);
  position: relative;
}
.amp-box-title{
  font-size: 15px;
  font-weight: 700;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.amp-box-di{
  position: absolute;
  top: 4px;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}



.info{
  display: flex;
  justify-content: space-between;
}
.info-container{
  width: 50%;
}
.info-title{
  font-weight: 700;
  margin: 0 0 5px 10px;
}
.info-box{
  border-left: 5px solid var(--black);
  height: 630px;
}
.info-instrument{
  margin: 0 0 10px 10px;
  text-align: justify;
}
.info-instrument span{
  font-size: 12px;
}
.info-t{
  margin-right: 10px;
  word-break: break-all;
}

.note{
  height: 60px;
  margin: 10px 0;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
}
.note-left{
  width: 85%;
}
.note-left p{
  text-align: justify;
}
.note-right{
  width: 10%;
}
.pdf-logo{
  display: block;
  margin-top: 40px;
  width: 100%;
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

