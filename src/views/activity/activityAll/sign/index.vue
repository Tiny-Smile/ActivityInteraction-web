<template>
  <div class="sign">
    <el-row :gutter="10" class="mb8 toolbar">
      <el-col :span="1.5">
        <el-button type="success" icon="el-icon-view" @click="previewSignPage">预览签到页面</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" @click="handleSignQRCode">签到二维码</el-button>
      </el-col>
      <el-col :span="1.5">
        <div class="rightClass">已签： xx 人</div>
      </el-col>
    </el-row>
    <div style="display:flex;">
      <div v-for="(item, key) in avatarList" :key="key" class="avatarItem">
        <el-avatar shape="circle" :size="90" icon="el-icon-user-solid">{{ item.name }}</el-avatar>
        <div class="avatarName">{{ item.name }}</div>
      </div>
    </div>

    <SignList></SignList>

  </div>
</template>

<script>
  import SignList from './signList/index'
export default {
  name: 'Index',
  props: {
    activityMsg: Object
  },
  components: {SignList},
  data() {
    return {
      currentActivityMsg: {},
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      avatarList: [{
        name: '一只小猪'
      }, {
        name: '一只小猪'
      }, {
        name: '一只小猪'
      }, {
        name: '一只小猪'
      }, {
        name: '一只小猪'
      }, {
        name: '一只小猪'
      }, {
        name: '一只小猪'
      }, {
        name: '一只小猪'
      }]
    }
  },
  watch: {
    activityMsg: {
      handler(val) {
        this.currentActivityMsg = val
      },
      immediate: true
    }
  },
  created() {
    this.currentActivityMsg = this.activityMsg
  },
  methods: {
    // 查看签到页面
    previewSignPage() {
      const routeData = this.$router.resolve({
        path: '/activity/sign',
        query: { actiId: this.currentActivityMsg.actiId, activityName: this.currentActivityMsg.theme }
        // params: { activityName: this.currentActivityMsg.theme }
      })
      window.open(routeData.href, '_blank')
    },
    // 查看二维码
    handleSignQRCode() {
      const query = {
        actiId: this.currentActivityMsg.actiId

      }
      console.log(query)
      const routeData = this.$router.resolve({
        path: '/signQRCode',
        query: query
      })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style scoped lang="scss">
.sign .rightClass{
  width: 100px;
  margin: 8px 10px 0 auto;
}
  .sign .el-avatar {
    display: inline-block;
    border-radius: 50%;
    background-color: #409EFF;
    color: #ffffff;
  }

  .sign .avatarItem {
    margin: 20px;
    ::v-deep.el-icon-user-solid {
      font-size: 40px!important;
    }
    .avatarName {
      margin-top: 10px;
    }
  }
</style>
