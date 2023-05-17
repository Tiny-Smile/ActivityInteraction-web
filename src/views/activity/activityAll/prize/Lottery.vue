<template>
  <div class="lottory">

    <div class="title">素质能力大赛</div>

    <div class="main" v-show="!winModalVisible">
      <div class="bgContainer bgLeft">
        <div class="glass-container">
          参与人数：{{participateCount}}
        </div>
        <div class="glass-container count-contain">
          <div class="count-span">每次抽取人数：</div>
          <!--    计数器-->
          <div class="counter">
            <button class="counter-button" @click="decrement">-</button>
            <div class="counter-value">{{ count }}</div>
            <button class="counter-button" @click="increment">+</button>
          </div>
        </div>
      </div>

      <div class="bgContainer centerClass bgCenter">
        <div class="toWinKuang">
          <div v-for="(item, key) in toWin" :key="key" class="avatarItem">
            <div class="avatarName">{{ item }}</div>
          </div>
        </div>
        <div class="lotBtn">
          <!--  抽奖按钮 -->
          <CoolButton @click.native="startLottery" v-if="!isRunning" :disabled="count + lotteryResults.length > participants.length">开始抽奖</CoolButton>
          <CoolButton @click.native="stopLottery"  v-if="isRunning">停止</CoolButton>
        </div>

      </div>

      <div class="bgContainer bgRight">
        <div>已中奖 {{lotteryResults.length}} 人</div>
        <el-divider></el-divider>
        <div v-for="item in lotteryResults">{{item}}</div>
      </div>

    </div>

    <WinModal v-if="winModalVisible" class="winModal" :winners="toWin" @close="closeModal"></WinModal>


  </div>
</template>

<script>
  import CoolButton from "../../../components/CoolButton";
  import WinModal from "./winModal";
  export default {
    components: { CoolButton, WinModal },
    data() {
      return {
        interval: '',
        participateCount: 5, // 参与人数
        participants: ['024874', '024873', '024855', '024866', '024877'], // 参与抽奖的人员列表
        isRunning: false, // 是否正在进行抽奖
        winner: null, // 抽奖结果
        lotteryResults: [], // 抽奖结果 多个
        // 要抽的人
        toWin: [''],
        avatarList: [{
          userNo: '024874',
          name: '一只小猪谢谢谢谢谢谢',
        },{
          userNo: '024874',
          name: '一只小猪',
        },{
          userNo: '024874',
          name: '一只小猪',
        },],
        // 计数器
        count: 1,
        // 中奖
        winModalVisible: false,
        // 验证
        validate: true

      };
    },
    watch: {
      count(val) {
        this.toWin = Array(val).fill('')
      }
    },
    methods: {
      validateBol() {
        if (this.lotteryResults.length === this.participants.length) {
          this.$message.warning('已经全部抽取出来啦！')
          return false
        }
        if (this.count + this.lotteryResults.length > this.participants.length) {
          this.$message.warning('请检查抽取人数是否超出可选范围！')
          return false
        }
        return true
      },
      startLottery() {
        this.validate = this.validateBol()
        if (!this.validate) {
          return;
        }
        if (this.isRunning) return;
        this.isRunning = true;
        const intervalTime = 100;
        this.interval = setInterval(() => {
          // 随机选择中奖人员
          // const randomIndex = Math.floor(Math.random() * this.participants.length);
          // this.winner = this.participants[randomIndex];
          // 可以重复中奖
          this.toWin = this.toWin.map(item => { return this.participants[Math.floor(Math.random() * this.participants.length)]})
        }, intervalTime);
      },
      stopLottery() {
        clearInterval(this.interval);
        this.isRunning = false;
        this.winModalVisible = true
        this.lotteryResults = this.lotteryResults.concat(this.toWin)
        console.log(this.toWin);
      },
      // 计数器
      increment() {
        if (this.count < this.participateCount) {
          this.count++;
        }
      },
      decrement() {
        if (this.count > 1) {
          this.count--;
        }
      },
      // 关闭弹框
      closeModal() {
        this.winModalVisible = false
        this.toWin = Array(this.count).fill('')
      }
    }
  };
</script>

<style scoped lang="scss">
 /*旋转动画*/
  @mixin spin-animation {
    @keyframes donut-spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes donut-spin-back {
      0% {
        transform: rotate(360deg);
      }

      100% {
        transform: rotate(0deg);
      }
    }
  }

  .centerClass {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .lottory {
    width: 100%;
    height: 100vh;
    background: url("../../../../assets/images/activity/technology.jpg");
    display: flex;
    justify-content: center;
    align-items: center;
   flex-direction: column;
    .title {
      /*color: white;*/
      /*font-size: 30px;*/
      position: fixed;
      top: 30px;
      color:transparent;
      font-size: 40px;
      font-weight: bold;
      background:  linear-gradient(to right, #f7ff00, #db36a4);
      -webkit-background-clip: text;
    }
    .people {
      width: 40px;
      height: 20px;
      margin-top: 20px;
      color: white;
    }


    .avatarItem {
      border: 4px solid rgba(0, 0, 0, 0.1);
      /*border-left-color: #59a782;*/
      /*border-image: linear-gradient(25deg, #b75022, #cf8b33, #e3c546, #f3ff5a);*/
      border-left-color: #FFF200;
      border-radius: 50%;
      width: 150px;
      height: 150px;
      animation: donut-spin 1.2s linear infinite;
      @include spin-animation;
    }
    .avatarName {
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 150px;
      height: 150px;
      animation: donut-spin-back 1.2s linear infinite;
      @include spin-animation;
    }


    .main {
      width: 80%;
      height: 550px;
      /*<!--background: url(../public/images/bg1.jpg) fixed center -50px / cover no-repeat;-->*/
      position: relative;
      display: flex;

      .bgContainer {
        color: white;
        position: absolute;
        /*left: 0;*/
        /*right: 0;*/
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 1;
        /*height: 80%;*/
        box-sizing: border-box;

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
      .bgLeft {
        width: 20%;
        margin-right: 12px;
        left: 2%;
        padding: 66px 15px;
        /* 小透明框*/
        .glass-container {
          background-color: rgba(0, 0, 0, 0.5);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          padding: 15px;
          opacity: 0.8;
          font-size: 14px;
          align-items: center;
          justify-content: center;
        }
        .count-contain {
          display: flex;
          margin-top: 10px;
          .count-span {
            flex: 1;
          }
          /*  计数器*/
          .counter {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .counter-button {
            width: 25px;
            height: 25px;
            border: none;
            background-color: #007bff;
            color: #fff;
            font-size: 20px;
            border-radius: 50%;
            cursor: pointer;
          }

          .counter-value {
            margin: 0 10px;
            font-size: 15px;
            color: white;
          }
        }



      }
      .bgCenter {
        width: 60%;
        left: 8%;
        right: 0;
        display: flex;
        flex-direction: column;
        .toWinKuang {
          width: 100%;
          display: flex;
          flex: 5;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
        }
        .lotBtn {
          flex: 1;
        }
      }
      .bgRight {
        width: 10%;
        left: 85%;
        margin-left: 12px;
        padding: 66px 15px;
      }

    }

    /*  入场动画*/
    @keyframes scale-in-center {
      0% {
        -webkit-transform: scale(0);
        transform: scale(0);
        opacity: 1;
      }
      100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1;
      }
    }

    .winModal {
      position: absolute;
      animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
  }
</style>
