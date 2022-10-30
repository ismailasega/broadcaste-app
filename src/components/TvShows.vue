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
import Header from './Layout/Header.vue';
import { useShowsStore } from '@/stores/ShowsStore';

const showsStore = useShowsStore()

/**
 * 
 * Generating and array of genres based on the returned data attribute genres
 */
const groupByGenre = computed(() => {
  let showGenres = [];
  showsStore.shows.forEach(genre => showGenres.push(genre.genres))
  console.log('data', showGenres)
  return Object.assign({}, ...showGenres);
})

/**
 * 
 * @param {*} showGenre 
 * Getting the list of shows under specfic genre
 */
const showListing = (showGenre) => {
  console.log('gn', showGenre)
  let tvShows = [];
  showsStore.shows.filter(show => {
    if(show.genres.includes(showGenre)){
      tvShows.push(show)
    }
  })
  console.log('listundergenre', tvShows)
  return tvShows;
}

/**
 * 
 * Setting data display whenever the component is rendered
 */
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
      <span class="text-gray-400 font-medium">{{genreName}}</span>
      <div class="flex overflow-x-auto space-x-8">
        <div class="flex-shrink-0"  v-for="(show, index) in showListing(genreName)" :key="index">
          <img :src="show.image.medium" />
          {{show.name}}</div>
      </div>
    </div>
  </div>
</template>