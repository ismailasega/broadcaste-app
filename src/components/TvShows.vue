<!--
  * @Author: Ismail Debele Asega
  * @Email: asega03@gmail.com
  * @LinkedIn: https://www.linkedin.com/in/asegaismail/
  * @Github: https://github.com/ismailasega
  * @GitLab: https://gitlab.com/asegaismail
  * @Tel: +256-784-491412 / +256-756-454376
 -->

<script setup>
import { onMounted } from "vue";
import Header from './Layout/Header.vue'
import { useShowsStore } from '@/stores/ShowsStore' 

const showsStore = useShowsStore()

onMounted(() => {
  showsStore.getAllTvShows()
})
</script>
<style scoped>

</style>
<template>
  <div>
    <Header />
    {{showsStore}}
  </div>
</template>