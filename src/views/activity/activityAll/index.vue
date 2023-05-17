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
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="actiId" label="活动id" />
        <el-table-column prop="theme" label="活动主题" />
        <el-table-column prop="deptId" label="主办方" />
        <el-table-column prop="address" label="活动地点" />
        <el-table-column prop="dateTime" label="活动时间" />
        <el-table-column prop="joinPeople" label="参加对象" />
        <!-- <el-table-column prop="id" label="id" /> -->
        <el-table-column prop="type" label="活动类型" />
        <el-table-column prop="status" label="状态" />
        <el-table-column v-if="checkPer(['admin','activityAll:edit','activityAll:del'])" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <span>
              <udOperation
                :data="scope.row"
                :permission="permission"
              />
              <el-button style="display: inline" @click="design(scope.row)">
                <i class="el-icon-setting" style="margin-right:5px" />
              </el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
      <!-- 签到弹框-->
      <el-dialog :title="designTitle" :visible.sync="designVisible" fullscreen append-to-body @close="designVisible = false">
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane :key="'first'" label="签到" name="sign">
            <SignDesign v-if="activeName === 'sign'" :activity-msg="currentActivityMsg" />
          </el-tab-pane>
          <el-tab-pane :key="'prize'" label="抽奖" name="prize">
            <PrizeDesign v-if="activeName === 'prize'" :activity-msg="currentActivityMsg" />
          </el-tab-pane>
          <el-tab-pane :key="'vote'" label="投票" name="vote">
            <SignDesign v-if="activeName === 'vote'" />
          </el-tab-pane>
          <el-tab-pane :key="'score'" label="评分" name="score">
            <SignDesign v-if="activeName === 'score'" />
          </el-tab-pane>
        </el-tabs>

      </el-dialog>
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
import SignDesign from '@/views/activity/activityAll/sign/index'
import PrizeDesign from '@/views/activity/activityAll/prize/index'

const defaultForm = { actiId: null, theme: null, deptId: null, address: null, dateTime: null, joinPeople: null, id: null, type: null, status: null }
export default {
  name: 'ActivityAll',
  components: { pagination, crudOperation, rrOperation, udOperation, SignDesign, PrizeDesign },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '所有活动', url: 'api/activityAll', idField: 'id', sort: 'id,desc', crudMethod: { ...crudActivityAll }})
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
      ],
      currentActivityMsg: {},
      // 设计
      designTitle: '',
      designVisible: false,
      activeName: 'sign'
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    },
    // 设计
    design(row) {
      this.designVisible = true
      this.designTitle = '设计' + row.theme
      this.currentActivityMsg = row
    },
    handleTabClick() {

    }
  }
}
</script>

<style scoped>

</style>
