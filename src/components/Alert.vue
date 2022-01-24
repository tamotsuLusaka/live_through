<template>
  <div class="modal">
    <div @click="closeAlert()" class="modal-cover" :class="{'open-modal-cover' : isShown}"></div>
    <div class="modal-container" :class="{'open-modal-container' : isShown}">
      <img src="@/assets/images/exclamation-red.png" alt="" class="modal-mark">
      <p class="modal-text">{{message}}</p>
      <button  @click="closeAlert()" class="modal-button _button-s">確認</button>
    </div>
  </div>
</template>

<script>

export default {
  props:{
    isShown: {
      type: Boolean
    },
    message: {
      type: String
    }
  },
  data(){
    return{
      
    }
  },
  methods:{
    closeAlert(){
      this.$emit("closeAlert", false)
    }
  }
}
</script>

<style scoped>
.modal-cover{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  opacity: 0;
  z-index: -10;
  transition: 0.3s;
}
.open-modal-cover{
  opacity: 0.5;
  z-index: 50;
}
.modal-container{
  position: fixed;
  top: 50%;
  left: 50%;
  width: 60%;
  max-width: 400px;
  height: auto;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 30px;
  background-color: var(--white);
  border-radius: 20px;
  transition: 0.3s;
  z-index: -20;
  box-shadow:
  0 1.9px 2.5px rgba(0, 0, 0, 0.057),
  0 5px 6.1px rgba(0, 0, 0, 0.076),
  0 10.1px 11.4px rgba(0, 0, 0, 0.086),
  0 19.2px 19.8px rgba(0, 0, 0, 0.092),
  0 38.4px 34.8px rgba(0, 0, 0, 0.1),
  0 101px 74px rgba(0, 0, 0, 0.13);
}
.open-modal-container{
  z-index: 60;
}
.modal-title{
  font-size: 1.8rem;
  margin-bottom: 10px;
  letter-spacing: 1px;
}
.modal-text{
  text-align:justify;
  margin-bottom: 40px;
  line-height: 2.6rem;
}
.modal-button{
  margin: 0 auto;
  width: 170px;
}
.modal-mark{
  width: 150px;
  height: 150px;
  margin: 20px auto ;
}

@media screen and (min-width:600px){

}
</style>