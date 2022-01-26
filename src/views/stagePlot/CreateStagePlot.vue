<template>
  <div class="_base">
    <SubHeader  :pageType="pageType" :pageTitle="pageTitle" :backPath="backPath" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content">
      <p v-if="errorMessage !== ''" class="_error-message">{{errorMessage}}</p>
      <div class="_container">
        <label for="name" class="_label">ステージプロット名</label>
        <input type="text" v-model="plot.name" @blur="v$.plot.name.$touch()" id="name" placeholder="20字以内で入力" :class="{'_input-error': v$.plot.name.$error}" class="_input-text">
        <p v-if="v$.plot.name.$error" class="_input-error-message">20字以内で入力してください。</p>
      </div>

      <div class="_container">
        <p class="_label">プロットタイプ</p>
        <div class="_select-box">
          <label class="_select-icon"><img src="@/assets/images/icon-arrow-b.png" alt="" class="_arrow"></label>
          <select v-model="plot.type" @blur="v$.plot.type.$touch()" required :class="{'_input-error': v$.plot.type.$error, '_input-select-exist': plot.type !== null}" class="_input-select" >
            <option :value="null" class="_select-default" disabled >プロットタイプを選択</option>
            <option :style="{'color': '#131313'}" :value="'band'"  >バンドステージ</option>
            <option :style="{'color': '#131313'}" :value="'idol'"  >アイドルステージ</option>
          </select>
        </div>
      </div>
      <div class="_button-container">
        <button :disabled="v$.plot.$invalid || inactiveButton" @click="createPlot()" :class="{'_invalid-button': v$.plot.$invalid}" class="_button-s">作成</button>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>

import SubHeader from '@/components/SubHeader.vue'
import Mixin from '@/mixin/mixin.js'
import Footer from '@/components/Footer.vue'

import Band from '@/class/Band.js'

import db from '@/firebase/modules/db.js'
import useVuelidate from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators'

export default {
  name: 'SignUp',
  components: {
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
      pageTitle: "ステージプロットの作成",
      backPath: "/stage_plot",
      isPcTitle: true,
      inactiveButton: false,
      errorMessage: "",

      band: new Band(),
      plot:{
        name: null,
        type: null
      }
    }
  },
  mounted(){
    
  },
  created(){

  },
  methods:{
    createPlot(){

      this.inactiveButton = true
      if(this.plot.type === "band"){
        this.band.type = this.plot.type
        this.band.name = this.plot.name
        this.band.userId = this.$store.getters['auth/userId']
        db.createBand(this.band)
        .then(()=>{

        })
        .catch((error)=>{
          this.inactiveButton = false
          console.log(error.message)
          this.errorMessage = "作成に失敗しました。もう一度やり直して下さい。"
          this._goToTop()
        })
      }
    }
  },
	
  validations(){
    return{
      plot:{
        name:{
          required,
          maxLength: maxLength(20)
        },
        type:{
          required,
        },

      }
    }
  },
}
</script>

<style scoped>

</style>