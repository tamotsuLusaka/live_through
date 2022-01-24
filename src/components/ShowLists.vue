<template>
  <div v-for="music in lists" :key="music.order" class="lists">
    <div v-if="music.type === 'music'" class="music">
      <div v-if="type === 'main'" class="_label-white">M-{{music.displayOrder}}</div>
      <div v-if="type === 'encore'" class="_label-white">アンコール M-{{music.displayOrder}}</div>
      <div class="_multi-box _multi-box-start">
        <div class="_multi-inner">
          <p class="_multi-text">{{music.data.name}}</p>
        </div>
      </div>
      <div class="_multi-box" :class="{'_multi-box-end': !music.data.isSource && music.data.textForSound === null && music.data.textForLighting === null}">
        <div class="_multi-inner" :class="{'_multi-inner-end': !music.data.isSource && music.data.textForSound === null && music.data.textForLighting === null}">
          <p class="_multi-text">テンポ：{{music.data.tune}}</p>
        </div>
      </div>
      <div v-if="music.data.isSource" class="_multi-box">
        <div class="_multi-inner">
          <p class="_multi-text">音源：{{music.data.source.typeOfSource}}</p>
        </div>
      </div>
      <div v-if="music.data.source.typeOfSource === 'その他'" class="_multi-box">
        <div class="_multi-inner">
          <p class="_multi-text">音源の種類：{{music.data.source.nameOfSource}}</p>
        </div>
      </div>
      <div v-if="music.data.source.typeOfSource === 'CD'" class="_multi-box">
        <router-link :to="{name: 'Complement', params:{id: $route.params.id}}" v-if="music.truckNumber === null" class="_multi-inner">
          <img  src="@/assets/images/icon-arrow-r.png" alt="" class="_multi-icon _arrow">
          <p class="_multi-text red">音源トラックナンバー未入力</p>
        </router-link>
        <div v-else class="_multi-inner" :class="{'_multi-inner-end': isEnd3}">
          <p class="_multi-text">音源トラックナンバー：{{music.truckNumber}}</p>
        </div>
      </div>
      <div v-if="music.data.isSource" class="_multi-box" :class="{'_multi-box-end': music.data.textForSound === null && music.data.textForLighting === null}">
        <div class="_multi-inner" :class="{'_multi-inner-end': music.data.textForSound === null && music.data.textForLighting === null}">
          <p class="_multi-text">タイム：{{music.data.source.min}}分{{music.data.source.min}}秒</p>
        </div>
      </div>
      <div v-if="music.data.textForSound !== null" class="_multi-box" :class="{'_multi-box-end': music.data.textForLighting === null}">
        <div class="_flex-multi-inner" :class="{'_multi-inner-end': music.data.textForLighting === null}">
          <p class="_multi-sub_title-gray">音響要望</p>
          <p>{{music.data.textForSound}}</p>
        </div>
      </div>
      <div v-if="music.data.textForLighting !== null" class="_multi-box _multi-box-end" >
        <div class="_flex-multi-inner _multi-inner-end">
          <p class="_multi-sub_title-gray">照明要望</p>
          <p>{{music.data.textForLighting}}</p>
        </div>
      </div>
    </div>
    <div v-if="music.type === 'mc'" class="mc">
      <p class="mc-text">MC</p>
    </div>
  </div>

  
</template>

<script>
import Mixin from '@/mixin/mixin.js'

export default {
  props:{
    type: String, //"main" or "encore"
    lists: Array, //表示等に元の楽曲データがマージされたリストを受け取る。
  },
  data(){
    return{
      isEnd1: false,
      isEnd2: false,
      isEnd3: false,
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
.music{
  margin-bottom: 20px;
}
.mc{
  width: 100%;
  height: 60px;
  border-radius: 4px;
  background-color: var(--white);
  text-align: center;
  margin-bottom: 20px;
}
.mc-text{
  line-height: 60px;
  font-size: 1.8rem;
}
.red{
  color: var(--red);
}
</style>