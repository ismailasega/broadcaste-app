<!--
  * @Author: Ismail Debele Asega
  * @Email: asega03@gmail.com
  * @LinkedIn: https://www.linkedin.com/in/asegaismail/
  * @Github: https://github.com/ismailasega
  * @GitLab: https://gitlab.com/asegaismail
  * @Tel: +256-784-491412 / +256-756-454376
 -->

<script setup>
import { onMounted, computed } from "vue";
import Header from './Layout/Header.vue'
import { useShowsStore } from '@/stores/ShowsStore' 

const showsStore = useShowsStore()

const groupByGenre = computed(() => {
  let showGenres = [];
  showsStore.shows.forEach(genre => showGenres.push(genre.genres))
  console.log('data', showGenres)
  return Object.assign({}, ...showGenres);
})


onMounted(() => {
  showsStore.getAllTvShows()
})
</script>
<style scoped>

</style>
<template>
  <div>
    <Header />
    <div v-for="(genreName, index) in groupByGenre" :key="index">
      <span>{{genreName}}</span>
    </div>
  </div>
</template>