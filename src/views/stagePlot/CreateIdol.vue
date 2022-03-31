<template>
  <div class="_base">
    <Spinner v-if="inactiveButton"></Spinner>
    <SubHeader  :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content">
      <p v-if="errorMessage !== ''" class="_error-message">{{errorMessage}}</p>
      <div class="_container">
        <label for="name" class="_label">ステージプロット名</label><Helper :helperObject="helper.name"></Helper>
        <input type="text" v-model="idol.name" @blur="v$.idol.name.$touch()" placeholder="18文字以内で入力" :class="{'_input-error': v$.idol.name.$error}" class="_input-text">
        <p v-if="v$.idol.name.$error" class="_input-error-message">18文字以内で入力してください。</p>
      </div>
      <div class="_container">
        <label class="_label">メンバーリスト</label><Helper :helperObject="helper.member"></Helper>
        <div @click="addMember()" class="_link-mini-white _marginSS">
          <img src="@/assets/images/icon-person-blue.png" class="_link-mini-icon" alt="">
          <p class="_link-mini-text">メンバーを追加</p>
        </div>
        <div v-for="(member, index) in idol.lists" :key="index" class="_multi-box" :class="{'_multi-box-start': index === 0, '_multi-box-end': idol.lists.length -1 === index}" >
          <div @click="editMember(member.id)" class="_multi-inner" :class="{'_multi-inner-end': idol.lists.length -1 === index}">
            <img  src="@/assets/images/icon-arrow-r.png" alt="" class="_multi-icon _arrow">
            <p class="_multi-text"><span v-if="member.micNumber !== null">Mic.{{member.micNumber}}：</span>{{member.name}}</p>
          </div>
        </div>
      </div>

      <div class="_container">
        <p class="_label">ワイヤレスマイク</p><Helper :helperObject="helper.mic"></Helper>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !idol.isBroughtMic}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !idol.isBroughtMic}">
            <p class="_multi-text">持込み有り</p>
            <Toggle v-model="idol.isBroughtMic" @click="_clearObject(idol.mic)" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="idol.isBroughtMic"  class="_multi-box" :class="{'_multi-box-error': v$.idol.mic.type.$error}">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="idol.mic.type" @blur="v$.idol.mic.type.$touch()" required :class="{'_input-select-exist': idol.mic.type !== null}" class="_multi-select" >
              <option :value="null" disabled >持込み機材を選択</option>
              <option v-for="select in $store.getters['select/lineW']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="idol.isBroughtMic" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.idol.mic.text.$error}">
          <div class="_flex-multi-inner _multi-inner-end">
            <textarea type="text" v-model="idol.mic.text" @blur="v$.idol.mic.text.$touch()" placeholder="メモを50字以内で入力 任意" class="_multi-input-textarea"></textarea>
          </div>
        </div>
        <p v-if="v$.idol.mic.text.$error || v$.idol.mic.text.$error" class="_input-error-message">50文字以内で入力してください。</p>
        <p v-if="!idol.isBroughtMic" class="_explanation _marginSS-up">※持込みをしない場合は主催レンタル</p>
      </div>

      <div class="_container">
        <p class="_label">音源（オケ）</p><Helper :helperObject="helper.music"></Helper>
        <div  class="_multi-box _multi-box-start" :class="{'_multi-box-error': v$.idol.source.type.$error}">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="idol.source.type" @blur="v$.idol.source.type.$touch()" required :class="{'_input-select-exist': idol.source.type !== null}" class="_multi-select" >
              <option :value="null" disabled >音源を選択</option>
              <option v-for="select in $store.getters['select/typeOfSource']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="idol.source.type === 'その他'" class="_multi-box" :class="{'_multi-box-error': v$.idol.source.other.$error}">
          <div class="_multi-inner">
            <input type="text" v-model="idol.source.other" @blur="v$.idol.source.other.$touch()" placeholder="音源名を10字以内で入力" class="_multi-input-text">
          </div>
        </div>
        <div class="_multi-box" :class="{'_multi-box-error': v$.idol.source.terminal.$error}">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="idol.source.terminal" @blur="v$.idol.source.terminal.$touch()" required :class="{'_input-select-exist': idol.source.terminal !== null}" class="_multi-select" >
              <option :value="null" disabled >アウト端子を選択</option>
              <option v-for="select in $store.getters['select/terminal']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.idol.source.channel.$error}">
          <div class="_multi-inner _multi-inner-end">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="idol.source.channel" @blur="v$.idol.source.channel.$touch()" required :class="{'_input-select-exist': idol.source.channel !== null}" class="_multi-select" >
              <option :value="null" disabled >チャンネル数を選択</option>
              <option v-for="select in $store.getters['select/twoChannel']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <p v-if="v$.idol.source.other.$error" class="_input-error-message">10文字以内で入力してください。</p>
      </div>

      <div class="_container">
        <p class="_label">イヤモニ</p><Helper :helperObject="helper.monitor"></Helper>
        <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': !idol.isBroughtMonitor}">
          <div class="_multi-inner" :class="{'_multi-inner-end': !idol.isBroughtMonitor}">
            <p class="_multi-text">持込み有り</p>
            <Toggle v-model="idol.isBroughtMonitor" @click="_clearObject(idol.monitor)" class="_multi-toggle" />
          </div>
        </div>
        <div v-if="idol.isBroughtMonitor"  class="_multi-box" :class="{'_multi-box-error': v$.idol.monitor.type.$error}">
          <div class="_multi-inner">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="idol.monitor.type" @blur="v$.idol.monitor.type.$touch()" required :class="{'_input-select-exist': idol.monitor.type !== null}" class="_multi-select" >
              <option :value="null" disabled >種類を選択</option>
              <option v-for="select in $store.getters['select/lineForMonitor']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
        <div v-if="idol.isBroughtMonitor" class="_multi-box _multi-box-end" :class="{'_multi-box-error': v$.idol.monitor.channel.$error}">
          <div class="_multi-inner _multi-inner-end">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="idol.monitor.channel" @blur="v$.idol.monitor.channel.$touch()" required :class="{'_input-select-exist': idol.monitor.channel !== null}" class="_multi-select" >
              <option :value="null" disabled >チャンネル数を選択</option>
              <option v-for="select in $store.getters['select/twoChannel']" :key="select.text" :value="select.text" :style="{'color': '#131313'}" >{{select.text}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="_container">
        <label for="textForLighting" class="_label">備考</label><Helper :helperObject="helper.note"></Helper>
        <textarea v-model="idol.text" @blur="v$.idol.text.$touch()" placeholder="200文字以内で入力 任意" :class="{'_input-error': v$.idol.text.$error}" class="_input-textarea"></textarea>
        <p v-if="v$.idol.text.$error" class="_input-error-message">200文字以内で入力してください。</p>
      </div>

      <div class="_button-container">
        <button  :disabled="v$.idol.$invalid || inactiveButton" @click="editIdol()" :class="{'_invalid-button': v$.idol.$invalid}" class="_button-s _marginM">保存</button>
        <button  :disabled="inactiveButton" @click="deleteIdol()"  class="_button-red">削除</button>
      </div>
    </div>
    <Footer></Footer>
    <Alert :isShown="isAlertShown" :message="alertMessage" @closeAlert="closeAlert()"></Alert>
  </div>
</template>

<script>

import SubHeader from '@/components/SubHeader.vue'
import Helper from '@/components/Helper.vue'
import Spinner from '@/components/Spinner.vue'
import Mixin from '@/mixin/mixin.js'
import Footer from '@/components/Footer.vue'
import Alert from '@/components/Alert.vue'

import Idol from '@/class/Idol.js'

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
  name: 'CreateIdol',
  components: {
    Spinner,
    SubHeader,
    Helper,
    Footer,
    Alert,
    Toggle
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
      pageTitle: "アイドルステージの作成",
      isBack: true,
      isPcTitle: true,
      inactiveButton: false,
      errorMessage: "",
      isAlertShown: false,
      alertMessage: "",

      idol: new Idol(),
      addMemberSwitch: false,
      member:{
        name: null,
        micNumber: null
      },
      micNumbers:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
      noUsedNumber:[],
      maxMember: 16, //最大人数

      helper:{
        name:{
          title:"ステージプロット名",
          text:"ステージプロットの名前を記入して下さい。\n記入した名前で保存され、保存ステージプロット一覧に表示されます。\nステージプロット名は完成したステージプロット(PDF)の内容には記載されません。"
        },
        member:{
          title:"メンバーリスト",
          text:"【メンバーを追加】から各メンバー名・マイクナンバーを設定して下さい。\n\n・メンバー名\nメンバー名（ステージネーム）を入力して下さい。\n\n・マイクナンバー\n使用するマイクの番号を決まっているいる場合は番号を選択して下さい。"
        },
        mic:{
          title:"ワイヤレスマイク",
          text:"ワイヤレスマイクの持込み有りの場合は詳細を選択・入力して下さい。\n※ワイヤレスマイクについては持込み可能か、レンタルの際は本数・料金等を主催者もしくは会場へご確認して下さい。"
        },
        music:{
          title:"音源（オケ）",
          text:"音源（オケ）の種類とアウトの端子・必要チャンネル数を選択して下さい。"
        },
        monitor:{
          title:"イヤモニ",
          text:"イヤモニの持込みがある場合は詳細を選択して下さい。"
        },
        note:{
          title:"備考",
          text:"その他、要望や各項目で記載出来ない事があればご記入して下さい。"
        },
      },

    }
  },
  created(){
    this._authCheck()
    if(this.$route.params.id){
      db.getIdol(this.$route.params.id)
      .then((doc)=>{
        this.idol = doc.data()
        this._userCheck(this.idol.userId)
      })
      .catch((error)=>{
        this.errorMessage = "データの取得に失敗しました。"
        console.log(error.message)
      })
    }

    // storeを初期化しとく
    this.$store.commit("data/setIdol", null)
  },
  mounted(){
    
  },
  methods:{
    editIdol(){
      db.editIdol(this.idol)
      .then(()=>{
        this.inactiveButton = false
        this.$router.push({name:'ShowIdol', params:{id: this.idol.id}})
      })
      .catch((error)=>{
        console.log(error.message)
        this.errorMessage = "更新に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    },
    deleteIdol(){
      db.deleteIdol(this.idol.id)
      .then(()=>{
        this.$router.push({name:'StagePlot'})
      })
      .catch((error)=>{
        console.log(error.message)
        this.errorMessage = "削除に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    },
    addMember(){
      if(this.idol.lists.length < this.maxMember){
        this.$store.commit("data/setIdol", this.idol)
        this.$router.push({name: 'AddIdolMember'})
      }else{
        this.alertMessage = "メンバー追加の上限に達しています。"
        this._stop(true)
        this.isAlertShown = true
      }
    },
    editMember(memberId){
      this.$store.commit("data/setIdol", this.idol)
      this.$router.push({name: 'EditIdolMember', params:{memberId: memberId}})
    },
    closeAlert(){
      this._stop(false)
      this.isAlertShown = false
      this.alertMessage = null
    },
    offMonitor(){
      this.idol.isBroughtMonitor = false
    },
  },
	


  validations(){
    return{
      idol:{
        name:{
          required,
          maxLength: maxLength(18)
        },
        mic:{
          type:{
            isChecked: contains(this.idol.isBroughtMic)
          },
          text:{
            maxLength: maxLength(50)
          }
        },
        source:{
          type:{
            required
          },
          other:{
            maxLength: maxLength(10)
          },
          terminal:{
            required
          },
          channel:{
            required
          },
        },
        monitor:{
          type:{
            isChecked: contains(this.idol.isBroughtMonitor)
          },
          channel:{
            isChecked: contains(this.idol.isBroughtMonitor),
          },
        },
        text:{
          maxLength: maxLength(200)
        },
      }
    }
  },
}
</script>

<style scoped>
.add-text{
  color: var(--blue);
  text-align: center;
  font-weight: 700;
}
.cross{
  width: 28px;
  height: 28px;
  z-index:30;
  pointer-events:all
}
</style>