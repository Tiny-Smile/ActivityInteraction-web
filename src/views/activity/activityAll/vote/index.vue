<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />

      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="id" />
        <el-table-column prop="theme" label="奖项名称" />
        <el-table-column prop="deptId" label="奖品名称" />
        <el-table-column prop="address" label="中奖人数" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作" width="160px" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" style="margin-right: 2px" type="text">
              <router-link :to="'/xx' + scope.row.id">
                开始
              </router-link>
            </el-button>
            <el-button size="mini" style="margin-left: -1px;margin-right: 2px" type="text" @click="toDownload(scope.row.tableName)">编辑</el-button>
            <el-button size="mini" style="margin-left: -1px;margin-right: 2px" type="text">
              <router-link :to="'/xx' + scope.row.id">
                查看中奖信息
              </router-link>
            </el-button>
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

  const defaultForm = { actiId: null, theme: null, deptId: null, address: null, dateTime: null, joinPeople: null, id: null, type: null, status: null }
  export default {
    name: 'ActivityAll',
    components: { pagination, crudOperation, rrOperation, udOperation },
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
        activeName: 'sign',
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
