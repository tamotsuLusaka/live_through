<template>
  <div class="_base">
    <Spinner v-if="inactiveButton"></Spinner>
    <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="content">
      <img src="@/assets/images/logo-c.png" alt="" class="logo">
      <p class="_description _marginS">ライブ日の入力と出力フォーマットを選択し【PDF書き出し】でセットリストが完成します。<br>※作成されたPDFはサイト上に保存されません。ご使用端末に保存して下さい。</p>
      <div class="_container">
        <p class="_label">ライブ日</p><Helper :helperObject="helper.day"></Helper>
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
        <p class="_label">出力フォーマット</p><Helper :helperObject="helper.export"></Helper>
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
        <button :disabled="v$.exportPreparation.$invalid || inactiveButton" @click="exportPDF()" :class="{'_invalid-button': v$.exportPreparation.$invalid}" class="_button-s _marginM">PDF書き出し</button>
        <p class="_description _marginS">※PDF書き出し保存がうまくいかない場合は下記【画像を表示】でJPEG画像が表示されます。表示された画像を保存して下さい。</p>
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
        <table border="1" class="_PDF-table-line">
          <tr>
            <th class="_PDF-head _PDF-text-m">No</th>
            <th class="_PDF-head _PDF-text-m">TITLE</th>
            <th class="_PDF-head _PDF-text-m">音源Tr.</th>
            <th class="_PDF-head _PDF-text-m">曲調</th>
            <th class="_PDF-head _PDF-text-m">TIME</th>
            <th class="_PDF-head _PDF-text-m">音響への要望</th>
            <th class="_PDF-head _PDF-text-m">照明への要望</th>
          </tr>
          <tr v-for="n in 12" :key="n"  class="_PDF-list">
            <td class="_PDF-no _PDF-text-m"></td>
            <td class="_PDF-title _PDF-text-m"></td>
            <td class="_PDF-source"></td>
            <td class="_PDF-tune t_PDF-ext-s"></td>
            <td class="_PDF-time"></td>
            <td class="_PDF-text-s _PDF-request" ></td>
            <td class="_PDF-text-s _PDF-request"></td>
          </tr>
        </table>
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
          <List  :lists="listsOfOll" ></List>
        </table>
        
        <div class="_PDF-bottom">
          <div class="_PDF-output"><span>音源チャンネル数：{{setList.output.channel}}</span><span>音源端子：{{setList.output.terminal}}</span></div>
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
          <List :lists="listsForFirst" ></List>
        </table>

        <table  border="1" class="_PDF-table-line">
          <tr>
            <th class="_PDF-head _PDF-text-m">No</th>
            <th class="_PDF-head _PDF-text-m">TITLE</th>
            <th class="_PDF-head _PDF-text-m">音源Tr.</th>
            <th class="_PDF-head _PDF-text-m">曲調</th>
            <th class="_PDF-head _PDF-text-m">TIME</th>
            <th class="_PDF-head _PDF-text-m">音響への要望</th>
            <th class="_PDF-head _PDF-text-m">照明への要望</th>
          </tr>
          <tr v-for="n in 12" :key="n"  class="_PDF-list">
            <td class="_PDF-no _PDF-text-m"></td>
            <td class="_PDF-title _PDF-text-m"></td>
            <td class="_PDF-source"></td>
            <td class="_PDF-tune t_PDF-ext-s"></td>
            <td class="_PDF-time"></td>
            <td class="_PDF-text-s _PDF-request" ></td>
            <td class="_PDF-text-s _PDF-request"></td>
          </tr>
        </table>

        <div class="_PDF-bottom">
          <div class="_PDF-output"><span>音源チャンネル数：{{setList.output.channel}}</span><span>音源端子：{{setList.output.terminal}}</span></div>
          <div class="_PDF-text-m">その他、要望など</div>
          <div class="_PDF-note _PDF-text-m">
            {{setList.text}}
          </div>
          <div class="_PDF-footer">
            <p class="_PDF-next">2枚目に続く</p>
            <div class="_PDF-page">- 1 -</div>
            <img src="@/assets/images/logo.png" class="_PDF-logo" alt="">
          </div>
        </div>


      </div>

      <div id="pdf-double-2" class="_pdf">
        <div class="_PDF-name">{{userName}}</div>
        <div class="_PDF-day">{{exportPreparation.date.year}}.{{exportPreparation.date.month}}.{{exportPreparation.date.day}}</div>
        <table border="1" class="_PDF-table-line">
          <tr>
            <th class="_PDF-head _PDF-text-m">No</th>
            <th class="_PDF-head _PDF-text-m">TITLE</th>
            <th class="_PDF-head _PDF-text-m">音源Tr.</th>
            <th class="_PDF-head _PDF-text-m">曲調</th>
            <th class="_PDF-head _PDF-text-m">TIME</th>
            <th class="_PDF-head _PDF-text-m">音響への要望</th>
            <th class="_PDF-head _PDF-text-m">照明への要望</th>
          </tr>
          <tr v-for="n in 14" :key="n"  class="_PDF-list">
            <td class="_PDF-no _PDF-text-m"></td>
            <td class="_PDF-title _PDF-text-m"></td>
            <td class="_PDF-source"></td>
            <td class="_PDF-tune t_PDF-ext-s"></td>
            <td class="_PDF-time"></td>
            <td class="_PDF-text-s _PDF-request" ></td>
            <td class="_PDF-text-s _PDF-request"></td>
          </tr>
        </table>
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
          <List :lists="listsForSecond" ></List>
        </table>
        <div class="_PDF-bottom">
          <div class="_PDF-footer">
            <div class="_PDF-page">- 2 -</div>
            <img src="@/assets/images/logo.png" class="_PDF-logo" alt="">
          </div>
        </div>
      </div>

      <!-- ステージ用 -->
      <div id="pdf-stage" class="_pdf" :class="{'PDF-bg-black': isTurnOver}">
        <div class="PDF-stage-content">
          <div class="PDF-stage-name" :class="{'PDF-text-white': isTurnOver}">{{userName}}<span class="_PDF-text-l"  :class="{'PDF-text-white': isTurnOver}">({{exportPreparation.date.year}}.{{exportPreparation.date.month}}.{{exportPreparation.date.day}})</span></div>
          <ul class="PDF-list" :class="{'PDF-text-white': isTurnOver}">
            <li v-for="music in listsOfOll" :key="music">
              <span v-if="music.type === 'music'"><span v-if="music.format === 'encore'">EN </span>{{music.displayOrder}}. {{music.data.name}}</span>
              <span v-else-if="music.type === 'mc'">MC</span>
              <span v-else-if="music.type === 'se'"><span v-if="music.format === 'encore'">EN </span>SE</span>
              <span v-else-if="music.type === 'endSe'"><span v-if="music.format === 'encore'">EN </span>END SE</span>
            </li>
          </ul>
        </div>
        <img v-if="isTurnOver" src="@/assets/images/logo-white.png" alt="" class="PDF-stage-logo">
        <img v-else src="@/assets/images/logo.png" alt="" class="PDF-stage-logo">
      </div>

      <!-- ステージ用2枚構成 -->
      <div id="pdf-stage-1" class="_pdf" :class="{'PDF-bg-black': isTurnOver}">
        <div class="PDF-stage-content">
          <div class="PDF-stage-name" :class="{'PDF-text-white': isTurnOver}">{{userName}}<span class="_PDF-text-l" :class="{'PDF-text-white': isTurnOver}">1枚目：{{exportPreparation.date.year}}.{{exportPreparation.date.month}}.{{exportPreparation.date.day}}</span></div>
          <ul class="PDF-list" :class="{'PDF-text-white': isTurnOver}">
            <li v-for="music in listsForFirst" :key="music">
              <span v-if="music.type === 'music'"><span v-if="music.format === 'encore'">EN </span>{{music.displayOrder}}. {{music.data.name}}</span>
              <span v-else-if="music.type === 'mc'">MC</span>
              <span v-else-if="music.type === 'se'"><span v-if="music.format === 'encore'">EN </span>SE</span>
              <span v-else-if="music.type === 'endSe'"><span v-if="music.format === 'encore'">EN </span>END SE</span>
            </li>
          </ul>
        </div>
        <img v-if="isTurnOver" src="@/assets/images/logo-white.png" alt="" class="PDF-stage-logo">
        <img v-else src="@/assets/images/logo.png" alt="" class="PDF-stage-logo">
      </div>

      <div id="pdf-stage-2" class="_pdf" :class="{'PDF-bg-black': isTurnOver}">
        <div class="PDF-stage-content">
          <div class="PDF-stage-name" :class="{'PDF-text-white': isTurnOver}">{{userName}}<span class="_PDF-text-l" :class="{'PDF-text-white': isTurnOver}">2枚目：{{exportPreparation.date.year}}.{{exportPreparation.date.month}}.{{exportPreparation.date.day}}</span></div>
          <ul class="PDF-list" :class="{'PDF-text-white': isTurnOver}">
            <li v-for="music in listsForSecond" :key="music">
              <span v-if="music.type === 'music'"><span v-if="music.format === 'encore'">EN </span>{{music.displayOrder}}. {{music.data.name}}</span>
              <span v-else-if="music.type === 'mc'">MC</span>
              <span v-else-if="music.type === 'se'"><span v-if="music.format === 'encore'">EN </span>SE</span>
              <span v-else-if="music.type === 'endSe'"><span v-if="music.format === 'encore'">EN </span>END SE</span>
            </li>
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
// import Se from '@/components/setList/SeOnPDF.vue'
import List from '@/components/setList/ListOnPDF.vue'
import Footer from '@/components/Footer.vue'
import Helper from '@/components/Helper.vue'

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
    // Se,
    List,
    Footer,
    Helper,
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

      listsOfOll:[],
      // 2枚構成用リスト
      listsForFirst: [],
      listsForSecond: [],

      maxFirstLists: null,
      isSeOnFirst: false,

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
      isView2: false,

      helper:{
        day:{
          title:"ライブ日",
          text:"ライブ当日の日付を入力して下さい。"
        },
        export:{
          title:"出力フォーマット",
          text:"出力フォーマットを選択して下さい。\n【音響照明用】→提出用 ※要望・詳細込み\n\n【ステージ用】（黒文字、白バック）→ご自身用 ※曲順のみ。\n\n【反転ステージ用】（白文字、黒バック）→ご自身用 ※曲順のみ。反転"
        },
      }
    }
  },
  async created(){
    this.setList = this.$store.getters['data/exportSetList']
    await db.getUser(this.$store.getters['auth/userId'])
    .then((doc)=>{
      this.userName = doc.data().name
    })
    if(this.setList.isSe){
      this.listsOfOll.push(this.setSe(this.setList.se, "se", "main"))
    }
    for(let music of this.setList.lists){
      music.format = "main"
      this.listsOfOll.push(music)
    }
    if(this.setList.isEndSe){
      this.listsOfOll.push(this.setSe(this.setList.endSe, "endSe", "main"))
    }
    if(this.setList.isEncore){
      if(this.setList.isSeOfEncore){
        this.listsOfOll.push(this.setSe(this.setList.seOfEncore, "se", "encore"))
      }
      for(let music of this.setList.listsOfEncore){
        music.format = "encore"
        this.listsOfOll.push(music)
      }
      if(this.setList.isEndSeOfEncore){
        this.listsOfOll.push(this.setSe(this.setList.endSeOfEncore, "endSe", "encore"))
      }
    }
    if(this.listsOfOll.length <= 12){
      this.sheetType = "single"
    }else{
      // 2枚目にいく時
      this.sheetType = "double"
      this.listsOfOll.forEach((target, index )=>{
        if(index <= 11){
          this.listsForFirst.push(target)
        }else{
          this.listsForSecond.push(target)
        }
      })
    }

  },
  mounted(){
    
  },
  methods:{

    setSe(se, type, format){
      let seObject ={
        type: type, //se or endSe
        format: format, //main or encore
        typeOfSource: se.typeOfSource,
        nameOfSource: se.nameOfSource,
        truckNumber: se.truckNumber,
        textForOpen: se.textForOpen,
        textForClose: se.textForClose,
      }
      return seObject
    },

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
        if(this.sheetType === "single"){
          const source = document.getElementById('pdf-stage')
          await html2canvas(source).then(capture => {
            imgData = capture.toDataURL('image/jpeg')
            doc.addImage(imgData, 'JPEG', 10, 10, width * 0.9, 0)
          })
        }else if(this.sheetType === "double"){
          const source1 = document.getElementById('pdf-stage-1')
          const source2 = document.getElementById('pdf-stage-2')
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
        if(this.sheetType === "single"){
          this.isView2 = false
          const source = document.getElementById('pdf-stage')
          await html2canvas(source).then(capture => {
            imgData = capture.toDataURL('image/jpeg')
          })
        }else if(this.sheetType === "double"){
          const source1 = document.getElementById('pdf-stage-1')
          const source2 = document.getElementById('pdf-stage-2')
          await html2canvas(source1).then(capture => {
            imgData = capture.toDataURL('image/jpeg')
          })
          await html2canvas(source2).then(capture => {
            imgData2 = capture.toDataURL('image/jpeg')
          })
        }
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
#pdf-single{
  position: fixed;
  top: 105%;
  left: 0;
  z-index: 100;
}
.logo{
  display: block;
  margin: 100px auto;
  width: 70%;
}
.PDF-stage-content{
  padding: 60px;
  position: relative;
}
.PDF-stage-name{
  font-size: 34px;
  font-weight: 700;
  margin: 30px 0 14px;
}
.PDF-stage-name span{
  margin-left: 10px;
}
.PDF-list{
  margin-top: 50px;
  font-size: 45px;
  font-weight: 700;
}
.PDF-list li{
  margin-bottom: 20px;
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
  right: 60px;
  bottom: 60px;
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

