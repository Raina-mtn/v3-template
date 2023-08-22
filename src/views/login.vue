<template>
  <div>
    <el-button @click="path">跳转</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';

export default defineComponent({
  setup () {
    const router = useRouter()
    console.log('router :>> ', router);
    const path = ()=>{
      router.push('/login1')
    }
    return {
      path
    }
  }
})
</script>

<style scoped>

</style>