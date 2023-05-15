<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">活动主题</label>
        <el-input v-model="query.theme" clearable placeholder="活动主题" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <!--          <el-form-item label="活动id" prop="actiId">-->
          <!--            <el-input v-model="form.actiId" style="width: 370px;" />-->
          <!--          </el-form-item>-->
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
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <!--        <el-table-column prop="actiId" label="活动id" />-->
        <el-table-column prop="theme" label="活动主题" />
        <el-table-column prop="deptId" label="主办方" />
        <el-table-column prop="address" label="活动地点" />
        <el-table-column prop="dateTime" label="活动时间" />
        <el-table-column prop="joinPeople" label="参加对象" />
        <el-table-column v-if="checkPer(['admin','activityAll:edit','activityAll:del'])" label="操作" width="150px" align="center">
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
import crudActivityAll from '@/api/activityAll'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { actiId: null, theme: null, deptId: null, address: null, dateTime: null, joinPeople: null }
export default {
  name: 'ActivityAll',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '所有活动', url: 'api/activityAll', idField: 'actiId', sort: 'actiId,desc', crudMethod: { ...crudActivityAll }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'activityAll:add'],
        edit: ['admin', 'activityAll:edit'],
        del: ['admin', 'activityAll:del']
      },
      rules: {
        actiId: [
          { required: true, message: '活动id不能为空', trigger: 'blur' }
        ],
        theme: [
          { required: true, message: '活动主题不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'theme', display_name: '活动主题' }
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