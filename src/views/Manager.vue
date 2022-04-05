<template>
  <div class="_base-w">
    <SubHeader :pageType="pageType" :pageTitle="pageTitle" :isBack="isBack" :isPcTitle="isPcTitle"></SubHeader>
    <div class="_content-w">
      <div class="search">
        <select v-model="searchWord" class="select">
          <option  :value="null" disabled>都道府県を選択</option>
          <option v-for="prefecture in $store.getters['select/prefecture']" :key="prefecture" :value="prefecture.text">{{prefecture.text}}</option>
        </select>
        <button @click="clear()" class="button">クリア</button>
      </div>

        <table border="1">
          <tr v-for="user in users" :key="user">
            <td class="name">{{user.name}}</td>
            <td class="prefecture">{{user.prefecture}}</td>
            <td  class="city">{{user.city}}</td>
          </tr>
        </table>
      
    </div>
  </div>
  <Footer></Footer>
</template>

<script>
import SubHeader from '@/components/SubHeader.vue'
import Footer from '@/components/Footer.vue'
import Mixin from '@/mixin/mixin.js'

import db from '@/firebase/modules/db.js'
export default {
  name: 'Music',
  components: {
    SubHeader,
    Footer,
  },
  mixins:[
    Mixin
  ],
  data(){
    return{
      pageType: "",
      pageTitle:"ユーザー管理",
      isBack: true,
      isPcTitle: true,

      users:[],
      allUsers:[],
      targetUsers: [],

      searchWord: null,

    }
  },
  created(){
    this._authCheck()
    db.getUsers()
    .then((querySnapShot)=>{
      querySnapShot.forEach(doc => {
        this.users.push(doc.data())
        this.allUsers.push(doc.data())
      })
    })
    .catch((error)=>{
      console.log(error.message)
    })
  },
  mounted(){
    
  },
  methods:{
    clear(){
      this.searchWord = null
      this.users = this.allUsers
    },
    
  },
  computed:{
  },
  watch:{
    'searchWord': function(){
      if(this.searchWord){
        this.users = this.allUsers.filter(user => user.prefecture === this.searchWord)
      }
    }
  },


}
</script>

<style scoped>
.search{
  margin: 20px 0 10px;
  display: flex;
}
.select{
  height: 30px;
  padding: 0 5px;
  display: block;
}
.button{
  width: 60px;
  height: 30px;
  display: block;
  margin-left: 10px;
}
table{
  border: 1px solid var(--gray);
  width: 100%;
}
td{
  height: 20px;
  padding: 5px;
}
.name{
  width: 50%;
}
.prefecture{
  width: 25%;
}
.city{
  width: 25%;
}
</style>