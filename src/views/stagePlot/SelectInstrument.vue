<template>
  <div class="_base">
    <Spinner v-if="inactiveButton"></Spinner>
    <SubHeader  :pageType="pageType" :pageTitle="pageTitle" :backPath="backPath" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content">
      <label for="name" class="_label">パート</label><Helper :helperObject="helper.tune"></Helper>
      <div v-for="(instrument, index) in instruments" :key="index" class="_multi-box" :class="{'_multi-box-start': index === 0, '_multi-box-end': instruments.length -1 === index}" >
        <router-link :to="{name: 'CreateInstrument', params:{id: $route.params.id}, query:{instrument: instrument.text}}" class="_multi-inner" :class="{'_multi-inner-end': instruments.length -1 === index}">
          <p class="_multi-text">{{instrument.text}}</p>
          <img  src="@/assets/images/icon-arrow-r.png" alt="" class="_multi-icon _arrow">
        </router-link>
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
  

export default {
  name: 'CreateMusic',
  components: {
    Spinner,
    SubHeader,
    Helper,
    Footer
  },
  mixins:[
    Mixin
  ],
  data(){
    return{
      pageType: "stagePlot",
      pageTitle: "パートの選択",
      backPath: "/stage_plot",
      isPcTitle: true,
      inactiveButton: false,
      errorMessage: "",
      instruments: this.$store.getters['select/instrument'],

      helper:{
        tune:{
          id:"tune",
          text:"説明文をここに入力。説明文をここに入力。説明文をここに入力。\n説明文をここに入力。"
        }
      },

    }
  },
  created(){

  },
  mounted(){
    
  },
  methods:{

  },
	


  validations(){

  },
}
</script>

<style scoped>

</style>