<template>
  <div class="app-container">
    hello world
  </div>
</template>

<script>
import crudActivitySignUrls from '@/api/activitySignUrls'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { actiId: null, signUrl: null, createDate: null }
export default {
  name: 'ActivitySignUrls',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: '签到二维码', url: 'api/activitySignUrls', idField: 'actiId', sort: 'actiId,desc', crudMethod: { ...crudActivitySignUrls }})
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
