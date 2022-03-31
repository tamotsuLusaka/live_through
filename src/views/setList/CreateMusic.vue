<template>
  <div class="_base">
    <Spinner v-if="inactiveButton"></Spinner>
    <SubHeader  :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content">
      <p v-if="errorMessage !== ''" class="_error-message">{{errorMessage}}</p>
      <div class="_container">
        <label for="name" class="_label">曲名</label>
        <input type="text" v-model="music.name" @blur="v$.music.name.$touch()" placeholder="18文字以内で入力" :class="{'_input-error': v$.music.name.$error}" class="_input-text">
        <p v-if="v$.music.name.$error" class="_input-error-message">18文字以内で入力してください。</p>
      </div>
      <div class="_container">
        <label for="tune" class="_label">曲調</label>
        <div class="_select-box">
          <label for="tune" class="_select-icon"><img src="@/assets/images/icon-arrow-b.png" alt="" class="_arrow"></label>
          <select v-model="music.tune" @blur="v$.music.tune.$touch()" required :class="{'_input-error': v$.music.tune.$error, '_input-select-exist': music.tune !== null}" class="_input-select" >
            <option :value="null" class="_select-default" disabled >曲調を選択</option>
            <option v-for="tune in $store.getters['select/tune']" :key="tune.text" :style="{'color': '#131313'}" :value="tune.text"  >{{tune.text}}</option>
          </select>
        </div>
      </div>
      <div class="_container">
        <label for="textForSound" class="_label">音響要望</label><Helper :helperObject="helper.sound"></Helper>
        <textarea v-model="music.textForSound" @blur="v$.music.textForSound.$touch()" placeholder="100文字以内で入力 任意" :class="{'_input-error': v$.music.textForSound.$error}" class="_input-textarea"></textarea>
        <p v-if="v$.music.textForSound.$error" class="_input-error-message">100文字以内で入力してください。</p>
      </div>
      <div class="_container">
        <label for="textForLighting" class="_label">照明要望</label><Helper :helperObject="helper.light"></Helper>
        <textarea v-model="music.textForLighting" @blur="v$.music.textForLighting.$touch()" placeholder="100文字以内で入力 任意" :class="{'_input-error': v$.music.textForLighting.$error}" class="_input-textarea"></textarea>
        <p v-if="v$.music.textForLighting.$error" class="_input-error-message">100文字以内で入力してください。</p>
      </div>
      <div class="_container">
        <p class="_label">音源</p><Helper :helperObject="helper.source"></Helper>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !music.isSource}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !music.isSource}">
            <p class="_multi-text">音源を使用</p>
            <Toggle v-model="music.isSource" @click="_clearObject(music.source)" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="music.isSource" class="_multi-box">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="music.source.typeOfSource" @blur="v$.music.source.typeOfSource.$touch()" required :class="{'_input-error': v$.music.source.typeOfSource.$error, '_input-select-exist': music.source.typeOfSource !== null}" class="_multi-select" >
              <option :value="null" class="_select-default" disabled >音源の種類を選択</option>
              <option v-for="typeOfSource in $store.getters['select/typeOfSource']" :key="typeOfSource.text" :value="typeOfSource.text" :style="{'color': '#131313'}" >音源の種類：{{typeOfSource.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="music.source.typeOfSource === 'その他'" class="_multi-box" :class="{'_multi-box-error': v$.music.source.nameOfSource.$error}">
          <div class="_multi-inner">
            <input type="text" v-model="music.source.nameOfSource" @blur="v$.music.source.nameOfSource.$touch()" placeholder="音源の名称を6字以内で入力" class="_multi-input-text">
          </div>
        </div>
        <div v-if="music.isSource" class="_multi-box">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="music.source.min" @blur="v$.music.source.min.$touch()" :class="{'_input-select-exist': music.source.min !== null}" class="_multi-select" >
              <option :value="null" disabled >音源の時間【分】を選択</option>
              <option v-for="n in 59" :key="n" :value="n" :style="{'color': '#131313'}" >音源の分数：{{n}}分</option>
            </select>
          </div>
        </div>
        <div v-if="music.isSource" class="_multi-box _multi-box-end" >
          <div class="_multi-inner _multi-inner-end">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="music.source.sec" @change="_selectColor($event)"  :class="{'_input-select-exist': music.source.sec !== null}" class="_multi-select" >
              <option :value="null" disabled >音源の時間【秒】を選択</option>
              <option v-for="n in 59" :key="n" :value="n" :style="{'color': '#131313'}" >音源の秒数：{{n}}秒</option>
            </select>
          </div>
        </div>
        <p v-if="v$.music.source.nameOfSource.$error" class="_input-error-message">6字以内で入力してください。</p>
      </div>
      
      <div v-if="this.mode === 'create'" class="_button-container">
        <button  :disabled="v$.music.$invalid || inactiveButton" @click="createMusic()" :class="{'_invalid-button': v$.music.$invalid}" class="_button-s">登録</button>
      </div>
      <div v-if="this.mode === 'edit'" class="_button-container">
        <button  :disabled="v$.music.$invalid || inactiveButton" @click="editMusic()" :class="{'_invalid-button': v$.music.$invalid}" class="_button-s _marginM">登録</button>
        <button  :disabled="inactiveButton" @click="deleteMusic()"  class="_button-red">削除</button>
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

import Music from '@/class/Music.js'

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
  name: 'CreateMusic',
  components: {
    Spinner,
    SubHeader,
    Helper,
    Toggle,
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
      pageTitle: "楽曲の新規登録",
      isBack: true,
      isPcTitle: true,
      inactiveButton: false,
      mode: "create", //"create", "edit"
      errorMessage: "",

      music: new Music(),
      helper:{
        sound:{
          title:"音響要望",
          text:"音響への要望がある場合は入力。"
        },
        light:{
          title:"照明要望",
          text:"照明への要望がある場合は入力。"
        },
        source:{
          title:"音源",
          text:"曲のオケ等、PAから再生する音源がある場合はチェックを入れて音源の種類・時間を設定して下さい。"
        },
      },

    }
  },
  created(){
    this._authCheck()
    if(this.$route.params.id){
      this.mode = "edit"
      this.pageTitle = "楽曲の編集"
      db.getMusic(this.$route.params.id)
      .then((doc)=>{
        this.music = doc.data()
        this._userCheck(this.music.userId)
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
    createMusic(){
      this.inactiveButton = true
      this.music.userId = this.$store.getters['auth/userId']
      db.createMusic(this.music)
      .then(()=>{
        this.inactiveButton = false
        this.$router.push({name:'Music'})
      })
      .catch((error)=>{
        this.inactiveButton = false
        console.log(error.message)
        this.errorMessage = "登録に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    },
    editMusic(){
      db.editMusic(this.music)
      .then(()=>{
        this.inactiveButton = false
        this.$router.push({name:'Music'})
      })
      .catch((error)=>{
        console.log(error.message)
        this.errorMessage = "更新に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    },
    deleteMusic(){
      db.deleteMusic(this.music.id)
      .then(()=>{
        this.$router.push({name:'Music'})
      })
      .catch((error)=>{
        console.log(error.message)
        this.errorMessage = "削除に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    }
  },
	


  validations(){
    return{
      music:{
        name:{
          required,
          maxLength: maxLength(18)
        },
        tune:{
          required
        },
        textForSound:{
          maxLength: maxLength(100)
        },
        textForLighting:{
          maxLength: maxLength(100)
        },
        source:{
          typeOfSource:{
            isChecked: contains(this.music.isSource)
          },
          nameOfSource:{
            maxLength: maxLength(6)
          },
        }
      }
    }
  },
}
</script>
<style src="@vueform/toggle/themes/default.css"></style>
<style scoped>

</style>