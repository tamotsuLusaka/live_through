<template>

  <tr v-for="music in lists" :key="music.order" class="_PDF-list">
    <td v-if="type === 'main'" class="_PDF-no _PDF-text-m">{{music.displayOrder}}</td>
    <td v-if="type === 'encore'" class="_PDF-no _PDF-text-m"><span class="_PDF-text-ss">ENCORE<br></span>{{music.displayOrder}}</td>

    <td v-if="music.type === 'music'" class="_PDF-title _PDF-text-m">{{music.data.name}}</td>
    <td v-if="music.type === 'mc'" class="_PDF-title _PDF-text-m">MC</td>

    <td v-if="music.type === 'music'" class="source">
      <div v-if="music.data.isSource">
        <div v-if="music.data.source.typeOfSource === 'CD'" class="_PDF-text-s">CD<br>Tr.{{music.truckNumber}}</div>
        <div v-else-if="music.data.source.typeOfSource === 'PC'" class="_PDF-text-s">PC</div>
        <div v-else-if="music.data.source.typeOfSource === 'その他'" class="_PDF-text-s">{{music.data.source.nameOfType}}</div>
      </div>
    </td>
    <td v-if="music.type === 'mc'" class="_PDF-source"></td>

    <td v-if="music.type === 'music'" class="_PDF-tune _PDF-text-s">{{music.data.tune}}</td>
    <td v-if="music.type === 'mc'" class="_PDF-tune t_PDF-ext-s"></td>

    <td v-if="music.type === 'music'" class="_PDF-time">
      <div v-if="music.data.isSource" class="_PDF-text-s">{{displayTime(music.data.source.min, music.data.source.sec)}}</div>
    </td>
    <td v-if="music.type === 'mc'" class="_PDF-time"></td>

    <td v-if="music.type === 'music'" class="_PDF-text-s _PDF-request">{{music.data.textForSound}}</td>
    <td v-if="music.type === 'mc'" class="_PDF-text-s _PDF-request" ></td>

    <td v-if="music.type === 'music'" class="_PDF-text-s _PDF-request">{{music.data.textForLighting}}</td>
    <td v-if="music.type === 'mc'" class="_PDF-text-s _PDF-request"></td>
  </tr>
  
</template>

<script>
import Mixin from '@/mixin/mixin.js'

export default {
  props:{
    type: String, //"main", "encore"
    lists: Array, 
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
    displayTime(min, sec){
      let minD = min.toString()
      let secD
      if(sec < 10){
        secD = "0" + sec.toString()
      }else{
        secD = sec.toString()
      }
      return minD + ":" + secD
    }
  }
}
</script>

<style scoped>

</style>