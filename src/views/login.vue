<template>
  <div>
    <el-button @click="path">跳转</el-button>
    <Table
      show-num
      :selectable="()=>true"
      :selection="true"
      :table-data="state.tableData"
      :stripe="false"
      :border="false"
      :columns="state.columns"
      :page="state.formData.page"
      :size="'small'"
      :total="state.total"
      @pageChange="getList"
      ></Table>
  </div>
</template>

<script lang="ts">
import Table from '@/components/table/index.vue'
import { defineComponent,reactive } from 'vue'
import { useRouter } from 'vue-router';

export default defineComponent({
  components:{
    Table
  },
  setup () {
    const state = reactive({
      tableData:[
        {
          workerName:'123'
        }
      ],
      columns:[
      {
        label: '姓名',
        prop: 'workerName'
      },
      ],
      total:0,
      formData:{
        page:{
          pageIndex: 1,
          pageSize: 10
        }
      }
    })
    const getList = ()=>{
      console.log('123')
    }
    const router = useRouter()
    const path = ()=>{
      router.push('/login1')
    }
    return {
      path,
      state,
      getList
    }
  }
})
</script>

<style scoped>

</style>