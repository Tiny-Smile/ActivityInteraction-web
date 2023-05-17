<template>
  <div class="a_tree_box">
    <div ref="qrCodeUrl" class="qrcode" />
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
// import {generateQR} from "../../../../../api/activitySignUrls";
// import { generateQR } from '@/api/activitySignUrls'
export default {
  name: 'QrCode',
  data() {
    return {
      actiId: undefined,
      timer: undefined,
      qrcode: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        console.log('watch')
        console.log(route)
        // 监听路由是否变化
        this.actiId = route.query.actiId
        this.creatQrCode()
      },
      immediate: true
    }
  },
  created() {
    // this.start()
  },
  mounted() {

  },
  methods: {
    creatQrCode() {
      // generateQR({acti_id: this.actiId }).then(res => {
      //   console.log(res);
      return new QRCode(this.$refs.qrCodeUrl, {
        // text: "https://blog.csdn.net/weixin_42601136", // 需要转换为二维码的内容
        text: 'http://localhost:8013/signMobile', // 需要转换为二维码的内容
        width: 360,
        height: 360,
        colorDark: '#e7cd7f',
        correctLevel: QRCode.CorrectLevel.L
      })
      // })
    },
    start() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      } else {
        this.timer = setInterval(() => {
          this.qrcode.clear()
          const obj = {}// 二维码携带的数据
          this.qrcode.makeCode(JSON.stringify(obj))
        }, 3000)
      }
    }
  }
}
</script>

<!--<style lang="less" scoped>
  // 树状表格样式
  .a_tree_box {
    width: calc(100vw - 300px);
    height: 100%;
    margin-bottom: 20px;
    padding: 40px;
  }
</style>-->
