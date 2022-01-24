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

</style>
