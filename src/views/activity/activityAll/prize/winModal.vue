<template>
  <div class="main bgContainer" >

    <div>恭喜{{winners.toString()}}中奖！</div>

    <el-button class="closeBtn" @click="$emit('close')">关闭</el-button>

  </div>
</template>

<script>
  export default {
    name: "winModal",
    props: {
      winners: Array
    }
  }
</script>

<style scoped lang="scss">
  .main {
    width: 80%;
    height: 550px;
    /*<!--background: url(../public/images/bg1.jpg) fixed center -50px / cover no-repeat;-->*/
    position: relative;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* Border */
    border: 0.25rem dashed #ece455;
    border-radius: 0.25rem;
  }
  .bgContainer {
    color: white;
    position: absolute;
    /*left: 0;*/
    /*right: 0;*/
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 2;
    height: 80%;
    box-sizing: border-box;
    padding: 66px 15px;
    background-color: rgb(21 146 210 / 31%);;
    font-size: 18px;
  &::after {
     content: "";
     position: absolute;
     left: 0;
     top: 0;
     width: 100%;
     height: 100%;
     filter: blur(10px);
     z-index: -1;
   }

  }

  .closeBtn {
    position: fixed;
    bottom: 30px;
  }



</style>
