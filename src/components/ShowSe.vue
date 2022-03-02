<template>
  <div class="se">
    <div class="_label-white">{{type}}</div>
    <div class="_multi-box _multi-box-start" :class="{'_multi-box-end': isSolo}">
      <div class="_multi-inner" :class="{'_multi-inner-end': isSolo}">
        <p class="_multi-text">音源：{{seObject.typeOfSource}}</p>
      </div>
    </div>
    <div v-if="seObject.typeOfSource === 'その他'" class="_multi-box" :class="{'_multi-box-end': seObject.textForOpen === null && seObject.textForClose === null}">
      <div class="_multi-inner" :class="{'_multi-inner-end': seObject.textForOpen === null && seObject.textForClose === null}">
        <p class="_multi-text">音源の種類：{{seObject.nameOfSource}}</p>
      </div>
    </div>
    <div v-if="seObject.typeOfSource === 'CD'" class="_multi-box" :class="{'_multi-box-end': seObject.textForOpen === null && seObject.textForClose === null}">
      <router-link :to="{name: 'TruckNumber', params:{id: $route.params.id}}" v-if="seObject.truckNumber === null" class="_multi-inner" :class="{'_multi-inner-end': seObject.textForOpen === null && seObject.textForClose === null}">
        <img  src="@/assets/images/icon-arrow-r.png" alt="" class="_multi-icon _arrow">
        <p class="_multi-text red">音源トラックナンバー未入力</p>
      </router-link>
      <div v-else class="_multi-inner" :class="{'_multi-inner-end': seObject.textForOpen === null && seObject.textForClose === null}">
        <p class="_multi-text">音源トラックナンバー：{{seObject.truckNumber}}</p>
      </div>
    </div>
    <div v-if="seObject.textForOpen !== null" class="_multi-box" :class="{'_multi-box-end': seObject.textForClose === null}">
      <div class="_flex-multi-inner" :class="{'_multi-inner-end': seObject.textForClose === null}">
        <p class="_multi-sub_title-gray">開始指示</p>
        <p>{{seObject.textForOpen}}</p>
      </div>
    </div>
    <div v-if="seObject.textForClose !== null" class="_multi-box _multi-box-end" >
      <div class="_flex-multi-inner _multi-inner-end">
        <p class="_multi-sub_title-gray">終了指示</p>
        <p>{{seObject.textForClose}}</p>
      </div>
    </div>
  </div>
  
</template>

<script>
import Mixin from '@/mixin/mixin.js'

export default {
  props:{
    setListId: String,
    type: String, //項目名にそのままなる
    seObject: Object
  },
  data(){
    return{
      isSolo: false
    }
  },
  mixins:[
    Mixin
  ],
  created(){
    if(this.seObject.typeOfSource === 'PC'){
      if(this.seObject.textForOpen === null && this.seObject.textForClose === null){
        this.isSolo = true
      }
    }
  },
  methods:{

  }
}
</script>

<style scoped>
.se{
  margin-bottom: 20px;
}
.red{
  color: var(--red);
}
</style>