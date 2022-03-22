<template>

  <tr v-for="music in lists" :key="music.order" class="_PDF-list">

    <td v-if="music.type ==='music'" class="_PDF-no _PDF-text-m"><div v-if="music.format === 'main'">{{music.displayOrder}}</div><div v-if="music.format === 'encore'"><span class="_PDF-text-s">EN<br></span>{{music.displayOrder}}</div></td>
    <td v-else-if="music.type ==='se' || music.type ==='endSe'" class="_PDF-no _PDF-text-m"><div v-if="music.format === 'encore'">EN</div></td>
    <td v-else class="_PDF-no _PDF-text-m"></td>

    <td v-if="music.type === 'music'" class="_PDF-title _PDF-text-m">{{music.data.name}}</td>
    <td v-else-if="music.type === 'mc'" class="_PDF-title _PDF-text-m">MC</td>
    <td v-else-if="music.format === 'main'&& music.type ==='se'" class="_PDF-title _PDF-text-m">SE</td>
    <td v-else-if="music.format === 'main'&& music.type ==='endSe'" class="_PDF-title _PDF-text-m">END SE</td>
    <td v-else-if="music.format === 'encore'&& music.type ==='se'" class="_PDF-title _PDF-text-m">アンコール SE</td>
    <td v-else-if="music.format === 'encore'&& music.type ==='endSe'" class="_PDF-title _PDF-text-m">アンコール END SE</td>
    <td v-else class="_PDF-title _PDF-text-m"></td>

    <td v-if="music.type === 'music'" class="_PDF-source">
      <div v-if="music.data.isSource">
        <div v-if="music.data.source.typeOfSource === 'CD'" class="_PDF-text-s">CD<br>Tr.{{music.truckNumber}}</div>
        <div v-else-if="music.data.source.typeOfSource === 'PC'" class="_PDF-text-s">PC</div>
        <div v-else-if="music.data.source.typeOfSource === 'その他'" class="_PDF-text-s">{{music.data.source.nameOfType}}</div>
      </div>
    </td>
    <td v-else-if="music.type === 'mc'" class="_PDF-source"></td>
    <td v-else-if="music.type === 'se' || music.type === 'endSe'" class="_PDF-source">
      <div v-if="music.typeOfSource === 'CD'" class="_PDF-text-s">CD<br>Tr.{{music.truckNumber}}</div>
      <div v-else-if="music.typeOfSource === 'PC'" class="_PDF-text-s">PC</div>
      <div v-else-if="music.typeOfSource === 'その他'" class="_PDF-text-s">{{music.nameOfSource}}</div>
    </td>
    <td v-else class="_PDF-source"></td>

    <td v-if="music.type === 'music'" class="_PDF-tune _PDF-text-s">{{music.data.tune}}</td>
    <td v-else-if="music.type === 'mc'" class="_PDF-tune t_PDF-ext-s"></td>
    <td v-else class="_PDF-tune"></td>

    <td v-if="music.type === 'music'" class="_PDF-time">
      <div v-if="music.data.isSource" class="_PDF-text-s">{{displayTime(music.data.source.min, music.data.source.sec)}}</div>
    </td>
    <td v-else class="_PDF-time"></td>

    <td v-if="music.type === 'music'" class="_PDF-text-s _PDF-request">{{music.data.textForSound}}</td>
    <td v-else-if="music.type === 'mc'" class="_PDF-text-s _PDF-request" ></td>
    <td v-else-if="music.type === 'se' || music.type === 'endSe'" class="_PDF-text-s _PDF-request"><span class="under">開始：</span>{{music.textForOpen}}<br><span class="under">終了：</span>{{music.textForClose}}</td>
    <td v-else class="_PDF-text-s _PDF-request" ></td>

    <td v-if="music.type === 'music'" class="_PDF-text-s _PDF-request">{{music.data.textForLighting}}</td>
    <td v-else class="_PDF-text-s _PDF-request"></td>
  </tr>
  
</template>

<script>
import Mixin from '@/mixin/mixin.js'

export default {
  props:{
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
.under{
  text-decoration:underline;
  text-decoration-color:var(--black);
}
</style>