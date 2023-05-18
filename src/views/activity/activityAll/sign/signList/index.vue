<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">活动ID</label>
        <el-input v-model="query.actiId" clearable placeholder="活动ID" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">姓名</label>
        <el-input v-model="query.trueName" clearable placeholder="姓名" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">昵称</label>
        <el-input v-model="query.nickName" clearable placeholder="昵称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">工号</label>
        <el-input v-model="query.jobId" clearable placeholder="工号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="活动ID">
            <el-input v-model="form.actiId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.trueName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.nickName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="头像">
            <el-input v-model="form.headImage" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="签到时间">
            <el-input v-model="form.signDate" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="签到二维码">
            <el-input v-model="form.signUrl" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="工号">
            <el-input v-model="form.jobId" style="width: 370px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="actiId" label="活动ID" />
        <el-table-column prop="trueName" label="姓名" />
        <el-table-column prop="nickName" label="昵称" />
        <el-table-column prop="headImage" label="头像" />
        <el-table-column prop="signDate" label="签到时间" />
        <el-table-column prop="signUrl" label="签到二维码" />
        <el-table-column prop="jobId" label="工号" />
        <el-table-column v-if="checkPer(['admin','activitySignList:edit','activitySignList:del'])" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudActivitySignList from '@/api/activitySignList'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { actiId: null, trueName: null, nickName: null, headImage: null, signDate: null, signUrl: null, jobId: null }
export default {
  name: 'ActivitySignList',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '签到列表', url: 'api/activitySignList', idField: 'actiId', sort: 'actiId,desc', crudMethod: { ...crudActivitySignList }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'activitySignList:add'],
        edit: ['admin', 'activitySignList:edit'],
        del: ['admin', 'activitySignList:del']
      },
      rules: {
      },
      queryTypeOptions: [
        { key: 'actiId', display_name: '活动ID' },
        { key: 'trueName', display_name: '姓名' },
        { key: 'nickName', display_name: '昵称' },
        { key: 'jobId', display_name: '工号' }
      ]
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    }
  }
}
</script>

<style scoped>

</style>
