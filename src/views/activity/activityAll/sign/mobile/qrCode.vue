<template>
  <div class="qrCode">
    <div ref="qrCodeUrl" class="qrcode" />
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import { getSignQrcode } from '@/api/activitySignUrls'
export default {
  name: 'QrCode',
  data() {
    return {
      actiId: '',
      timer: undefined,
      qrcode: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
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
      getSignQrcode(this.actiId).then(res => {
        console.log(res);
        return new QRCode(this.$refs.qrCodeUrl, {
          text: res.signQrcode, // 需要转换为二维码的内容
          width: 360,
          height: 360,
          colorDark: '#e7cd7f',
          correctLevel: QRCode.CorrectLevel.L
        })
      })
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

<style lang="scss" scoped>
  .qrCode {
    width: 100%;
    height: 100vh;
    background: url("../../../../../assets/images/activity/technology.jpg");
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
