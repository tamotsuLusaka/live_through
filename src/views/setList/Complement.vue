<template>
  <div class="_base">
    <Spinner v-if="inactiveButton"></Spinner>
    <SubHeader  :pageType="pageType" :pageTitle="pageTitle" :backPath="backPath" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content">
      <p v-if="errorMessage !== ''" class="_error-message">{{errorMessage}}</p>

      <div v-if="setList.se.typeOfSource === 'CD'" class="_container">
        <label class="_label">SE</label>
        <div class="_select-box">
          <label class="_select-icon"><img src="@/assets/images/icon-arrow-b.png" alt="" class="_arrow"></label>
          <select v-model="setList.se.truckNumber" :class="{'_input-select-exist': setList.se.truckNumber !== null}" class="_input-select" >
            <option :value="null"  disabled class="_select-default">トラックナンバーを選択</option>
            <option v-for="number in 100" :key="number" :style="{'color': '#131313'}" :value="number"  >トラックナンバー：{{number}}</option>
          </select>
        </div>
      </div>

      <div v-for="music in incompletionLists" :key="music.order" class="_container">
        <label class="_label">M-{{music.order + 1}}. {{music.name}}</label>
        <div class="_select-box">
          <label class="_select-icon"><img src="@/assets/images/icon-arrow-b.png" alt="" class="_arrow"></label>
          <select v-model="setList.lists[music.order].truckNumber" :class="{'_input-select-exist': setList.lists[music.order].truckNumber !== null}" class="_input-select" >
            <option :value="null"  disabled class="_select-default">トラックナンバーを選択</option>
            <option v-for="number in 100" :key="number" :style="{'color': '#131313'}" :value="number"  >トラックナンバー：{{number}}</option>
          </select>
        </div>
      </div>

      <div v-if="setList.se.typeOfSource === 'CD'" class="_container">
        <label class="_label">END SE</label>
        <div class="_select-box">
          <label class="_select-icon"><img src="@/assets/images/icon-arrow-b.png" alt="" class="_arrow"></label>
          <select v-model="setList.endSe.truckNumber" :class="{'_input-select-exist': setList.endSe.truckNumber !== null}" class="_input-select" >
            <option :value="null"  disabled class="_select-default">トラックナンバーを選択</option>
            <option v-for="number in 100" :key="number" :style="{'color': '#131313'}" :value="number"  >トラックナンバー：{{number}}</option>
          </select>
        </div>
      </div>

      <div v-if="setList.seOfEncore.typeOfSource === 'CD'" class="_container">
        <label class="_label">アンコール SE</label>
        <div class="_select-box">
          <label class="_select-icon"><img src="@/assets/images/icon-arrow-b.png" alt="" class="_arrow"></label>
          <select v-model="setList.seOfEncore.truckNumber" :class="{'_input-select-exist': setList.seOfEncore.truckNumber !== null}" class="_input-select" >
            <option :value="null"  disabled class="_select-default">トラックナンバーを選択</option>
            <option v-for="number in 100" :key="number" :style="{'color': '#131313'}" :value="number"  >トラックナンバー：{{number}}</option>
          </select>
        </div>
      </div>

      <div v-for="music in incompletionListsOfEncore" :key="music.order" class="_container">
        <label class="_label">アンコール M-{{music.order + 1}}. {{music.name}}</label>
        <div class="_select-box">
          <label class="_select-icon"><img src="@/assets/images/icon-arrow-b.png" alt="" class="_arrow"></label>
          <select v-model="setList.listsOfEncore[music.order].truckNumber" :class="{'_input-select-exist': setList.listsOfEncore[music.order].truckNumber !== null}" class="_input-select" >
            <option :value="null"  disabled class="_select-default">トラックナンバーを選択</option>
            <option v-for="number in 100" :key="number" :style="{'color': '#131313'}" :value="number"  >トラックナンバー：{{number}}</option>
          </select>
        </div>
      </div>

      <div v-if="setList.endSeOfEncore.typeOfSource === 'CD'" class="_container">
        <label class="_label">アンコール END SE</label>
        <div class="_select-box">
          <label class="_select-icon"><img src="@/assets/images/icon-arrow-b.png" alt="" class="_arrow"></label>
          <select v-model="setList.endSeOfEncore.truckNumber" :class="{'_input-select-exist': setList.endSeOfEncore.truckNumber !== null}" class="_input-select" >
            <option :value="null"  disabled class="_select-default">トラックナンバーを選択</option>
            <option v-for="number in 100" :key="number" :style="{'color': '#131313'}" :value="number"  >トラックナンバー：{{number}}</option>
          </select>
        </div>
      </div>

      <div class="_container">
        <p class="_label">音源設定</p><Helper :helperObject="helper.tune"></Helper>
        <div class="_multi-box _multi-box-start" >
          <div class="_multi-inner">
            <img src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="setList.output.channel" :class="{'_input-select-exist': setList.output.channel !== null}" class="_multi-select" >
              <option :value="null" disabled class="_select-default">チャンネル数の選択</option>
              <option v-for="channel in $store.getters['select/channel']" :key="channel.text" :value="channel.text" :style="{'color': '#131313'}" >{{channel.text}}</option>
            </select>
          </div>
        </div>
        <div class="_multi-box _multi-box-end">
          <div class="_multi-inner _multi-inner-end">
            <img  src="@/assets/images/icon-arrow-b.png" alt="" class="_multi-icon _arrow">
            <select v-model="setList.output.terminal" :class="{'_input-select-exist': setList.output.terminal !== null}" class="_multi-select" >
              <option :value="null" disabled class="_select-default">端子の種類の選択</option>
              <option v-for="terminal in $store.getters['select/terminal']" :key="terminal.text" :value="terminal.text" :style="{'color': '#131313'}" >{{terminal.text}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="_button-container">
        <button  @click="save()"  class="_button-s">保存</button>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>

import SubHeader from '@/components/SubHeader.vue'
import Mixin from '@/mixin/mixin.js'
import Helper from '@/components/Helper.vue'
import Spinner from '@/components/Spinner.vue'
import Footer from '@/components/Footer.vue'

import SetList from '@/class/SetList.js'

import db from '@/firebase/modules/db.js'

export default {
  name: 'SetList',
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
      pageType: "setList",
      pageTitle: "音源詳細の入力",
      backPath: "/",
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
      this.backPath = `/set_list/${this.setList.id}`
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