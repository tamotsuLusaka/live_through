<template>
  <div class="_base">
    <Spinner v-if="inactiveButton"></Spinner>
    <SubHeader  :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content">
      <p class="_description _marginS" :class="{'_description-center':mq.current === 'lg'}">各楽曲に使用するCDのトラック番号を入力して下さい。</p>
      <p v-if="errorMessage !== ''" class="_error-message">{{errorMessage}}</p>

      <div v-if="setList.se.typeOfSource === 'CD'" class="_container">
        <label class="_label">SE</label>
        <div class="_select-box">
          <label class="_select-icon"><img src="@/assets/images/icon-arrow-b.png" alt="" class="_arrow"></label>
          <select v-model="setList.se.truckNumber" :class="{'_input-select-exist': setList.se.truckNumber !== null}" class="_input-select" >
            <option :value="null"  disabled class="_select-default">トラックナンバーを選択</option>
            <option v-for="number in 50" :key="number" :style="{'color': '#131313'}" :value="number"  >トラックナンバー：{{number}}</option>
          </select>
        </div>
      </div>

      <div v-for="music in incompletionLists" :key="music.order" class="_container">
        <label class="_label">M-{{music.order + 1}}. {{music.name}}</label>
        <div class="_select-box">
          <label class="_select-icon"><img src="@/assets/images/icon-arrow-b.png" alt="" class="_arrow"></label>
          <select v-model="setList.lists[music.order].truckNumber" :class="{'_input-select-exist': setList.lists[music.order].truckNumber !== null}" class="_input-select" >
            <option :value="null"  disabled class="_select-default">トラックナンバーを選択</option>
            <option v-for="number in 50" :key="number" :style="{'color': '#131313'}" :value="number"  >トラックナンバー：{{number}}</option>
          </select>
        </div>
      </div>

      <div v-if="setList.endSe.typeOfSource === 'CD'" class="_container">
        <label class="_label">END SE</label>
        <div class="_select-box">
          <label class="_select-icon"><img src="@/assets/images/icon-arrow-b.png" alt="" class="_arrow"></label>
          <select v-model="setList.endSe.truckNumber" :class="{'_input-select-exist': setList.endSe.truckNumber !== null}" class="_input-select" >
            <option :value="null"  disabled class="_select-default">トラックナンバーを選択</option>
            <option v-for="number in 50" :key="number" :style="{'color': '#131313'}" :value="number"  >トラックナンバー：{{number}}</option>
          </select>
        </div>
      </div>

      <div v-if="setList.seOfEncore.typeOfSource === 'CD'" class="_container">
        <label class="_label">アンコール SE</label>
        <div class="_select-box">
          <label class="_select-icon"><img src="@/assets/images/icon-arrow-b.png" alt="" class="_arrow"></label>
          <select v-model="setList.seOfEncore.truckNumber" :class="{'_input-select-exist': setList.seOfEncore.truckNumber !== null}" class="_input-select" >
            <option :value="null"  disabled class="_select-default">トラックナンバーを選択</option>
            <option v-for="number in 50" :key="number" :style="{'color': '#131313'}" :value="number"  >トラックナンバー：{{number}}</option>
          </select>
        </div>
      </div>

      <div v-for="music in incompletionListsOfEncore" :key="music.order" class="_container">
        <label class="_label">アンコール M-{{music.order + 1}}. {{music.name}}</label>
        <div class="_select-box">
          <label class="_select-icon"><img src="@/assets/images/icon-arrow-b.png" alt="" class="_arrow"></label>
          <select v-model="setList.listsOfEncore[music.order].truckNumber" :class="{'_input-select-exist': setList.listsOfEncore[music.order].truckNumber !== null}" class="_input-select" >
            <option :value="null"  disabled class="_select-default">トラックナンバーを選択</option>
            <option v-for="number in 50" :key="number" :style="{'color': '#131313'}" :value="number"  >トラックナンバー：{{number}}</option>
          </select>
        </div>
      </div>

      <div v-if="setList.endSeOfEncore.typeOfSource === 'CD'" class="_container">
        <label class="_label">アンコール END SE</label>
        <div class="_select-box">
          <label class="_select-icon"><img src="@/assets/images/icon-arrow-b.png" alt="" class="_arrow"></label>
          <select v-model="setList.endSeOfEncore.truckNumber" :class="{'_input-select-exist': setList.endSeOfEncore.truckNumber !== null}" class="_input-select" >
            <option :value="null"  disabled class="_select-default">トラックナンバーを選択</option>
            <option v-for="number in 50" :key="number" :style="{'color': '#131313'}" :value="number"  >トラックナンバー：{{number}}</option>
          </select>
        </div>
      </div>

      <div class="_button-container">
        <button  @click="save()"  class="_button-s">決定</button>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>

import SubHeader from '@/components/SubHeader.vue'
import Mixin from '@/mixin/mixin.js'
import Spinner from '@/components/Spinner.vue'
import Footer from '@/components/Footer.vue'

import SetList from '@/class/SetList.js'

import db from '@/firebase/modules/db.js'

export default {
  name: 'SetList',
  components: {
    Spinner,
    SubHeader,
    Footer
  },
  mixins:[
    Mixin
  ],
  data(){
    return{
      pageType: "setList",
      pageTitle: "トラックナンバー",
      isBack: true,
      isPcTitle: true,
      inactiveButton: false,
      errorMessage:"",

      setList: new SetList(),
      originMusics:[],
      incompletionLists: [], //{order: Number, name: String} 音源がCDのものを入れる。
      incompletionListsOfEncore: [],

      helper:{
        tune:{
          id:"tune",
          text:"説明文をここに入力。説明文をここに入力。説明文をここに入力。\n説明文をここに入力。"
        }
      },
    }
  },
  async created(){
    this._authCheck()
    await db.getMusics(this.$store.getters['auth/userId'])
    .then((querySnapShot)=>{
      querySnapShot.forEach(doc => {
        this.originMusics.push(doc.data())
      })
    })
    .catch((error)=>{
      this.errorMessage = "データの取得に失敗しました。"
      console.log(error.message)
    })

    await db.getSetList(this.$route.params.id)
    .then((doc)=>{
      this.setList = doc.data()
      this._userCheck(this.setList.userId)
    })
    .catch((error)=>{
      this.errorMessage = "データの取得に失敗しました。"
      console.log(error.message)
    })

    // this.setList.lists.forEach(targetMusic=>{
    //   if(targetMusic.type === "music"){
    //     const originMusic = this.originMusics.find((music)=> music.id === targetMusic.id)
    //     if(originMusic.source.typeOfSource === "CD"){
    //       this.incompletionLists.push({order: targetMusic.order, name: originMusic.name})
    //     }
    //   }
    // })

    this.matchMusic(this.setList.lists, this.incompletionLists)
    this.matchMusic(this.setList.listsOfEncore, this.incompletionListsOfEncore)

  },
  mounted(){
    
  },
  methods:{
    matchMusic(lists, incompletionLists){
      lists.forEach(targetMusic=>{
        if(targetMusic.type === "music"){
          const originMusic = this.originMusics.find((music)=> music.id === targetMusic.id)
          if(originMusic.source.typeOfSource === "CD"){
            incompletionLists.push({order: targetMusic.order, name: originMusic.name})
          }
        }
      })
    },
    save(){
      this.inactiveButton = true
      db.editSetList(this.setList)
      .then(()=>{
        this.inactiveButton = false
        this.$router.push({name:'ShowSetList', params:{id: this.setList.id}})
      })
      .catch((error)=>{
        this.inactiveButton = false
        console.log(error.message)
        this.errorMessage = "保存に失敗しました。もう一度やり直して下さい。"
        this._goToTop()
      })
    }
  },
}
</script>

<style scoped>

</style>