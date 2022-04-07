<template>
  <div class="_base">
    <Spinner v-if="inactiveButton"></Spinner>
    <SubHeader  :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content">
      <p v-if="errorMessage !== ''" class="_error-message">{{errorMessage}}</p>
      <div class="_container">
        <label for="name" class="_label">セットリスト名</label><Helper :helperObject="helper.name"></Helper>
        <input type="text" v-model="setList.name" @blur="v$.setList.name.$touch()" placeholder="18文字以内で入力" :class="{'_input-error': v$.setList.name.$error}" class="_input-text">
        <p v-if="v$.setList.name.$error" class="_input-error-message">18文字以内で入力してください。</p>
      </div>

      <div class="_container">
        <p class="_label">SE</p><Helper :helperObject="helper.se"></Helper>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !setList.isSe}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !setList.isSe}">
            <p class="_multi-text">SE 有り</p>
            <Toggle v-model="setList.isSe" @click="_clearObject(setList.se)" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="setList.isSe" class="_multi-box">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="setList.se.typeOfSource" @blur="v$.setList.se.typeOfSource.$touch()" required :class="{'_input-select-exist': setList.se.typeOfSource !== null}" class="_multi-select" >
              <option :value="null" disabled >音源の種類を選択</option>
              <option v-for="typeOfSource in $store.getters['select/typeOfSource']" :key="typeOfSource.text" :value="typeOfSource.text" :style="{'color': '#131313'}" >音源の種類：{{typeOfSource.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="setList.se.typeOfSource === 'その他'" class="_multi-box" :class="{'_multi-box-error': v$.setList.se.nameOfSource.$error}">
          <div class="_multi-inner">
            <input type="text" v-model="setList.se.nameOfSource" @blur="v$.setList.se.nameOfSource.$touch()" placeholder="音源の名称を6字以内で入力" class="_multi-input-text">
          </div>
        </div>
        <div v-if="setList.isSe" class="_multi-box" :class="{'_multi-box-error': v$.setList.se.textForOpen.$error}">
          <div class="_flex-multi-inner">
            <textarea v-model="setList.se.textForOpen" @blur="v$.setList.se.textForOpen.$touch()" placeholder="開始指示を50文字以内で入力 任意" class="_multi-input-textarea"></textarea>
          </div>
        </div>
        <div v-if="setList.isSe" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.setList.se.textForClose.$error}">
          <div class="_flex-multi-inner _multi-inner-end">
            <textarea v-model="setList.se.textForClose" @blur="v$.setList.se.textForClose.$touch()" placeholder="終了指示を50文字以内で入力 任意" class="_multi-input-textarea"></textarea>
          </div>
        </div>
        <p v-if="v$.setList.se.nameOfSource.$error" class="_input-error-message">6文字以内で入力してください。</p>
        <p v-if="v$.setList.se.textForOpen.$error || v$.setList.se.textForClose.$error" class="_input-error-message">50文字以内で入力してください。</p>
      </div>

      <div class="_container">
        <p class="_label">セットリスト（曲順）</p><Helper :helperObject="helper.list"></Helper>
        <div class="add">
          <div @click="openAddLists('main')" class="add-button">
            <img src="@/assets/images/icon-music-blue.png" class="add-icon" alt="">
            <p class="add-text">楽曲の追加</p>
          </div>
          <div @click="addMc('main', musicLists)" class="add-button">
            <img src="@/assets/images/icon-mc-blue.png" class="add-icon" alt="">
            <p class="add-text">MCの追加</p>
          </div>
        </div>
        <div v-if="isShownAadLists" class="add-list">
          <div v-for="(music, index) in addLists" @click="addMusic('main', music, musicLists)" :key="index" class="_multi-box" :class="{'_multi-box-start': index === 0, '_multi-box-end': addLists.length -1 === index}" >
            <div class="_multi-inner" :class="{'_multi-inner-end': addLists.length -1 === index}">
              <p class="_multi-text">{{music.name}}</p>
              <img  src="@/assets/images/button-plus.png" alt="" class="_multi-icon _arrow">
            </div>
          </div>
        </div>
        <div v-if="musicLists.length !== 0" class="list">
          <div class="list-container">
            <draggable v-model="musicLists" group="list" item-key="dummyId" handle=".handle">
              <template #item="{element, index}">
                <div class="list-box">
                  <div v-if="element.type === 'music'" class="list-left handle">
                    <img src="@/assets/images/icon-music-blue.png" alt="" class="list-icon">
                    <!-- <p class="list-name">{{index + 1}}. {{element.name}}</p> -->
                    <p class="list-name">{{element.name}}</p>
                  </div>
                  <div v-if="element.type === 'mc'" class="list-left handle">
                    <img src="@/assets/images/icon-mc-blue.png" alt="" class="list-icon">
                    <p class="list-name">MC</p>
                  </div>
                  <img src="@/assets/images/button-cross.png" @click="removeMusic(musicLists, index)" class="list-right">
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
      
      <div class="_container">
        <p class="_label">END SE</p><Helper :helperObject="helper.endSe"></Helper>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !setList.isEndSe}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !setList.isEndSe}">
            <p class="_multi-text">END SE 有り</p>
            <Toggle v-model="setList.isEndSe" @click="_clearObject(setList.endSe)" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="setList.isEndSe" class="_multi-box">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="setList.endSe.typeOfSource" @blur="v$.setList.endSe.typeOfSource.$touch()" required :class="{'_input-select-exist': setList.endSe.typeOfSource !== null}" class="_multi-select" >
              <option :value="null" disabled >音源の種類を選択</option>
              <option v-for="typeOfSource in $store.getters['select/typeOfSource']" :key="typeOfSource.text" :value="typeOfSource.text" :style="{'color': '#131313'}" >音源の種類：{{typeOfSource.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="setList.endSe.typeOfSource === 'その他'" class="_multi-box" :class="{'_multi-box-error': v$.setList.endSe.nameOfSource.$error}">
          <div class="_multi-inner">
            <input type="text" v-model="setList.endSe.nameOfSource" @blur="v$.setList.endSe.nameOfSource.$touch()" placeholder="音源の名称を6字以内で入力" class="_multi-input-text">
          </div>
        </div>
        <div v-if="setList.isEndSe" class="_multi-box" :class="{'_multi-box-error': v$.setList.endSe.textForOpen.$error}">
          <div class="_flex-multi-inner">
            <textarea v-model="setList.endSe.textForOpen" @blur="v$.setList.endSe.textForOpen.$touch()" placeholder="開始指示を50文字以内で入力 任意" class="_multi-input-textarea"></textarea>
          </div>
        </div>
        <div v-if="setList.isEndSe" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.setList.endSe.textForClose.$error}">
          <div class="_flex-multi-inner _multi-inner-end">
            <textarea v-model="setList.endSe.textForClose" @blur="v$.setList.endSe.textForClose.$touch()" placeholder="終了指示を50文字以内で入力 任意" class="_multi-input-textarea"></textarea>
          </div>
        </div>
        <p v-if="v$.setList.endSe.nameOfSource.$error" class="_input-error-message">6文字以内で入力してください。</p>
        <p v-if="v$.setList.endSe.textForOpen.$error || v$.setList.endSe.textForClose.$error" class="_input-error-message">50文字以内で入力してください。</p>
      </div>

      <div class="_container">
        <p class="_label">アンコール</p><Helper :helperObject="helper.encore"></Helper>
        <div class="_box">
          <div class="_text-inner">
            <p class="_text">アンコール有り</p>
            <Toggle v-model="setList.isEncore" @click="clearEncoreObject()" class="_multi-toggle" />
          </div>
        </div>
      </div>

      <div v-if="setList.isEncore" class="encore">
        <div class="_container">
          <p class="_label">アンコール SE</p><Helper :helperObject="helper.encoreSe"></Helper>
          <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !setList.isSeOfEncore}">
            <div class="_multi-inner" :class="{'_multi-inner-end': !setList.isSeOfEncore}">
              <p class="_multi-text">アンコール SE 有り</p>
              <Toggle v-model="setList.isSeOfEncore" @click="_clearObject(setList.seOfEncore)" class="_multi-toggle" />
            </div>
          </div>
          <div v-if="setList.isSeOfEncore" class="_multi-box">
            <div class="_multi-inner">
              <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
              <select v-model="setList.seOfEncore.typeOfSource" @blur="v$.setList.seOfEncore.typeOfSource.$touch()" required :class="{'_input-select-exist': setList.seOfEncore.typeOfSource !== null}" class="_multi-select" >
                <option :value="null" disabled >音源の種類を選択</option>
                <option v-for="typeOfSource in $store.getters['select/typeOfSource']" :key="typeOfSource.text" :value="typeOfSource.text" :style="{'color': '#131313'}" >音源の種類：{{typeOfSource.text}}</option>
              </select>
            </div>
          </div>
          <div v-if="setList.seOfEncore.typeOfSource === 'その他'" class="_multi-box" :class="{'_multi-box-error': v$.setList.seOfEncore.nameOfSource.$error}">
            <div class="_multi-inner">
              <input type="text" v-model="setList.seOfEncore.nameOfSource" @blur="v$.setList.seOfEncore.nameOfSource.$touch()" placeholder="音源の名称を6字以内で入力" class="_multi-input-text">
            </div>
          </div>
          <div v-if="setList.isSeOfEncore" class="_multi-box" :class="{'_multi-box-error': v$.setList.seOfEncore.textForOpen.$error}">
            <div class="_flex-multi-inner">
              <textarea v-model="setList.seOfEncore.textForOpen" @blur="v$.setList.seOfEncore.textForOpen.$touch()" placeholder="開始指示を50文字以内で入力 任意" class="_multi-input-textarea"></textarea>
            </div>
          </div>
          <div v-if="setList.isSeOfEncore" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.setList.seOfEncore.textForClose.$error}">
            <div class="_flex-multi-inner _multi-inner-end">
              <textarea v-model="setList.seOfEncore.textForClose" @blur="v$.setList.seOfEncore.textForClose.$touch()" placeholder="終了指示を50文字以内で入力 任意" class="_multi-input-textarea"></textarea>
            </div>
          </div>
          <p v-if="v$.setList.seOfEncore.nameOfSource.$error" class="_input-error-message">6文字以内で入力してください。</p>
          <p v-if="v$.setList.seOfEncore.textForOpen.$error || v$.setList.seOfEncore.textForClose.$error" class="_input-error-message">50文字以内で入力してください。</p>
        </div>

        <div class="_container">
          <p class="_label">アンコールリスト</p>
          <div class="add">
            <div @click="openAddLists('encore')" class="add-button">
              <img src="@/assets/images/icon-music-blue.png" class="add-icon" alt="">
              <p class="add-text">楽曲の追加</p>
            </div>
            <div @click="addMc('encore', musicListsOfEncore)" class="add-button">
              <img src="@/assets/images/icon-mc-blue.png" class="add-icon" alt="">
              <p class="add-text">MCの追加</p>
            </div>
          </div>
          <div v-if="isShownAadListsOfEncore" class="add-list">
            <div v-for="(music, index) in addLists" @click="addMusic('encore', music, musicListsOfEncore)" :key="index" class="_multi-box" :class="{'_multi-box-start': index === 0, '_multi-box-end': addLists.length -1 === index}" >
              <div class="_multi-inner" :class="{'_multi-inner-end': addLists.length -1 === index}">
                <p class="_multi-text">{{music.name}}</p>
                <img  src="@/assets/images/button-plus.png" alt="" class="_multi-icon _arrow">
              </div>
            </div>
          </div>
          <div v-if="musicListsOfEncore.length !== 0" class="list">
            <div class="list-container">
              <draggable v-model="musicListsOfEncore" group="list" item-key="dummyId" handle=".handle">
                <template #item="{element, index}">
                  <div class="list-box">
                    <div v-if="element.type === 'music'" class="list-left handle">
                      <img src="@/assets/images/icon-music-blue.png" alt="" class="list-icon">
                      <p class="list-name">{{index + 1}}. {{element.name}}</p>
                    </div>
                    <div v-if="element.type === 'mc'" class="list-left handle">
                      <img src="@/assets/images/icon-mc-blue.png" alt="" class="list-icon">
                      <p class="list-name">{{index + 1}}. MC</p>
                    </div>
                    <img src="@/assets/images/button-cross.png" @click="removeMusic(musicListsOfEncore, index)" class="list-right">
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </div>

        <div class="_container">
          <p class="_label">アンコール END SE</p><Helper :helperObject="helper.encoreEndSe"></Helper>
          <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !setList.isEndSeOfEncore}">
            <div class="_multi-inner" :class="{'_multi-inner-end': !setList.isEndSeOfEncore}">
              <p class="_multi-text">アンコール END SE 有り</p>
              <Toggle v-model="setList.isEndSeOfEncore" @click="_clearObject(setList.endSeOfEncore)" class="_multi-toggle" />
            </div>
          </div>
          <div v-if="setList.isEndSeOfEncore" class="_multi-box">
            <div class="_multi-inner">
              <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
              <select v-model="setList.endSeOfEncore.typeOfSource" @blur="v$.setList.endSeOfEncore.typeOfSource.$touch()" required :class="{'_input-select-exist': setList.endSeOfEncore.typeOfSource !== null}" class="_multi-select" >
                <option :value="null" disabled >音源の種類を選択</option>
                <option v-for="typeOfSource in $store.getters['select/typeOfSource']" :key="typeOfSource.text" :value="typeOfSource.text" :style="{'color': '#131313'}" >音源の種類：{{typeOfSource.text}}</option>
              </select>
            </div>
          </div>
          <div v-if="setList.endSeOfEncore.typeOfSource === 'その他'" class="_multi-box" :class="{'_multi-box-error': v$.setList.endSeOfEncore.nameOfSource.$error}">
            <div class="_multi-inner">
              <input type="text" v-model="setList.endSeOfEncore.nameOfSource" @blur="v$.setList.endSeOfEncore.nameOfSource.$touch()" placeholder="音源の名称を6字以内で入力" class="_multi-input-text">
            </div>
          </div>
          <div v-if="setList.isEndSeOfEncore" class="_multi-box" :class="{'_multi-box-error': v$.setList.endSeOfEncore.textForOpen.$error}">
            <div class="_flex-multi-inner">
              <textarea v-model="setList.endSeOfEncore.textForOpen" @blur="v$.setList.endSeOfEncore.textForOpen.$touch()" placeholder="開始指示を50文字以内で入力 任意" class="_multi-input-textarea"></textarea>
            </div>
          </div>
          <div v-if="setList.isEndSeOfEncore" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.setList.endSeOfEncore.textForClose.$error}">
            <div class="_flex-multi-inner _multi-inner-end">
              <textarea v-model="setList.endSeOfEncore.textForClose" @blur="v$.setList.endSeOfEncore.textForClose.$touch()" placeholder="終了指示を50文字以内で入力 任意" class="_multi-input-textarea"></textarea>
            </div>
          </div>
          <p v-if="v$.setList.endSeOfEncore.nameOfSource.$error" class="_input-error-message">6文字以内で入力してください。</p>
          <p v-if="v$.setList.endSeOfEncore.textForOpen.$error || v$.setList.endSeOfEncore.textForClose.$error" class="_input-error-message">50文字以内で入力してください。</p>
        </div>
      </div>

      <div class="_container">
        <label for="textForSound" class="_label">その他、要望など</label><Helper :helperObject="helper.note"></Helper>
        <textarea v-model="setList.text" @blur="v$.setList.text.$touch()" placeholder="200文字以内で入力 任意" :class="{'_input-error': v$.setList.text.$error}" class="_input-textarea"></textarea>
        <p v-if="v$.setList.text.$error" class="_input-error-message">200文字以内で入力してください。</p>
      </div>
      
      <div v-if="this.mode === 'create'" class="_button-container">
        <button  :disabled="v$.setList.$invalid || inactiveButton" @click="createSetList()" :class="{'_invalid-button': v$.setList.$invalid}" class="_button-s">保存</button>
        <div v-if="v$.setList.$invalid" class="_invalid-text"></div>
      </div>
      <div v-if="this.mode === 'edit'" class="_button-container">
        <button  :disabled="v$.setList.$invalid || inactiveButton" @click="editSetList()" :class="{'_invalid-button': v$.setList.$invalid}" class="_button-s">保存</button>
        <div v-if="v$.setList.$invalid" class="_invalid-text"></div>
        <button  :disabled="inactiveButton" @click="deleteSetList()"  class="_button-red _marginM-up">削除</button>
      </div>

    </div>
    <Alert :isShown="isAlertShown" :message="alertMessage" @closeAlert="closeAlert()"></Alert>
    <Footer></Footer>
  </div>
</template>

<script>

import SubHeader from '@/components/SubHeader.vue'
import Helper from '@/components/Helper.vue'
import Spinner from '@/components/Spinner.vue'
import Alert from '@/components/Alert.vue'
import Footer from '@/components/Footer.vue'

import Mixin from '@/mixin/mixin.js'

import SetList from '@/class/SetList.js'

import db from '@/firebase/modules/db.js'
import Toggle from '@vueform/toggle'
import draggable from 'vuedraggable'
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
  name: 'CreateSetList',
  components: {
    Spinner,
    SubHeader,
    Helper,
    Toggle,
    Alert,
    Footer,
    draggable
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
      pageTitle: "セットリストの作成",
      isBack: true,
      isPcTitle: true,
      inactiveButton: false,
      mode: "create", //"create", "edit"
      errorMessage: "",

      setList: new SetList(),
      musicLists: [], //表示用のリスト。名前データをこの時点では持っているが、保存前に破棄し本番用データを構築する。
      musicListsOfEncore: [],
      addLists: [], //登録楽曲一覧
      isShownAadLists: false,
      isShownAadListsOfEncore: false,

      helper:{
        name:{
          title:"セットリスト名",
          text:"セットリストの名前を記入して下さい。\n記入した名前で保存され、保存セットリスト一覧に表示されます。\nセットリスト名は完成したセットリスト(PDF)の内容には記載されません。"
        },
        se:{
          title:"SE",
          text:"オープニングSEがある場合は設定して下さい。\n\n【音源の種類を選択】\n該当するものを選択して下さい。\n\n【開始指示を入力】\nSEを再生するキッカケを記入して下さい。\n\n例）セッティング終了後ハケてから再生\n【終了指示を入力】\nSEを終了するキッカケを記入して下さい。\n\n例）流し切り\n例）メンバーの合図でF・O　(フェードアウト)\n例）楽器全体INでC・O(カットアウト)\n\n【用語説明】\n流し切り (曲が終わるまで)\nF・O (フェードアウト)少しずつ音量を下げていく\nC・O (カットアウト)急に消す"
        },
        list:{
          title:"セットリスト（曲順）",
          text:"【楽曲の追加】で登録済みの楽曲から使用する曲を選択するとリストに追加されます。\n【楽曲の追加】と【MCの追加】で上から順番に曲順を並べて下さい。\n追加後、ドラッグ＆ドロップで順番を並び変えることも可能です。\n曲名の右端【×】ボタンで削除。"
        },
        endSe:{
          title:"END SE",
          text:"エンドSEがある場合は設定して下さい。\n例）ラストの曲終わりで再生\n\n【終了指示を入力】\nSEを終了するキッカケを記入して下さい。\n\n例）メンバーがハケたらF・O　(フェードアウト)"
        },
        encore:{
          title:"アンコール",
          text:"アンコール有りにするとアンコール用のリストが表示されます。\n本編のリスト同様【楽曲の追加】と【MCの追加】で上から順番に曲順を並べて下さい。"
        },
        encoreSe:{
          title:"アンコールSE",
          text:"アンコールにてオープニングSEがある場合は設定して下さい。"
        },
        encoreEndSe:{
          title:"アンコールEND SE",
          text:"アンコールにてEND SEがある場合は設定して下さい。"
        },
        note:{
          title:"その他、要望など",
          text:"全体の要望や、ライブスルーの機能で表現出来ない事があれば記入して下さい。"
        },
      },

      // アラートモーダル用
      isAlertShown: false,
      alertMessage: "楽曲・MCの追加上限に達しました。",

    }
  },
  async created(){
    this._authCheck()
    await db.getMusics(this.$store.getters['auth/userId'])
    .then((querySnapShot)=>{
      if(querySnapShot.empty){
        this.errorMessage = "まだ楽曲が登録されていません。【楽曲の登録・編集】から楽曲を登録して下さい。"
      }else{
        querySnapShot.forEach(doc => {
          this.addLists.push(doc.data())
        })
      }
    })
    .catch((error)=>{
      this.errorMessage = "データの取得に失敗しました。"
      console.log(error.message)
    })

    if(this.$route.params.id){
      this.mode = "edit"
      this.pageTitle = "セットリスの編集"
      
      db.getSetList(this.$route.params.id)
      .then((doc)=>{
        this.setList = doc.data()
        this._userCheck(this.setList.userId)
        this.setList.lists.sort((a, b)=>{
          if(a.order < b.order){return -1}
          if(a.order > b.order){return 1}
          return 0
        })
        this.resetLists(this.setList.lists, this.musicLists)
        if(this.setList.listsOfEncore.length !== 0){
          // アンコールリストがある場合
          this.resetLists(this.setList.listsOfEncore, this.musicListsOfEncore)
        }
      })
      .catch((error)=>{
        this.errorMessage = "データの取得に失敗しました。"
        console.log(error.message)
      })
    }


  },
  mounted(){
    
  },
  methods:{
    clearEncoreObject(){
      this.setList.isSeOfEncore = false
      this.musicListsOfEncore = []
      this.isShownAadListsOfEncore = false
      this._clearObject(this.setList.seOfEncore)
      this.setList.isEndSeOfEncore = false
      this._clearObject(this.setList.endSeOfEncore)
    },
    openAddLists(type){
      if(type === "main"){
        if(this.musicLists.length >= 19){
          this._stop(true)
          this.isAlertShown = true
        }else{
          this.isShownAadLists = !this.isShownAadLists
        }
      }else if(type === "encore"){
        if(this.musicListsOfEncore.length >= 5){
          this._stop(true)
          this.isAlertShown = true
        }else{
          this.isShownAadListsOfEncore = !this.isShownAadListsOfEncore
        }
      }
    },
    addMusic(type, music, displayLists){
      let musicObject = {}
      musicObject.dummyId = this._generateId("dummy")
      musicObject.type = "music"
      musicObject.id = music.id
      musicObject.truckNumber = null
      musicObject.displayOrder = null
      musicObject.name = music.name
      displayLists.push(musicObject)
      if(type === "main"){
        this.isShownAadLists = false
      }else if(type === "encore"){
        this.isShownAadListsOfEncore = false
      }
    },
    addMc(type, displayLists){
      if(type === "main" && this.musicLists.length >= 17){
        this._stop(true)
        this.isAlertShown = true
      }else if(type === "encore" && this.musicListsOfEncore.length >= 5){
        this._stop(true)
        this.isAlertShown = true
      }else{
        let musicObject = {}
        musicObject.dummyId = this._generateId("dummy")
        musicObject.type = "mc"
        musicObject.id = null
        musicObject.truckNumber = null
        musicObject.displayOrder = null
        musicObject.name = null
        displayLists.push(musicObject)
      }
    },
    removeMusic(displayLists, index){
      displayLists.splice(index, 1)
    },
    createSetList(){
      this.inactiveButton = true
      this.setList.userId = this.$store.getters['auth/userId']
      this.set(this.musicLists, this.setList.lists)
      this.set(this.musicListsOfEncore, this.setList.listsOfEncore)
      db.createSetList(this.setList)
      .then(()=>{
        this.inactiveButton = false
        this.$router.push({name:'SetList'})
      })
      .catch((error)=>{
        this.inactiveButton = false
        console.log(error.message)
        this.errorMessage = "作成に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    },
    editSetList(){
      this.inactiveButton = true
      this.setList.lists = []
      this.setList.listsOfEncore = []
      this.set(this.musicLists, this.setList.lists)
      this.set(this.musicListsOfEncore, this.setList.listsOfEncore)
      db.editSetList(this.setList)
      .then(()=>{
        this.inactiveButton = false
        this.$router.push({name:'ShowSetList', params:{id: this.setList.id}})
      })
      .catch((error)=>{
        this.inactiveButton = false
        console.log(error.message)
        this.errorMessage = "編集に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    },
    deleteSetList(){
      db.deleteSetList(this.setList.id)
      .then(()=>{
        this.$router.push({name:'SetList'})
      })
      .catch((error)=>{
        console.log(error.message)
        this.errorMessage = "削除に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    },

    // 編集時のリストセット
    resetLists(dataLists, displayLists){
      dataLists.sort((a, b)=>{
        if(a.order < b.order){return -1}
        if(a.order > b.order){return 1}
        return 0
      })
      for (const music of dataLists){
        let musicObject = {}
        musicObject.dummyId = this._generateId(String(music.order))
        if(music.type === "mc"){
          musicObject.type = "mc"
          musicObject.id = null
          musicObject.truckNumber = null
          musicObject.name = null
          displayLists.push(musicObject)
        }else if(music.type === "music"){
          musicObject.type = "music"
          musicObject.id = music.id
          musicObject.truckNumber = music.truckNumber
          const matchMusic = this.addLists.find((addMusic) => addMusic.id === music.id)
          musicObject.name = matchMusic.name
          displayLists.push(musicObject)
        }
      }
    },

    // 保存時の本番用リストへの変換
    async set(displayLists, dataLists){
      let counter = 1
      for(let music of displayLists){
        if(music.type === 'music'){
          music.displayOrder = counter
          counter = ++counter
        }else if(music.type === "mc"){
          music.displayOrder = null
        }
      }

      await Promise.all(displayLists.map((music, index) =>{
        const listObject = {}
        listObject.type = music.type
        listObject.id = music.id
        listObject.truckNumber = music.truckNumber
        listObject.order = index
        listObject.displayOrder = music.displayOrder
        dataLists.push(listObject)
      }))
    },

    closeAlert(){
      this._stop(false)
      this.isAlertShown = false
    },
  },
	


  validations(){
    return{
      setList:{
        name:{
          required,
          maxLength: maxLength(18)
        },
        se:{
          typeOfSource:{
            isChecked: contains(this.setList.isSe)
          },
          nameOfSource:{
            maxLength: maxLength(6)
          },
          textForOpen:{
            maxLength: maxLength(50)
          },
          textForClose:{
            maxLength: maxLength(50)
          }
        },
        endSe:{
          typeOfSource:{
            isChecked: contains(this.setList.isEndSe)
          },
          nameOfSource:{
            maxLength: maxLength(6)
          },
          textForOpen:{
            maxLength: maxLength(50)
          },
          textForClose:{
            maxLength: maxLength(50)
          }
        },
        seOfEncore:{
          typeOfSource:{
            isChecked: contains(this.setList.isSeOfEncore)
          },
          nameOfSource:{
            maxLength: maxLength(6)
          },
          textForOpen:{
            maxLength: maxLength(50)
          },
          textForClose:{
            maxLength: maxLength(50)
          }
        },
        endSeOfEncore:{
          typeOfSource:{
            isChecked: contains(this.setList.isEndSeOfEncore)
          },
          nameOfSource:{
            maxLength: maxLength(6)
          },
          textForOpen:{
            maxLength: maxLength(50)
          },
          textForClose:{
            maxLength: maxLength(50)
          }
        },
        text:{
          maxLength: maxLength(200)
        },
      }
    }
  },
}
</script>
<style src="@vueform/toggle/themes/default.css"></style>
<style scoped>
.add{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.add-button{
  display: block;
  text-align: center;
  position: relative;
  width: 48%;
  height: 50px;
  border-radius: 4px;
  background-color: var(--white);
  cursor: pointer;
}
.add-icon{
  position: absolute;
  width: 25px;
  height: 25px;
  left: 10px;
  top: 50%;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
}
.add-text{
  color: var(--blue);
  line-height: 50px;
  font-size: 1.6rem;
  font-weight: 600;
}
.list{
  background-color: var(--white);
  border-radius: 4px;
  margin-top: 10px;
}
.list-container{
  width: calc(100% - 32px);
  margin: 0 auto;
  padding: 16px 0 6px;
}
.list-box{
  height: 45px;
  border: 3px solid var(--blue);
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  position: relative;
  cursor: pointer;
}
.list-left{
  position: relative;
  width: calc(100% - 50px);
  height: 39px;
  width: 85%; /* この幅を超えると省略 */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.list-name{
  line-height: 39px;
  position: absolute;
  left: 45px;
}
.list-icon{
  position: absolute;
  width: 25px;
  height: 25px;
  left: 10px;
  top: 50%;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
}
.list-right{
  width: 25px;
  height: 25px;
  position: absolute;
  right: 10px;
  top: 50%;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
}
</style>