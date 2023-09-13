<template>
  <transition mode="out-in" appear>
    <router-view/>
  </transition>
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
    _resize(){
      this.$store.commit('data/setInnerHeight', window.innerHeight)
    },
  },
  beforeCreate(){
    auth.onSignedIn()
    
  },
  created(){
    this.$store.commit('data/setInnerHeight', window.innerHeight)
  },
  mounted(){
    window.addEventListener('resize', this._resize)
  },
  beforeDestory(){
    window.removeEventListener('resize', this._resize)
  },
  computed:{

  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap');
*{
  font-family: 'Noto Sans JP', 'ヒラギノ角ゴ ProN W3', 'メイリオ' sans-serif;
}

</style>
<style scoped>

.v-enter {
  transform: translate(-100px, 0);
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
.v-enter-active {
  transition: all 1s 0s ease;
}
.v-leave {
  transform: translate(0, 0);
  opacity: 1;
}
.v-leave-to {
  transform: translate(100px, 0);
  opacity: 0;
}
.v-leave-active {
  transition: all .5s 0s ease;
}
</style>