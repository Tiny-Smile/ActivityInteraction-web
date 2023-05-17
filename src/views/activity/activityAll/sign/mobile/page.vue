<template>
  <div>
    <div>{{ activityName }}活动</div>
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
        // 监听路由是否变化
        this.activityName = route.query.activityName
        this.actiId = route.query.actiId
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

<style scoped>

</style>
