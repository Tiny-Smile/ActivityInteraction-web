<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="actiId" prop="actiId">
            <el-input v-model="form.actiId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="signUrl">
            <el-input v-model="form.signUrl" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="createDate">
            <el-input v-model="form.createDate" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="id" prop="id">
            <el-input v-model="form.id" style="width: 370px;" />
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
        <el-table-column prop="actiId" label="actiId" />
        <el-table-column prop="signUrl" label="signUrl" />
        <el-table-column prop="createDate" label="createDate" />
        <el-table-column prop="id" label="id" />
        <el-table-column v-if="checkPer(['admin','activitySignUrls:edit','activitySignUrls:del'])" label="操作" width="150px" align="center">
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
import crudActivitySignUrls from '@/api/activitySignUrls'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { actiId: null, signUrl: null, createDate: null, id: null }
export default {
  name: 'ActivitySignUrls',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '签到二维码', url: 'api/activitySignUrls', idField: 'id', sort: 'id,desc', crudMethod: { ...crudActivitySignUrls }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'activitySignUrls:add'],
        edit: ['admin', 'activitySignUrls:edit'],
        del: ['admin', 'activitySignUrls:del']
      },
      rules: {
        actiId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }}
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
