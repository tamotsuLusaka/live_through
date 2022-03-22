<template>
  <div class="_base">
    <Spinner v-if="inactiveButton"></Spinner>
    <SubHeader  :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content">
      <p v-if="errorMessage !== ''" class="_error-message">{{errorMessage}}</p>

      <div class="_container">
        <p class="_label">PC、その他音源使用時の音源詳細</p><Helper :helperObject="helper.source"></Helper>
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
    Footer,
    Helper,
  },
  mixins:[
    Mixin
  ],
  data(){
    return{
      pageType: "setList",
      pageTitle: "音源設定",
      isBack: true,
      isPcTitle: true,
      inactiveButton: false,
      errorMessage:"",

      setList: new SetList(),
      originMusics:[],
      incompletionLists: [], //{order: Number, name: String} 音源がCDのものを入れる。
      incompletionListsOfEncore: [],

      helper:{
        source:{
          title:"PC、その他音源使用時の音源詳細",
          text:"曲に使用するオケ等で、CD以外のPCやその他シーケンス類の音源がある場合に詳細を選択します。"
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