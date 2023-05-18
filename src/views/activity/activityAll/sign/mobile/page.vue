<template>
  <div class="sign">
    <div>{{ actiId }}活动</div>
    <el-button>签到1</el-button>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      activityName: '',
      actiId: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        console.log(route);
        // 监听路由是否变化
        // this.activityName = route.query.activityName
        this.actiId = route.query.acti_id
        this.init()
      },
      immediate: true
    }
  },
  mounted() {

  },
  methods: {
    init() {

    }
  }
}
</script>

<style lang="scss" scoped>
.sign {
  color: greenyellow;
  width: 100%;
  height: 100vh;
  background: url("../../../../../assets/images/activity/technology.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
