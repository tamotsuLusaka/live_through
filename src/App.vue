<template>

  <router-view/>
</template>




<script>
import auth from '@/firebase/modules/auth.js'

export default{
  components:{
    
  },
  data() {
    return {
    }
  },
  methods: {
  },
  beforeCreate(){
    auth.isSignedIn()
    
  },
  created(){


  },
  computed:{

  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap');
*{
  /* font-family: 'Noto Sans JP', sans-serif, 'PingFang SC'; */
  /* font-family:'ヒラギノ角ゴ ProN W6' ; */
  font-family:'Yusei Magic' ;
}
</style>
