<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">活动ID</label>
        <el-input v-model="query.actiId" clearable placeholder="活动ID" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">奖项</label>
        <el-input v-model="query.prizeTitle" clearable placeholder="奖项" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">中奖人</label>
        <el-input v-model="query.winnerNames" clearable placeholder="中奖人" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">工号</label>
        <el-input v-model="query.winnerJobid" clearable placeholder="工号" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">状态</label>
        <el-input v-model="query.status" clearable placeholder="状态" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
    
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="活动ID" prop="actiId">
            <el-input v-model="form.actiId" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="奖项">
            <el-input v-model="form.prizeTitle" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="奖品">
            <el-input v-model="form.prize" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="中奖人数">
            <el-input v-model="form.prizeNumber" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="中奖人">
            <el-input v-model="form.winnerNames" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="工号">
            <el-input v-model="form.winnerJobid" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="数据源">
            <el-input v-model="form.source" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="日期">
            <el-input v-model="form.createDate" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.prize_status"
                :key="item.id"
                :label="item.label"
                :value="item.value" />
            </el-select>
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
        <el-table-column prop="prizeTitle" label="奖项" />
        <el-table-column prop="prize" label="奖品" />
        <el-table-column prop="prizeNumber" label="中奖人数" />
        <el-table-column prop="winnerNames" label="中奖人" />
        <el-table-column prop="winnerJobid" label="工号" />
        <el-table-column prop="source" label="数据源" />
        <el-table-column prop="createDate" label="日期" />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            {{ dict.label.prize_status[scope.row.status] }}
          </template>
        </el-table-column>
        <el-table-column v-if="checkPer(['admin','activityPrize:edit','activityPrize:del'])" label="操作" width="150px" align="center">
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
import crudActivityPrize from '@/api/activityPrize'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { actiId: null, prizeTitle: null, prize: null, prizeNumber: null, winnerNames: null, winnerJobid: null, source: null, createDate: null, status: null }
export default {
  name: 'ActivityPrize',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['prize_status'],
  cruds() {
    return CRUD({ title: '抽奖管理', url: 'api/activityPrize', idField: 'actiId', sort: 'actiId,desc', crudMethod: { ...crudActivityPrize }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'activityPrize:add'],
        edit: ['admin', 'activityPrize:edit'],
        del: ['admin', 'activityPrize:del']
      },
      rules: {
        actiId: [
          { required: true, message: '活动ID不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'actiId', display_name: '活动ID' },
        { key: 'prizeTitle', display_name: '奖项' },
        { key: 'winnerNames', display_name: '中奖人' },
        { key: 'winnerJobid', display_name: '工号' },
        { key: 'status', display_name: '状态' }
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
