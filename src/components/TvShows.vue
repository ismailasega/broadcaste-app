<!--
  * @Author: Ismail Debele Asega
  * @Email: asega03@gmail.com
  * @LinkedIn: https://www.linkedin.com/in/asegaismail/
  * @Github: https://github.com/ismailasega
  * @GitLab: https://gitlab.com/asegaismail
  * @Tel: +256-784-491412 / +256-756-454376
 -->

<script setup>
import { onMounted, computed, provide, ref} from "vue";
import { storeToRefs } from "pinia";
import Header from './Layout/Header.vue';
import { useShowsStore } from '../stores/ShowsStore';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/outline'
import ShowDetails from './ShowDetails.vue'
import Loader from './utils/Loader.vue'

const showsStore = useShowsStore()

const { shows, isLoading, error } = storeToRefs(showsStore);

const isShowDetailsModal = ref(false);
const selectedShowDetails = ref([]);

/**
 * 
 * Generating and array of genres based on the returned data attribute genres
 */
const groupByGenre = computed(() => {
  let showGenres = [];
  shows.value.forEach(show => {
    if (typeof show?.genres !== 'undefined') showGenres.push(show.genres)
    else showGenres.push(show['show']['genres'])
  })
  let filterShowGenres = showGenres.reduce((x, y) => x.concat(y), [])
  filterShowGenres = [... new Set(filterShowGenres)];
  return filterShowGenres
})

/**
 * 
 * @param {*} showGenre 
 * Getting the list of shows under specfic genre and sorting based on rating (highest-to-lowest rating)
 */
const showListing = (showGenre) => {
  let tvShows = [];
  shows.value.filter(show => {
    if (typeof show?.genres !== 'undefined' && show.genres.includes(showGenre)) tvShows.push(show)
    else if (typeof show?.show !== 'undefined' && show.show.genres.includes(showGenre)) tvShows.push(show.show)
  })
  return tvShows.sort((a, b) => Number(b.rating.average) - Number(a.rating.average));
}
/**
 * 
 * Setting modal to display specific Tv show details
 */

const openShowDetailsModal = (showDetails) => {
  isShowDetailsModal.value = true;
  selectedShowDetails.value = showDetails;
  document.documentElement.style.overflow = 'hidden'

}
const closeShowDetailsModal = () => {
  isShowDetailsModal.value = false;
  document.documentElement.style.overflow = 'auto';
}

provide("isShowDetailsModal", isShowDetailsModal);
provide("openShowDetailsModal", openShowDetailsModal);
provide("closeShowDetailsModal", closeShowDetailsModal);

/**
 * 
 * Tv show desktop view horizontal scroll
 */
const scrollTo = (element, scrollPixels, duration) => {
  const scrollPos = element.scrollLeft;
  // Condition to check if scrolling is required
  if (!((scrollPos === 0 || scrollPixels > 0) && (element.clientWidth + scrollPos === element.scrollWidth || scrollPixels < 0))) {
    // Get the start timestamp
    
    const startTime =
      "now" in window.performance
        ? performance.now()
        : new Date().getTime();
    function scroll(timestamp) {
      // Calculate the timeelapsed
      const timeElapsed = timestamp - startTime;
      // Calculate progress 
      const progress = Math.min(timeElapsed / duration, 1);
      // Set the scrolleft
      element.scrollLeft = scrollPos + scrollPixels * progress;
      // Check if elapsed time is less then duration then call the requestAnimation, otherwise exit
      if (timeElapsed < duration) {
        window.requestAnimationFrame(scroll);
      } else {
        return;
      }
    }
    //Call requestAnimationFrame on scroll function first time
    window.requestAnimationFrame(scroll);
  }
}

const previouShowsList = (genre, containerId) => {
  scrollTo(document.getElementById(containerId), -300, 800);
}
const nextShowsList = (genre, containerId) => {
  scrollTo(document.getElementById(containerId), 300, 800);
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
.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrolling-wrapper::-webkit-scrollbar {
  display: none;
}
.movie-card {
  display: inline-block;
}
</style>
<template>
  <ShowDetails :selectedShowDetails="selectedShowDetails" />
  <div class="">
    <Header />
    <div v-if="isLoading" class="text-center mt-100 text-gray-300"><Loader /></div>
      <div v-if="error" class="text-center mt-50 text-rose-400">{{error}}</div>
    <div v-if="shows" class="desktop-view container mx-auto px-2 py-14">
      <div class="mt-5" v-for="(genreName, index) in groupByGenre" :key="index">
        <div class="flex flex-row items-center justify-between">
          <div class="text-gray-300 px-10 text-lg mb-2 font-light ">{{ genreName }}</div>
        </div>
        <div class="flex text-transparent hover:text-gray-400 flex-row items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
            @click="previouShowsList(genreName, `list-${index}`)" stroke="currentColor"
            class="hover:text-white hover:cursor-pointer w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <div
            :id="`list-${index}`"
            class="flex overflow-hidden relative w-full flex-grow duration-700 ease-in-out items-center space-x-6">
            <div ref="getSelected" class="flex-shrink-0 shadow-xl" v-for="(show, index) in showListing(genreName)" :key="index"
              @click="openShowDetailsModal(show)">
              <img :src="show?.image?.medium"
                class="rounded-lg hover:bg-slate-200 hover:cursor-pointer hover:opacity-30" />
              <div
                class="bg-white bg-opacity-50 backdrop-blur-sm drop-shadow-lg rounded-b-lg hover:bg-gray-500 hover:text-white hover:cursor-pointer absolute bottom-0 p-2 w-full text-gray-900">
                <span class="font-bold flex items-center justify-center">{{ show.name }}</span>
              </div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  @click="nextShowsList(genreName, `list-${index}`)"
            stroke-width="1" stroke="currentColor" class="hover:text-white hover:cursor-pointer w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Mobile View -->
    <div class="mobile-view px-6 py-24">
      <div v-if="isLoading" class="text-center mt-40 text-gray-300"><Loader /></div>
      <div v-if="error" class="text-center mt-40 text-rose-400">{{error}}</div>
      <div v-if="shows">
      <div class="mt-5" v-for="(genreName, index) in groupByGenre" :key="index">
        <div class="text-gray-300 text-lg mb-2 font-light ">{{ genreName }}</div>
        <div class="flex relative scrolling-wrapper flex-grow duration-700 ease-in-out items-center space-x-6">
          <div class="flex-shrink-0 w-32 movie-card shadow-xl" v-for="(show, index) in showListing(genreName)"
            :key="index" @click="openShowDetailsModal(show)">
            <img :src="show?.image?.medium"
              class="rounded-lg hover:bg-slate-200 hover:cursor-pointer hover:opacity-30" />
            <div
              class="bg-white bg-opacity-50 w-full backdrop-blur-sm drop-shadow-lg rounded-b-lg hover:bg-gray-500 hover:text-white hover:cursor-pointer absolute bottom-0 p-2 text-gray-900">
              <span class="font-bold text-sm truncate flex items-center justify-center">{{ show.name }}</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

