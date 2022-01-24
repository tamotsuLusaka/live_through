<template>

  <tr class="_PDF-list">
    <td v-if="type === 'se' " class="_PDF-no _PDF-text-m"></td>
    <td v-if="type === 'endSe' " class="_PDF-no _PDF-text-m"></td>
    <td v-if="type === 'seOfEncore' " class="_PDF-no _PDF-text-ss">ENCORE</td>
    <td v-if="type === 'endSeOfEncore' " class="_PDF-no _PDF-text-ss">ENCORE</td>

    <td class="_PDF-title _PDF-text-m">
      <div v-if="type === 'se'">SE</div>
      <div v-else-if="type === 'endSe'">END SE</div>
      <div v-else-if="type === 'seOfEncore'">アンコール SE</div>
      <div v-else-if="type === 'endSeOfEncore'">アンコール END SE</div>
    </td>

    <td class="_PDF-source">
      <div v-if="data.typeOfSource === 'CD'" class="_PDF-text-s">CD<br>Tr.{{data.truckNumber}}</div>
      <div v-else-if="data.typeOfSource === 'PC'" class="_PDF-text-s">PC</div>
      <div v-else-if="data.typeOfSource === 'その他'" class="_PDF-text-s">{{data.nameOfSource}}</div>
    </td>
    <td class="_PDF-tune"></td>
    <td class="_PDF-time"></td>
    <td class="_PDF-text-s _PDF-request">開始指示：{{data.textForOpen}}<br><br>終了指示：{{data.textForClose}}</td>
    <td class="_PDF-text-s _PDF-request"></td>
  </tr>
  
</template>

<script>
import Mixin from '@/mixin/mixin.js'

export default {
  props:{
    type: String, //"se", "endSe", "seOfEncore", "endSeOfEncore"
    data: Object, 
  },
  data(){
    return{

    }
  },
  mixins:[
    Mixin
  ],
  created(){

  },
  methods:{

  }
}
</script>

<style scoped>

</style>