<template>
  <div class="_base">
    <Spinner v-if="inactiveButton"></Spinner>
    <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="content">
      <img src="@/assets/images/logo-c.png" alt="" class="logo">
      <div class="_container">
        <p class="_label">作成日</p>
        <div class="_multi-box _multi-box-start">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="exportPreparation.date.year" @blur="v$.exportPreparation.date.year.$touch()" required :class="{'_input-select-exist': exportPreparation.date.year !== null}" class="_multi-select" >
              <option :value="null" disabled >年</option>
              <option v-for="n in 30" :key="n" :value="n + 2021" :style="{'color': '#131313'}" >{{n + 2021}}年</option>
            </select>
          </div>
        </div>
        <div class="_multi-box">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="exportPreparation.date.month" @blur="v$.exportPreparation.date.month.$touch()" required :class="{'_input-select-exist': exportPreparation.date.month !== null}" class="_multi-select" >
              <option :value="null" disabled >月</option>
              <option v-for="n in 12" :key="n" :value="n" :style="{'color': '#131313'}" >{{n}}月</option>
            </select>
          </div>
        </div>
        <div class="_multi-box _multi-box-end">
          <div class="_multi-inner _multi-inner-end">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="exportPreparation.date.day" @blur="v$.exportPreparation.date.day.$touch()" required :class="{'_input-select-exist': exportPreparation.date.day !== null}" class="_multi-select" >
              <option :value="null" disabled >日</option>
              <option v-for="n in daysMax" :key="n" :value="n" :style="{'color': '#131313'}" >{{n}}日</option>
            </select>
          </div>
        </div>
      </div>
      <div class="_button-container">
        <button :disabled="v$.exportPreparation.$invalid || inactiveButton" @click="exportPDF()" :class="{'_invalid-button': v$.exportPreparation.$invalid}" class="_button-s _marginM">PDF書き出し</button>
        <button :disabled="v$.exportPreparation.$invalid || inactiveButton" @click="viewImage()" :class="{'_invalid-button': v$.exportPreparation.$invalid}" class="_button-s">画像を表示</button>
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
        <div class="day t-s">{{exportPreparation.date.year}}.{{exportPreparation.date.month}}.{{exportPreparation.date.day}}</div>

        <div class="stage">
          <div v-for="instrument in band.lists" :key="instrument.id" class="stage-container">
            <div class="box" v-if="instrument.type !== 'ドラム'" :style="{'top': `${100 / 9 * instrument.position.y}%`, 'left': `${100 / 15 * instrument.position.x}%`, 'width': `${100 / 15 * instrument.position.xSpan}%`, 'height': `${100 / 9 * instrument.position.ySpan}%`}">
              <div class="box-info">
                <div class="box-left">
                  <div class="box-left-top">
                    <p v-if="instrument.vocal.part === 'ボーカル'" class="t-s">Vocal</p>
                    <p v-if="instrument.type !== 'ボーカル'" class="t-s">{{$store.getters['select/getInstrumentPlot'](instrument.type)}}</p>
                    <p v-if="instrument.type !== 'コーラス' && instrument.vocal.part === 'コーラス'" class="t-s">Cho</p>
                    <p class="t-s">{{instrument.member}}</p>
                    <p v-if="instrument.isLineOutForAcousticGuitar" class="t-s">楽器アウト:<br>{{$store.getters['select/getAcousticGuitarPlot'](instrument.acousticGuitar.type)}}</p>
                    <div v-if="instrument.bringKeyboardLists.length !== 0">
                      <p class="t-s">楽器アウト:</p>
                      <div v-for="item in instrument.bringKeyboardLists" :key="item">
                        <p class="t-s">{{$store.getters['select/getChannelPlot'](item.channel)}}:{{$store.getters['select/getTerminalPlot'](item.terminal)}}</p>
                      </div>
                    </div>

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

                </div>
              </div>
              <div class="box-monitor">
                <img v-if="instrument.vocal.monitor === 2" src="@/assets/images/stage-monitor2.png" alt="">
                <img v-else src="@/assets/images/stage-monitor1.png" alt="">
              </div>
            </div>
            <div class="box amp-box" v-if="instrument.isAmp" :style="{'top': `${100 / 9 * instrument.amp.position.y}%`, 'left': `${100 / 15 * instrument.amp.position.x}%`, 'width': `${100 / 15 * instrument.amp.position.xSpan}%`, 'height': `${100 / 9 * instrument.amp.position.ySpan}%`}">
              <p>{{instrument.amp.type}}</p>
            </div>
            <div class="box drum-box" v-if="instrument.type === 'ドラム'" :style="{'top': `${100 / 9 * instrument.position.y}%`, 'left': `${100 / 15 * instrument.position.x}%`, 'width': `${100 / 15 * instrument.position.xSpan}%`, 'height': `${100 / 9 * instrument.position.ySpan}%`}">
              <p class="t-s">{{$store.getters['select/getInstrumentPlot'](instrument.type)}}</p>
            </div>
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

import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

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
    return { v$: useVuelidate()}
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
      isView2: false
    }
  },
  async created(){
    this.band = this.$store.getters['data/exportBand']
    await db.getUser(this.$store.getters['auth/userId'])
    .then((doc)=>{
      this.userName = doc.data().name
    })


    // if(this.setList.isSe && this.setList.isEndSe){
    //   this.mainCounter = this.mainCounter + 2
    // }else if(this.setList.isSe || this.setList.isEndSe){
    //   this.mainCounter = this.mainCounter + 1
    // }
    // this.mainCounter = this.mainCounter + this.setList.lists.length

    // if(this.setList.isSeOfEncore && this.setList.isEndSeOfEncore){
    //   this.encoreCounter = this.encoreCounter + 2
    // }else if(this.setList.isSeOfEncore || this.setList.isEndSeOfEncore){
    //   this.encoreCounter = this.encoreCounter + 1
    // }
    // this.encoreCounter = this.encoreCounter + this.setList.listsOfEncore.length
    // if(this.mainCounter + this.encoreCounter <= 13){
    //   this.sheetType = "single"
    // }else{
    //   // 2枚目にいく時
    //   this.sheetType = "double"
    //   for (const target of this.setList.lists){
    //     if(this.listsForFirst.length <= 13){
    //       this.listsForFirst.push(target)
    //     }else{
    //       this.listsForSecond.push(target)
    //     }
    //   }
    // }

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
        await html2canvas(source).then(capture => {
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

  },
  computed:{

  },
  watch:{
    'exportPreparation.date.year': function(){
      this.daysMax = new Date(this.exportPreparation.date.year, this.exportPreparation.date.month, 0).getDate()
    },
    'exportPreparation.date.month': function(){
      this.daysMax = new Date(this.exportPreparation.date.year, this.exportPreparation.date.month, 0).getDate()
    },
    'exportPreparation.type': function(){
      if(this.exportPreparation.type === "stageTurnOver"){
        this.isTurnOver = true
      }else{
        this.isTurnOver = false
      }
    }
  },
  validations(){
    return{
      exportPreparation:{
        date:{
          year:{
            required
          },
          month:{
            required
          },
          day:{
            required
          }
        },
      }

    }
  },

}

</script>

<style scoped>
.t-ss{
  font-size: 10px;
}
.t-s{
  font-size: 12px;
}
.t-m{
  font-size: 15px;
}
.t-l{
  font-weight: 700;
  font-size: 24px;
}

.content{
  width: 90%;
  min-height: calc(100% - 50px);
  padding:90px 0 0;
  margin: 0 auto;
}
.logo{
  display: block;
  margin: 100px auto;
  width: 70%;
}
.pdf{
  /* position: fixed;
  top: 105%;
  left: 0;
  z-index: 100; */
  width: 1100px;
  height: 1555px;
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
}
.box{
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 1px solid var(--black);
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
  width: 100%;
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
  border: 1px solid var(--black);
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

