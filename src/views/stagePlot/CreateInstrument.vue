<template>
  <div class="_base">
    <Spinner v-if="inactiveButton"></Spinner>
    <SubHeader  :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content">
      <p v-if="errorMessage !== ''" class="_error-message">{{errorMessage}}</p>
      <div class="_container">
        <label for="name" class="_label">メンバー名</label><Helper :helperObject="helper.tune"></Helper>
        <input type="text" v-model="instrument.member" @blur="v$.instrument.member.$touch()" placeholder="10文字以内で入力" :class="{'_input-error': v$.instrument.member.$error}" class="_input-text">
        <p v-if="v$.instrument.member.$error" class="_input-error-message">10文字以内で入力してください。</p>
      </div>

      <div class="_container">
        <label class="_label">パート配置図</label><Helper :helperObject="helper.tune"></Helper>
        <StageLayout v-if="isCreated" mode="display" :band="band" :instrument="instrument" class="_marginS"></StageLayout>
      </div>
      <div @click="editPosition(false)" class="_link-mini-white _marginS">
        <img src="@/assets/images/icon-pin-blue.png" class="_link-mini-icon" alt="">
        <p class="_link-mini-text">パート配置を設定</p>
      </div>

      <div v-if="tag !== 'VOCAL'" class="_container">
        <p class="_label">ボーカル・コーラス・/MC</p>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !instrument.isVocal}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !instrument.isVocal}">
            <p class="_multi-text">有り</p>
            <Toggle v-model="instrument.isVocal" @click="_clearObject(instrument.vocal), _clearObject(instrument.mic), offMic()" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="instrument.isVocal" class="_multi-box _multi-box-end">
          <div class="_multi-inner _multi-inner-end">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.vocal.part" @blur="v$.instrument.vocal.part.$touch()" required :class="{'_input-select-exist': instrument.vocal.part !== null}" class="_multi-select" >
              <option :value="null" disabled >パートを選択</option>
              <option v-for="select in $store.getters['select/typeOfVocal']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >パートの種類：{{select.text}}</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="instrument.isVocal" class="_container">
        <p class="_label">マイク</p>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !instrument.isBroughtMic}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !instrument.isBroughtMic}">
            <p class="_multi-text">持ち込み有り</p>
            <Toggle v-model="instrument.isBroughtMic" @click="_clearObject(instrument.mic)" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="instrument.isBroughtMic"  class="_multi-box" :class="{'_multi-box-error': v$.instrument.mic.type.$error}">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.mic.type" @blur="v$.instrument.mic.type.$touch()" required :class="{'_input-select-exist': instrument.mic.type !== null}" class="_multi-select" >
              <option :value="null" disabled >持ち込み機材を選択</option>
              <option v-for="select in $store.getters['select/line']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="instrument.isBroughtMic" class="_multi-box" :class="{'_multi-box-error': v$.instrument.mic.brand.$error}">
          <div class="_multi-inner">
            <input type="text" v-model="instrument.mic.brand" @blur="v$.instrument.mic.brand.$touch()" placeholder="メーカー名を10字以内で入力" class="_multi-input-text">
          </div>
        </div>
        <div v-if="instrument.isBroughtMic" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.instrument.mic.model.$error}">
          <div class="_multi-inner _multi-inner-end">
            <input type="text" v-model="instrument.mic.model" @blur="v$.instrument.mic.model.$touch()" placeholder="型番を10字以内で入力" class="_multi-input-text">
          </div>
        </div>
        <p v-if="v$.instrument.mic.brand.$error || v$.instrument.mic.model.$error" class="_input-error-message">10文字以内で入力してください。</p>
      </div>

      <div v-if="instrument.isAmp" class="_container">
        <p class="_label">アンプ</p>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': instrument.amp.type === null || instrument.amp.type === 'rent' || instrument.amp.type === 'rentCombo'}">
          <div class="_multi-inner" :class="{'_multi-inner-end': instrument.amp.type === null || instrument.amp.type === 'rent' || instrument.amp.type === 'rentCombo'}">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.amp.type" @blur="v$.instrument.amp.type.$touch()" required :class="{'_input-select-exist': instrument.amp.type !== null}" class="_multi-select" >
              <option :value="null" disabled >レンタル・持ち込み機材を選択</option>
              <option v-for="select in $store.getters['select/amp']" :key="select.id" :value="select.id" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="instrument.amp.type === 'head' || instrument.amp.type === 'head&cab'"  class="_multi-box" :class="{'_multi-box-error': v$.instrument.amp.brandOfHead.$error, '_multi-box-end': instrument.amp.type === 'head'}">
          <div class="_multi-inner" :class="{'_multi-inner-end': instrument.amp.type === 'head'}">
            <input type="text" v-model="instrument.amp.brandOfHead" @blur="v$.instrument.amp.brandOfHead.$touch()" placeholder="ヘッドメーカー名を10字以内で入力" class="_multi-input-text">
          </div>
        </div>
        <div v-if="instrument.amp.type === 'cab' || instrument.amp.type === 'head&cab'" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.instrument.amp.brandOfCab.$error}">
          <div class="_multi-inner _multi-inner-end">
            <input type="text" v-model="instrument.amp.brandOfCab" @blur="v$.instrument.amp.brandOfCab.$touch()" placeholder="キャビメーカー名を10字以内で入力" class="_multi-input-text">
          </div>
        </div>
        <div v-if="instrument.amp.type === 'combo'" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.instrument.amp.brandOfCombo.$error}">
          <div class="_multi-inner _multi-inner-end">
            <input type="text" v-model="instrument.amp.brandOfCombo" @blur="v$.instrument.amp.brandOfCombo.$touch()" placeholder="コンボメーカー名を10字以内で入力" class="_multi-input-text">
          </div>
        </div>
        <div class="_marginS">
          <p v-if="v$.instrument.amp.brandOfHead.$error || v$.instrument.amp.brandOfCab.$error || v$.instrument.amp.brandOfCombo.$error" class="_input-error-message">10文字以内で入力してください。</p>
        </div>
        <div @click="editPosition(true)" class="_link-mini-white _marginS">
          <img src="@/assets/images/icon-pin-blue.png" class="_link-mini-icon" alt="">
          <p class="_link-mini-text">アンプ配置を設定</p>
        </div>
        <Alert :isShown="isAlertShown" :message="alertMessage" @closeAlert="closeAlert()"></Alert>
      </div>

      <div v-if="instrument.type === 'ベース'" class="_container">
        <p class="_label">DI</p>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !instrument.idBroughtDi}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !instrument.idBroughtDi}">
            <p class="_multi-text">持ち込み有り</p>
            <Toggle v-model="instrument.idBroughtDi" @click="_clearObject(instrument.di)" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="instrument.idBroughtDi" class="_multi-box" :class="{'_multi-box-error': v$.instrument.di.brand.$error}">
          <div class="_multi-inner">
            <input type="text" v-model="instrument.di.brand" @blur="v$.instrument.di.brand.$touch()" placeholder="メーカー名を10字以内で入力" class="_multi-input-text">
          </div>
        </div>
        <div v-if="instrument.idBroughtDi" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.instrument.di.model.$error}">
          <div class="_multi-inner _multi-inner-end">
            <input type="text" v-model="instrument.di.model" @blur="v$.instrument.di.model.$touch()" placeholder="型番を10字以内で入力" class="_multi-input-text">
          </div>
        </div>
        <p v-if="v$.instrument.di.brand.$error || v$.instrument.di.model.$error" class="_input-error-message">10文字以内で入力してください。</p>
      </div>

      <div v-if="instrument.type === 'ドラム'" class="_container">
        <p class="_label">会場レンタルドラム</p>
        <div class="_multi-box _multi-box-start">
          <div class="_multi-inner" >
            <p class="_multi-text">バスドラム</p>
            <Toggle v-model="instrument.drum.rent.bass" class="_multi-toggle" />
          </div>
        </div>
        <div class="_multi-box">
          <div class="_multi-inner" >
            <p class="_multi-text">スネア</p>
            <Toggle v-model="instrument.drum.rent.snare" class="_multi-toggle" />
          </div>
        </div>
        <div class="_multi-box">
          <div class="_multi-inner" >
            <p class="_multi-text">ハイハット</p>
            <Toggle v-model="instrument.drum.rent.hiHat" class="_multi-toggle" />
          </div>
        </div>
        <div class="_multi-box">
          <div class="_multi-inner" >
            <p class="_multi-text">フロアタム</p>
            <Toggle v-model="instrument.drum.rent.floorTom" class="_multi-toggle" />
          </div>
        </div>
        <div class="_multi-box">
          <div class="_multi-inner" >
            <p class="_multi-text">タム13"</p>
            <Toggle v-model="instrument.drum.rent.tom13" class="_multi-toggle" />
          </div>
        </div>
        <div class="_multi-box">
          <div class="_multi-inner" >
            <p class="_multi-text">タム12"</p>
            <Toggle v-model="instrument.drum.rent.tom12" class="_multi-toggle" />
          </div>
        </div>
        <div class="_multi-box">
          <div class="_multi-inner" >
            <p class="_multi-text">ライドシンバル</p>
            <Toggle v-model="instrument.drum.rent.rideCymbal" class="_multi-toggle" />
          </div>
        </div>
        <div class="_multi-box">
          <div class="_multi-inner" >
            <p class="_multi-text">クラッシュ18"</p>
            <Toggle v-model="instrument.drum.rent.crash18" class="_multi-toggle" />
          </div>
        </div>
        <div class="_multi-box">
          <div class="_multi-inner" >
            <p class="_multi-text">クラッシュ16"</p>
            <Toggle v-model="instrument.drum.rent.crash16" class="_multi-toggle" />
          </div>
        </div>
        <div class="_multi-box _multi-box-end">
          <div class="_multi-inner _multi-inner-end">
            <p class="_multi-text">キックペダル</p>
            <Toggle v-model="instrument.drum.rent.kickPedal" class="_multi-toggle" />
          </div>
        </div>
      </div>

      <div v-if="instrument.type === 'ドラム'" class="_container">
        <label for="textForLighting" class="_label">持ち込みドラム機材</label>
        <textarea v-model="instrument.drum.bring" @blur="v$.instrument.drum.bring.$touch()" placeholder="持ち込みドラム機材があれば全て入力" :class="{'_input-error': v$.instrument.drum.bring.$error}" class="_input-textarea"></textarea>
        <p v-if="v$.instrument.drum.bring.$error" class="_input-error-message">50文字以内で入力してください。</p>
      </div>

      <div v-if="tag === 'VOCAL' || instrument.type === 'パーカッション'" class="_container">
        <p class="_label">同期</p>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !instrument.isSync}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !instrument.isSync}">
            <p class="_multi-text">有り</p>
            <Toggle v-model="instrument.isSync" @click="_clearObject(instrument.sync)" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="instrument.isSync"  class="_multi-box" :class="{'_multi-box-error': v$.instrument.sync.type.$error}">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.sync.type" @blur="v$.instrument.sync.type.$touch()" required :class="{'_input-select-exist': instrument.sync.type !== null}" class="_multi-select" >
              <option :value="null" disabled >種類を選択</option>
              <option v-for="select in $store.getters['select/sync']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="instrument.isSync" class="_multi-box" :class="{'_multi-box-error': v$.instrument.sync.channel.$error}">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.sync.channel" @blur="v$.instrument.sync.channel.$touch()" required :class="{'_input-select-exist': instrument.sync.channel !== null}" class="_multi-select" >
              <option :value="null" disabled >チャンネル数を選択</option>
              <option v-for="select in $store.getters['select/channel']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="instrument.isSync" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.instrument.sync.terminal.$error}">
          <div class="_multi-inner _multi-inner-end">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.sync.terminal" @blur="v$.instrument.sync.terminal.$touch()" required :class="{'_input-select-exist': instrument.sync.terminal !== null}" class="_multi-select" >
              <option :value="null" disabled >アウト端子を選択</option>
              <option v-for="select in $store.getters['select/terminalMini']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- ドラム専用同期 -->
      <div v-if="instrument.type === 'ドラム'" class="_container">
        <p class="_label">同期</p>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !instrument.isSyncForDrum}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !instrument.isSyncForDrum}">
            <p class="_multi-text">有り</p>
            <Toggle v-model="instrument.isSyncForDrum" @click="_clearObject(instrument.syncForDrum)" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="instrument.isSyncForDrum"  class="_multi-box" :class="{'_multi-box-error': v$.instrument.syncForDrum.type.$error}">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.syncForDrum.type" @blur="v$.instrument.syncForDrum.type.$touch()" required :class="{'_input-select-exist': instrument.syncForDrum.type !== null}" class="_multi-select" >
              <option :value="null" disabled >種類を選択</option>
              <option v-for="select in $store.getters['select/sync']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="instrument.isSyncForDrum" class="_multi-box" :class="{'_multi-box-error': v$.instrument.syncForDrum.channel.$error}">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.syncForDrum.channel" @blur="v$.instrument.syncForDrum.channel.$touch()" required :class="{'_input-select-exist': instrument.syncForDrum.channel !== null}" class="_multi-select" >
              <option :value="null" disabled >チャンネル数を選択</option>
              <option v-for="select in $store.getters['select/channel']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="instrument.isSyncForDrum" class="_multi-box" :class="{'_multi-box-error': v$.instrument.syncForDrum.terminal.$error}">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.syncForDrum.terminal" @blur="v$.instrument.syncForDrum.terminal.$touch()" required :class="{'_input-select-exist': instrument.syncForDrum.terminal !== null}" class="_multi-select" >
              <option :value="null" disabled >アウト端子を選択</option>
              <option v-for="select in $store.getters['select/terminalMini']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="instrument.isSyncForDrum" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.instrument.syncForDrum.site.$error}">
          <div class="_multi-inner _multi-inner-end">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.syncForDrum.site" @blur="v$.instrument.syncForDrum.site.$touch()" required :class="{'_input-select-exist': instrument.syncForDrum.site !== null}" class="_multi-select" >
              <option :value="null" disabled >位置を選択</option>
              <option v-for="select in $store.getters['select/site']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="_container">
        <p class="_label">イヤモニ</p>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !instrument.isBroughtMonitor}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !instrument.isBroughtMonitor}">
            <p class="_multi-text">持ち込み有り</p>
            <Toggle v-model="instrument.isBroughtMonitor" @click="_clearObject(instrument.monitor)" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="instrument.isBroughtMonitor"  class="_multi-box" :class="{'_multi-box-error': v$.instrument.monitor.type.$error}">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.monitor.type" @blur="v$.instrument.monitor.type.$touch()" required :class="{'_input-select-exist': instrument.monitor.type !== null}" class="_multi-select" >
              <option :value="null" disabled >種類を選択</option>
              <option v-for="select in $store.getters['select/line']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="instrument.isBroughtMonitor" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.instrument.monitor.channel.$error}">
          <div class="_multi-inner _multi-inner-end">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="instrument.monitor.channel" @blur="v$.instrument.monitor.channel.$touch()" required :class="{'_input-select-exist': instrument.monitor.channel !== null}" class="_multi-select" >
              <option :value="null" disabled >チャンネル数を選択</option>
              <option v-for="select in $store.getters['select/twoChannel']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="_container">
        <p class="_label">足元電源（100V）</p>
        <div class="_box">
          <div class="_text-inner">
            <p class="_text">必要</p>
            <Toggle v-model="instrument.isPower" class="_multi-toggle"></Toggle>
          </div>
        </div>
      </div>

      <div class="_container">
        <label for="textForLighting" class="_label">備考</label>
        <textarea v-model="instrument.text" @blur="v$.instrument.text.$touch()" placeholder="50文字以内で入力 任意" :class="{'_input-error': v$.instrument.text.$error}" class="_input-textarea"></textarea>
        <p v-if="v$.instrument.text.$error" class="_input-error-message">50文字以内で入力してください。</p>
      </div>

      
      <div v-if="this.mode === 'create'" class="_button-container">
        <button  :disabled="v$.instrument.$invalid || inactiveButton" @click="createInstrument()" :class="{'_invalid-button': v$.instrument.$invalid}" class="_button-s">登録</button>
      </div>
      <div v-if="this.mode === 'edit'" class="_button-container">
        <button  :disabled="v$.instrument.$invalid || inactiveButton" @click="editInstrument()" :class="{'_invalid-button': v$.instrument.$invalid}" class="_button-s _marginM">編集</button>
        <button  :disabled="inactiveButton" @click="deleteInstrument()"  class="_button-red">削除</button>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>

import SubHeader from '@/components/SubHeader.vue'
import Helper from '@/components/Helper.vue'
import Spinner from '@/components/Spinner.vue'
import Mixin from '@/mixin/mixin.js'
import Footer from '@/components/Footer.vue'
import Alert from '@/components/Alert.vue'
import StageLayout from '@/components/stagePlot/StageLayout.vue'

import Band from '@/class/Band.js'
import Instrument from '@/class/Instrument.js'

import db from '@/firebase/modules/db.js'
import Toggle from '@vueform/toggle'
import useVuelidate from '@vuelidate/core'
import { required, maxLength, helpers} from '@vuelidate/validators'
const contains = (param) => helpers.withParams(
  { type: 'isChecked', value: param},
  (value) => {
    if(param){
      return helpers.req(value)
    }else{
      return true
    }
  }
)
  

export default {
  name: 'CreateInstrument',
  components: {
    Spinner,
    SubHeader,
    Helper,
    Footer,
    Toggle,
    Alert,
    StageLayout
  },
  mixins:[
    Mixin
  ],
  setup(){
    return { v$: useVuelidate()}
  },
  data(){
    return{
      isCreated: false,
      pageType: "stagePlot",
      pageTitle: "",
      isBack: true,
      isPcTitle: true,
      inactiveButton: false,
      mode: "create", //"create", "edit"
      errorMessage: "",
      isAlertShown: false,
      alertMessage: "",

      band: new Band(),
      instrument: new Instrument(),
      listIndex: null, //編集時に使う楽器リストのインデックス番号
      tag: null, //楽器の大グループ "VOCAL",


      helper:{
        tune:{
          id:"tune",
          text:"説明文をここに入力。説明文をここに入力。説明文をここに入力。\n説明文をここに入力。"
        }
      },

    }
  },
  async created(){
    await db.getBand(this.$route.params.id)
    .then((doc)=>{
      this.band = doc.data()
    })
    .catch((error)=>{
      this.errorMessage = "データの取得に失敗しました。"
      console.log(error.message)
    })

    let updatedInst = this.$store.getters["data/instrument"]

    if(this.$route.params.instrumentId){
      this.mode = "edit"
      this.listIndex = this.band.lists.findIndex((part)=> part.id === this.$route.params.instrumentId)

      if(updatedInst != null) {
        this.instrument = updatedInst
        this.band.lists[this.listIndex] = this.instrument
        this.$store.commit("data/setInstrument", null)
      } else {
        this.instrument = this.band.lists[this.listIndex]
      }
    }else{
      if(updatedInst != null) {
        this.instrument = updatedInst
        this.$store.commit("data/setInstrument", null)
      } else {
        this.instrument.type = this.$route.query.instrument
      }
    }

    this.pageTitle = this.instrument.type

    if(this.instrument.type === "ボーカル" || this.instrument.type === "コーラス" || this.instrument.type === "MC"){
      this.tag = "VOCAL"
      this.instrument.isVocal = true
      if(this.instrument.type === "ボーカル"){
        this.instrument.vocal.part = "ボーカル"
      }else if(this.instrument.type === "コーラス"){
        this.instrument.vocal.part = "コーラス"
      }
      else if(this.instrument.type === "MC"){
        this.instrument.vocal.part = "MC"
      }
    }

    if(this.instrument.type === "ギター" || this.instrument.type === "ベース"){
      this.instrument.isAmp = true
    }

    this.isCreated = true
  },
  mounted(){
    
  },
  methods:{

    createInstrument(){
      this.inactiveButton = true
      this.instrument.id = this._generateId("inst")
      this.band.lists.push({...this.instrument})
      db.editBand(this.band)
      .then(()=>{
        this.inactiveButton = false
        this.$router.push({name:'EditBand', params:{id: this.band.id}})
      })
      .catch((error)=>{
        this.inactiveButton = false
        console.log(error.message)
        this.errorMessage = "保存に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    },
    editInstrument(){
      this.inactiveButton = true
      this.band.lists[this.listIndex] = this.instrument
      db.editBand(this.band)
      .then(()=>{
        this.inactiveButton = false
        this.$router.push({name:'EditBand', params:{id: this.band.id}})
      })
      .catch((error)=>{
        this.inactiveButton = false
        console.log(error.message)
        this.errorMessage = "保存に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    },
    deleteInstrument(){
      this.inactiveButton = true
      this.band.lists.splice(this.listIndex, 1)
      db.editBand(this.band)
      .then(()=>{
        this.inactiveButton = false
        this.$router.push({name:'EditBand', params:{id: this.band.id}})
      })
      .catch((error)=>{
        this.inactiveButton = false
        console.log(error.message)
        this.errorMessage = "削除に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    },

    offMic(){
     this.instrument.isBroughtMic = false
    },

    editPosition(isAmp){
      if(isAmp && this.instrument.amp.type == null) {
        this._stop(true)
        this.alertMessage = "アンプの種別を選択して下さい。"
        this.isAlertShown = true
        return
      }
      this.$store.commit('data/setInstrument', this.instrument)
      this.$router.push({name:'EditPosition', params:{ isAmp } })
    },
    closeAlert(){
        this._stop(false)
        this.isAlertShown = false
    }
  },
	
  validations(){
    return{
      instrument:{
        member:{
          required,
          maxLength: maxLength(10)
        },
        vocal:{
          part:{
            isChecked: contains(this.instrument.isVocal)
          },
        },
        mic:{
          type:{
            isChecked: contains(this.instrument.isBroughtMic)
          },
          brand:{
            isChecked: contains(this.instrument.isBroughtMic),
            maxLength: maxLength(10)
          },
          model:{
            isChecked: contains(this.instrument.isBroughtMic),
            maxLength: maxLength(10)
          }
        },
        amp:{
          type:{
            isChecked: contains(this.instrument.isAmp)
          },
          brandOfHead:{
            maxLength: maxLength(10)
          },
          brandOfCab:{
            maxLength: maxLength(10)
          },
          brandOfCombo:{
            maxLength: maxLength(10)
          },
        },
        di:{
          brand:{
            isChecked: contains(this.instrument.idBroughtDi),
            maxLength: maxLength(10)
          },
          model:{
            isChecked: contains(this.instrument.idBroughtDi),
            maxLength: maxLength(10)
          }
        },
        drum:{
          bring:{
            maxLength: maxLength(50)
          }
        },

        sync:{
          type:{
            isChecked: contains(this.instrument.isSync)
          },
          channel:{
            isChecked: contains(this.instrument.isSync),
          },
          terminal:{
            isChecked: contains(this.instrument.isSync),
          },
        },
        syncForDrum:{
          type:{
            isChecked: contains(this.instrument.isSyncForDrum)
          },
          channel:{
            isChecked: contains(this.instrument.isSyncForDrum),
          },
          terminal:{
            isChecked: contains(this.instrument.isSyncForDrum),
          },
          site:{
            isChecked: contains(this.instrument.isSyncForDrum),
          },
        },
        monitor:{
          type:{
            isChecked: contains(this.instrument.isBroughtMonitor)
          },
          channel:{
            isChecked: contains(this.instrument.isBroughtMonitor),
          },
        },
        text:{
          maxLength: maxLength(50)
        },


      }
    }
  },
}
</script>
<style src="@vueform/toggle/themes/default.css"></style>
<style scoped>

</style>