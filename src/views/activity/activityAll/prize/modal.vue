<template>
    <div>
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="活动id" prop="actiId">
            <el-input v-model="form.actiId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="活动主题" prop="theme">
            <el-input v-model="form.theme" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="主办方">
            未设置字典，请手动设置 Select
          </el-form-item>
          <el-form-item label="活动地点">
            <el-input v-model="form.address" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="活动时间">
            <el-date-picker v-model="form.dateTime" type="datetime" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="参加对象">
            <el-input v-model="form.joinPeople" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="id">
            <el-input v-model="form.id" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="活动类型">
            未设置字典，请手动设置 Select
          </el-form-item>
          <el-form-item label="0: 结束，other：进行中">
            未设置字典，请手动设置 Select
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "modal"
  }
</script>

<style scoped>

</style>
