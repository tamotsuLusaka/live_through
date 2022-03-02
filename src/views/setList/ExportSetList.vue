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
      <div class="_container">
        <p class="_label">書き出しフォーマット</p>
        <div class="_select-box">
          <label class="_select-icon"><img src="@/assets/images/icon-arrow-b.png" alt="" class="_arrow"></label>
          <select v-model="exportPreparation.type" @blur="v$.exportPreparation.type.$touch()" required :class="{'_input-error': v$.exportPreparation.type.$error, '_input-select-exist': exportPreparation.type !== null}" class="_input-select" >
            <option :value="null" class="_select-default" disabled >フォーマットを選択</option>
            <option :style="{'color': '#131313'}" :value="'normal'"  >音響照明用</option>
            <option :style="{'color': '#131313'}" :value="'stage'"  >ステージ用</option>
            <option :style="{'color': '#131313'}" :value="'stageTurnOver'"  >ステージ用（反転）</option>
          </select>
        </div>
      </div>
      <div class="_button-container">
        <button :disabled="v$.exportPreparation.$invalid || inactiveButton" @click="exportPDF()" :class="{'_invalid-button': v$.exportPreparation.$invalid}" class="_button-s _margin30">PDF書き出し</button>
        <button :disabled="v$.exportPreparation.$invalid || inactiveButton" @click="viewImage()" :class="{'_invalid-button': v$.exportPreparation.$invalid}" class="_button-s">画像を表示</button>
      </div>

      <!-- <a id="download" target="_blank">ダウンロードスイッチ</a> -->
      <div class="render-container">
        <img  v-show="isView" id="renderSpace" class="render-space" :src="renderImage">
        <img  v-show="isView2" id="renderSpace2" class="render-space" :src="renderImage2">
      </div>

      <!-- 1ページ構成 -->

      <div id="pdf-single"  class="_pdf">
      
        <div class="_PDF-name">{{userName}}</div>
        <div class="_PDF-day">{{exportPreparation.date.year}}.{{exportPreparation.date.month}}.{{exportPreparation.date.day}}</div>
        <table border="1" class="_PDF-table" id="my-table">
          <tr>
            <th class="_PDF-head _PDF-text-m" >No</th>
            <th class="_PDF-head _PDF-text-m">TITLE</th>
            <th class="_PDF-head _PDF-text-m">音源Tr.</th>
            <th class="_PDF-head _PDF-text-m">曲調</th>
            <th class="_PDF-head _PDF-text-m">TIME</th>
            <th class="_PDF-head _PDF-text-m">音響への要望</th>
            <th class="_PDF-head _PDF-text-m">照明への要望</th>
          </tr>
          <Se v-if="setList.isSe" :type="'se'" :data="setList.se"></Se>
          <List :type="'main'" :lists="setList.lists" ></List>
          <Se v-if="setList.isEndSe" :type="'endSe'" :data="setList.endSe"></Se>
          <Se v-if="setList.isSeOfEncore" :type="'seOfEncore'" :data="setList.seOfEncore"></Se>
          <List v-if="setList.isEncore" :type="'encore'" :lists="setList.listsOfEncore" ></List>
          <Se v-if="setList.isEndSeOfEncore" :type="'endSeOfEncore'" :data="setList.endSeOfEncore"></Se>
        </table>
        <div class="_PDF-output"><span>音源チャンネル数：{{setList.output.channel}}</span><span>音源端子：{{setList.output.terminal}}</span></div>
        <div class="_PDF-bottom">
          <div class="_PDF-text-m">その他、要望など</div>
          <div class="_PDF-note _PDF-text-m">
            {{setList.text}}
          </div>
          <div class="_PDF-footer">
            <div class="_PDF-page">- 1 -</div>
            <img src="@/assets/images/logo.png" class="_PDF-logo" alt="">
          </div>
        </div>
      
      </div>

  
      <!-- 2ページ構成 -->
      <div id="pdf-double-1" class="_pdf">
        <div class="_PDF-name">{{userName}}</div>
        <div class="_PDF-day">{{exportPreparation.date.year}}.{{exportPreparation.date.month}}.{{exportPreparation.date.day}}</div>
        <table border="1" class="_PDF-table">
          <tr>
            <th class="_PDF-head _PDF-text-m">No</th>
            <th class="_PDF-head _PDF-text-m">TITLE</th>
            <th class="_PDF-head _PDF-text-m">音源Tr.</th>
            <th class="_PDF-head _PDF-text-m">曲調</th>
            <th class="_PDF-head _PDF-text-m">TIME</th>
            <th class="_PDF-head _PDF-text-m">音響への要望</th>
            <th class="_PDF-head _PDF-text-m">照明への要望</th>
          </tr>
          <Se v-if="setList.isSe" :type="'se'" :data="setList.se"></Se>
          <List :type="'main'" :lists="listsForFirst" ></List>
          <Se v-if="setList.isEndSe && listsForFirst.length <= 12" :type="'endSe'" :data="setList.endSe"></Se>
        </table>
        <div class="_PDF-output"><span>音源チャンネル数：{{setList.output.channel}}</span><span>音源端子：{{setList.output.terminal}}</span></div>
        <div class="_PDF-bottom">
          <p class="_PDF-next">2枚目に続く</p>
          <div class="_PDF-footer">
            <div class="_PDF-page">- 1 -</div>
            <img src="@/assets/images/logo.png" class="_PDF-logo" alt="">
          </div>
        </div>
      </div>

      <div id="pdf-double-2" class="_pdf">
        <div class="_PDF-name">{{userName}}</div>
        <div class="_PDF-day">{{exportPreparation.date.year}}.{{exportPreparation.date.month}}.{{exportPreparation.date.day}}</div>
        <table border="1" class="_PDF-table" >
          <tr>
            <th class="_PDF-head _PDF-text-m">No</th>
            <th class="_PDF-head _PDF-text-m">TITLE</th>
            <th class="_PDF-head _PDF-text-m">音源Tr.</th>
            <th class="_PDF-head _PDF-text-m">曲調</th>
            <th class="_PDF-head _PDF-text-m">TIME</th>
            <th class="_PDF-head _PDF-text-m">音響への要望</th>
            <th class="_PDF-head _PDF-text-m">照明への要望</th>
          </tr>
          <List :type="'main'" :lists="listsForSecond" ></List>
          <Se v-if="setList.isEndSe && listsForFirst.length >= 13" :type="'endSe'" :data="setList.endSe"></Se>
          <Se v-if="setList.isSeOfEncore" :type="'seOfEncore'" :data="setList.seOfEncore"></Se>
          <List v-if="setList.isEncore" :type="'encore'" :lists="setList.listsOfEncore" ></List>
          <Se v-if="setList.isEndSeOfEncore" :type="'endSeOfEncore'" :data="setList.endSeOfEncore"></Se>
        </table>
        <div class="_PDF-bottom">
          <div class="_PDF-text-m">その他、要望など</div>
          <div class="_PDF-note _PDF-text-m">
            {{setList.text}}
          </div>
          <div class="_PDF-footer">
            <div class="_PDF-page">- 2 -</div>
            <img src="@/assets/images/logo.png" class="_PDF-logo" alt="">
          </div>
        </div>
      </div>

      <div id="pdf-stage" class="_pdf" :class="{'PDF-bg-black': isTurnOver}">
        <div class="PDF-stage-content">
          <div class="PDF-stage-name" :class="{'PDF-text-white': isTurnOver}">{{userName}}</div>
          <div class="_PDF-text-l" :class="{'PDF-text-white': isTurnOver}">{{setList.name}}({{exportPreparation.date.year}}.{{exportPreparation.date.month}}.{{exportPreparation.date.day}})</div>
          <ul class="PDF-list" :class="{'PDF-text-white': isTurnOver}">
            <li v-if="setList.isSe">SE</li>
            <li v-for="music in setList.lists" :key="music">
              <span v-if="music.type === 'mc'">MC</span>
              <span v-if="music.type === 'music'">{{music.displayOrder}}. {{music.data.name}}</span>
            </li>
            <li v-if="setList.isEndSe">END SE</li>
            <li v-if="setList.isSeOfEncore">アンコール SE</li>
            <li v-for="music in setList.listsOfEncore" :key="music">
              <span v-if="music.type === 'mc'">MC</span>
              <span v-if="music.type === 'music'">アンコール {{music.displayOrder}}. {{music.data.name}}</span>
            </li>
            <li v-if="setList.isEndSeOfEncore">アンコ-ル END SE</li>
          </ul>
          
        </div>
        <img v-if="isTurnOver" src="@/assets/images/logo-white.png" alt="" class="PDF-stage-logo">
        <img v-else src="@/assets/images/logo.png" alt="" class="PDF-stage-logo">

      </div>

    </div>
    <Footer></Footer>
  </div>
</template>


<script>
import Mixin from '@/mixin/mixin.js'
import SubHeader from '@/components/SubHeader.vue'
import Spinner from '@/components/Spinner.vue'
import Se from '@/components/setList/SeOnPDF.vue'
import List from '@/components/setList/ListOnPDF.vue'
import Footer from '@/components/Footer.vue'

import SetList from '@/class/SetList.js'

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
    Se,
    List,
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
      pageType: "setList",
      pageTitle:"セットリストの書き出し",
      isBack: true,
      isPcTitle: false,
      inactiveButton: false,
      errorMessage: "",

      setList: new SetList(),
      userName: "",

      mainCounter: 0,
      encoreCounter: 0,
      sheetType: "", // "single" or "double"

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
        type: null
      },
      isTurnOver: false,
      renderImage: null,
      renderImage2: null,
      isView: false,
      isView2: false
    }
  },
  async created(){
    this.setList = this.$store.getters['data/exportSetList']
    await db.getUser(this.$store.getters['auth/userId'])
    .then((doc)=>{
      this.userName = doc.data().name
    })


    if(this.setList.isSe && this.setList.isEndSe){
      this.mainCounter = this.mainCounter + 2
    }else if(this.setList.isSe || this.setList.isEndSe){
      this.mainCounter = this.mainCounter + 1
    }
    this.mainCounter = this.mainCounter + this.setList.lists.length

    if(this.setList.isSeOfEncore && this.setList.isEndSeOfEncore){
      this.encoreCounter = this.encoreCounter + 2
    }else if(this.setList.isSeOfEncore || this.setList.isEndSeOfEncore){
      this.encoreCounter = this.encoreCounter + 1
    }
    this.encoreCounter = this.encoreCounter + this.setList.listsOfEncore.length
    if(this.mainCounter + this.encoreCounter <= 13){
      this.sheetType = "single"
    }else{
      // 2枚目にいく時
      this.sheetType = "double"
      for (const target of this.setList.lists){
        if(this.listsForFirst.length <= 13){
          this.listsForFirst.push(target)
        }else{
          this.listsForSecond.push(target)
        }
      }
    }

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

      if(this.exportPreparation.type === "normal"){
        fileName = "set_list" + this._generateDay() + ".pdf"
        if(this.sheetType === "single"){
          const source = document.getElementById('pdf-single')
          await html2canvas(source).then(capture => {
            imgData = capture.toDataURL('image/jpeg')
            doc.addImage(imgData, 'JPEG', 10, 10, width * 0.9, 0)
          })
        }else if(this.sheetType === "double"){
          const source1 = document.getElementById('pdf-double-1')
          const source2 = document.getElementById('pdf-double-2')
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
      }else if(this.exportPreparation.type === "stage" || this.exportPreparation.type === "stageTurnOver"){
        fileName = "set_list_stage" + this._generateDay() + ".pdf"
        const source = document.getElementById('pdf-stage')
        await html2canvas(source).then(capture => {
          imgData = capture.toDataURL('image/jpeg')
          doc.addImage(imgData, 'JPEG', 10, 10, width * 0.9, 0)
        })
      }

      doc.save(fileName)
      this.inactiveButton = false
      // OS別対応で書き出し
      // if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())) {
      //   window.open(doc.output('bloburl', { filename: fileName }))
      //   this.inactiveButton = false
      // } else {
      //   doc.save(fileName)
      //   this.inactiveButton = false
      // }
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

      if(this.exportPreparation.type === "normal"){
        if(this.sheetType === "single"){
          this.isView2 = false
          const source = document.getElementById('pdf-single')
          await html2canvas(source).then(capture => {
            imgData = capture.toDataURL('image/jpeg')
          })
        }else if(this.sheetType === "double"){
          const source1 = document.getElementById('pdf-double-1')
          const source2 = document.getElementById('pdf-double-2')
          await html2canvas(source1).then(capture => {
            imgData = capture.toDataURL('image/jpeg')
          })
          await html2canvas(source2).then(capture => {
            imgData2 = capture.toDataURL('image/jpeg')
          })
        }
      }else if(this.exportPreparation.type === "stage" || this.exportPreparation.type === "stageTurnOver"){
        this.isView2 = false
        const source = document.getElementById('pdf-stage')
        await html2canvas(source).then(capture => {
          imgData = capture.toDataURL('image/jpeg')
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
        type:{
          required
        }
      }

    }
  },

}

</script>

<style scoped>
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
.PDF-stage-content{
  padding: 100px;
  position: relative;
}
.PDF-stage-name{
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 20px;
}
.PDF-list{
  margin-top: 60px;
  font-size: 25px;
  font-weight: 700;
}
.PDF-bg-black{
  background-color: black;
}
.PDF-text-white{
  color: white;
}
.PDF-stage-logo{
  width: 185px;
  height: 30px;
  position: absolute;
  right: 100px;
  bottom: 100px;
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

