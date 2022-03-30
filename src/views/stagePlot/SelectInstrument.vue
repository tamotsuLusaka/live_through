<template>
  <div class="_base">
    <Spinner v-if="inactiveButton"></Spinner>
    <SubHeader  :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content">
      <label for="name" class="_label">パートの選択</label><Helper :helperObject="helper.part"></Helper>
      <div v-for="(instrument, index) in instruments" :key="index" class="_multi-box" :class="{'_multi-box-start': index === 0, '_multi-box-end': instruments.length -1 === index}" >
        <router-link :to="{name: 'CreateInstrument', params:{id: $route.params.id}, query:{instrument: instrument.text}}" class="_multi-inner" :class="{'_multi-inner-end': instruments.length -1 === index}">
          <p class="_multi-text">{{instrument.view}}</p>
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
      isBack: true,
      isPcTitle: true,
      inactiveButton: false,
      errorMessage: "",
      instruments: this.$store.getters['select/instrument'],

      helper:{
        part:{
          title:"パートの選択",
          text:"追加するメンバーのパートを選択。\n一覧に無い場合はその他から入力して下さい。"
        },
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