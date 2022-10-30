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
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/outline'

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
    if (show.genres.includes(showGenre)) {
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
    <div class="px-6 py-12">
      <div class="mt-5 " v-for="(genreName, index) in groupByGenre" :key="index">
        <div class="text-gray-300 text-lg mb-2 font-light ">{{ genreName }}</div>
        <div class="flex relative overflow-hidden duration-700 ease-in-out items-center space-x-6">
          <!-- <span><ChevronLeftIcon class="h-10"/></span> -->

          <div class="flex-shrink-0 shadow-xl" v-for="(show, index) in showListing(genreName)" :key="index">
            <img :src="show.image.medium" class="rounded-lg hover:bg-slate-200 hover:cursor-pointer hover:opacity-30" />
            <div
              class="bg-slate-200 rounded-b-lg bg-opacity-70 hover:bg-gray-500 hover:text-white hover:cusror-pointer absolute bottom-0 p-2 w-full text-slate-800">
              <span class="font-bold">{{ show.name }}</span>
            </div>
          </div>
          <!-- <span><ChevronRightIcon class="h-10"/></span> -->
        </div>
      </div>
    </div>
  </div>
</template>