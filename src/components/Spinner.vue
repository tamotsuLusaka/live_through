<template>
  <div class="spinner"></div>
</template>

<script>
export default {

  data(){
    return{

    }
  }
  
}

</script>

<style scoped>

.spinner{
  align-items: center;
  background-color: rgba(255, 255, 255, 0.4);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
}
.spinner::after{
  animation: spinner 0.9s linear infinite;
  border: 10px solid rgb(103, 175, 214);
  border-radius: 50%;
  border-right: 10px solid rgba(0, 105, 162, 0.5);
  border-top: 10px solid rgba(0, 105, 162, 0.5);
  content: "";
  color: var(--orange);
  height: 70px;
  width: 70px;
}
@keyframes spinner {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>