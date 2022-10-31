<!--
  * @Author: Ismail Debele Asega
  * @Email: asega03@gmail.com
  * @LinkedIn: https://www.linkedin.com/in/asegaismail/
  * @Github: https://github.com/ismailasega
  * @GitLab: https://gitlab.com/asegaismail
  * @Tel: +256-784-491412 / +256-756-454376
 -->

<script setup>
import { onMounted, computed, provide, ref } from "vue";
import { storeToRefs } from "pinia";
import Header from './Layout/Header.vue';
import { useShowsStore } from '@/stores/ShowsStore';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/outline'
import ShowDetails from './ShowDetails.vue'

const showsStore = useShowsStore()

const { shows } = storeToRefs(showsStore);

/**
 * 
 * Generating and array of genres based on the returned data attribute genres
 */
const groupByGenre = computed(() => {
  let showGenres = [];
  shows.value.forEach(show => {
    if(typeof show?.genres !== 'undefined') showGenres.push(show.genres)
    else showGenres.push(show['show']['genres'])
  })
  let filterShowGenres = showGenres.reduce((x, y) => x.concat(y), [])
  filterShowGenres = [... new Set(filterShowGenres)];
  return filterShowGenres
})

/**
 * 
 * @param {*} showGenre 
 * Getting the list of shows under specfic genre
 */
const showListing = (showGenre) => {
  let tvShows = [];
  shows.value.filter(show => {
    if (typeof show?.genres !== 'undefined' && show.genres.includes(showGenre)) tvShows.push(show)
    else if(typeof show?.show !== 'undefined' && show.show.genres.includes(showGenre)) tvShows.push(show.show)
  })
  return tvShows;
}
/**
 * 
 * Setting modal to display specific show details
 */
const isShowDetailsModal = ref(false);
const selectedShowDetails = ref([]);

const openShowDetailsModal = (showDetails) => {
  isShowDetailsModal.value = true;
  selectedShowDetails.value = showDetails
  console.log('myShow', selectedShowDetails.value)

}
const closeShowDetailsModal = () => isShowDetailsModal.value = false;

provide("isShowDetailsModal", isShowDetailsModal);
provide("openShowDetailsModal", openShowDetailsModal);
provide("closeShowDetailsModal", closeShowDetailsModal);

/**
 * 
 * Setting data display whenever the component is rendered
 */
onMounted(() => {
  showsStore.getAllTvShows()
})
</script>
<style scoped>
.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.movie-card {
  display: inline-block;
}


.scrolling-wrapper::-webkit-scrollbar {
    display: none;
  }
</style>
<template>
<ShowDetails :selectedShowDetails="selectedShowDetails" />
  <div class="relative">
    <Header />
    <div class="desktop-view px-6 py-20">
      <div class="mt-5 " v-for="(genreName, index) in groupByGenre" :key="index">
        <div class="text-gray-300 text-lg mb-2 font-light ">{{ genreName }}</div>
        <div class="flex relative flex-grow duration-700 ease-in-out items-center space-x-6">
          <!-- <span><ChevronLeftIcon class="h-10"/></span> -->

          <div class="flex-shrink-0 shadow-xl" v-for="(show, index) in showListing(genreName)" :key="index" @click="openShowDetailsModal(show)">
            <img :src="show?.image?.medium" class="rounded-lg hover:bg-slate-200 hover:cursor-pointer hover:opacity-30" />
            <div
              class="bg-white bg-opacity-50 backdrop-blur-sm drop-shadow-lg rounded-b-lg hover:bg-gray-500 hover:text-white hover:cursor-pointer absolute bottom-0 p-2 w-full text-gray-900">
              <span class="font-bold flex items-center justify-center">{{ show.name }}</span>
            </div>
          </div>
          <!-- <span><ChevronRightIcon class="h-10"/></span> -->
        </div>
      </div>
    </div>

    <!-- Mobile View -->
    <div class="mobile-view px-6 py-24">
      <div class="mt-5 " v-for="(genreName, index) in groupByGenre" :key="index">
        <div class="text-gray-300 text-lg mb-2 font-light ">{{ genreName }}</div>
        <div class="flex relative scrolling-wrapper flex-grow duration-700 ease-in-out items-center space-x-6">
          <div class="flex-shrink-0 w-32 movie-card shadow-xl" v-for="(show, index) in showListing(genreName)" :key="index" @click="openShowDetailsModal">
            <img :src="show?.image?.medium" class="rounded-lg hover:bg-slate-200 hover:cursor-pointer hover:opacity-30" />
            <div
              class="bg-white bg-opacity-50 w-full backdrop-blur-sm drop-shadow-lg rounded-b-lg hover:bg-gray-500 hover:text-white hover:cursor-pointer absolute bottom-0 p-2 text-gray-900">
              <span class="font-bold text-sm truncate flex items-center justify-center">{{ show.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>