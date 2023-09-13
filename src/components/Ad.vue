<template>
  <div class="ad-PC">
    <div class="ad-PC-container">
      <a href="https://px.a8.net/svt/ejp?a8mat=3N86GW+9JJ4TU+F14+69P01" class="ad-PC-link" target="_blank" rel="noopener noreferrer" ><img border="0" alt="" src="https://www24.a8.net/svt/bgt?aid=220411328577&wid=001&eno=01&mid=s00000001948001053000&mc=1" class="ad-image" ></a><img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=3N86GW+9JJ4TU+F14+69P01" alt="">
      <a href="https://h.accesstrade.net/sp/cc?rk=0100oql300m99a" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer-when-downgrade" class="ad-PC-link sp-margin"><img src="https://h.accesstrade.net/sp/rr?rk=0100oql300m99a" alt="ネットオフ楽器買取プロモーション" border="0" class="ad-image" /></a>
      <a href="https://www.printcamp.net/" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer-when-downgrade" class="ad-PC-link sp-margin"><img src="@/assets/images/ad-printcamp.jpeg" alt="PRINT CAMP" border="0" class="ad-image" /></a>
      <a href="https://px.a8.net/svt/ejp?a8mat=3N86GU+DNS2GI+3V2O+ZRXQP" target="_blank" rel="noopener noreferrer" class="ad-PC-link"><img border="0" alt="" src="https://www23.a8.net/svt/bgt?aid=220411326826&wid=001&eno=01&mid=s00000018024006009000&mc=1" class="ad-image"></a><img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=3N86GU+DNS2GI+3V2O+ZRXQP" alt="">
      <a href="https://px.a8.net/svt/ejp?a8mat=3N86GU+8I0TPU+4LAK+5ZU29" target="_blank" rel="noopener noreferrer"  class="ad-PC-link"><img border="0" alt="" src="https://www28.a8.net/svt/bgt?aid=220411326514&wid=001&eno=01&mid=s00000021422001007000&mc=1" class="ad-image"></a><img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=3N86GU+8I0TPU+4LAK+5ZU29" alt="">
    </div>
  </div>
  <div class="ad-SP">
    <div class="ad-SP-container">
      <a href="https://px.a8.net/svt/ejp?a8mat=3N86GW+9JJ4TU+F14+69P01" class="ad-SP-link" :class="{'active-link':randamNumber === 0}" target="_blank" rel="noopener noreferrer" ><img border="0" alt="" src="https://www24.a8.net/svt/bgt?aid=220411328577&wid=001&eno=01&mid=s00000001948001053000&mc=1" class="ad-image" ></a><img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=3N86GW+9JJ4TU+F14+69P01" alt="">
      <a href="https://h.accesstrade.net/sp/cc?rk=0100oql300m99a" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer-when-downgrade" class="ad-SP-link sp-margin" :class="{'active-link':randamNumber === 1}"><img src="https://h.accesstrade.net/sp/rr?rk=0100oql300m99a" alt="ネットオフ楽器買取プロモーション" border="0" class="ad-image" /></a>
      <a href="https://www.printcamp.net/" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer-when-downgrade" class="ad-SP-link sp-margin" :class="{'active-link':randamNumber === 2}"><img src="@/assets/images/ad-printcamp.jpeg" alt="PRINT CAMP" border="0" class="ad-image" /></a>
      <a href="https://px.a8.net/svt/ejp?a8mat=3N86GU+DNS2GI+3V2O+ZRXQP" target="_blank" rel="noopener noreferrer" class="ad-SP-link" :class="{'active-link':randamNumber === 3}"><img border="0" alt="" src="https://www23.a8.net/svt/bgt?aid=220411326826&wid=001&eno=01&mid=s00000018024006009000&mc=1" class="ad-image"></a><img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=3N86GU+DNS2GI+3V2O+ZRXQP" alt="">
      <a href="https://px.a8.net/svt/ejp?a8mat=3N86GU+8I0TPU+4LAK+5ZU29" target="_blank" rel="noopener noreferrer"  class="ad-SP-link" :class="{'active-link':randamNumber === 4}"><img border="0" alt="" src="https://www28.a8.net/svt/bgt?aid=220411326514&wid=001&eno=01&mid=s00000021422001007000&mc=1" class="ad-image"></a><img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=3N86GU+8I0TPU+4LAK+5ZU29" alt="">
    </div>
  </div>
  
</template>

<script>
import Mixin from '@/mixin/mixin.js'

export default {
  props:{


  },
  data(){
    return{
      randamNumber:1,
      adNumber:5, //広告の数
    }
  },
  created(){
    this.randamNumber = Math.floor(Math.random()*this.adNumber)
    console.log(this.randamNumber)
  },
  methods:{

  },
  mixins:[
    Mixin
  ],

}
</script>

<style scoped>
.ad-PC{
  display: none;
}
.ad-SP{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.ad-SP-container{
  width: 100%;
  position: relative;
}
.ad-SP-link{
  display: none;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.active-link{
  display: block;
}
.ad-image{
  display: block;
  width: 100%;
}
/* .sp-margin{
  margin-bottom: 30px;
} */

@media screen and (min-width:600px){
  .ad-PC{
    display: block;
    width: 100%;
    max-width: 1000px;
    margin: 60px auto 30px; 
  }
  .ad-SP{
    display: none;
  }
  .ad{
    position: static;
    width: 100%;
    margin: 0 auto;
    padding: 40px 0;
  }
  .ad-PC-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .ad-PC-link{
    display: block;
    width:calc(50% - 1px);
  }
  .ad-image{
    display: block;
    width: 100%;
  }
  .sp-margin{
    margin-bottom: 0;
  }
}
</style>