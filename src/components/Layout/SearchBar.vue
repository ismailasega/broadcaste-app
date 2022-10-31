<!--
  * @Author: Ismail Debele Asega
  * @Email: asega03@gmail.com
  * @LinkedIn: https://www.linkedin.com/in/asegaismail/
  * @Github: https://github.com/ismailasega
  * @GitLab: https://gitlab.com/asegaismail
  * @Tel: +256-784-491412 / +256-756-454376
 -->

 <script setup>
 import { ref, onMounted, computed, reactive } from "vue";
 import { SearchIcon } from '@heroicons/vue/outline'
 import { XCircleIcon,  EmojiSadIcon } from '@heroicons/vue/solid'
 import { useShowsStore } from '@/stores/ShowsStore';

 const showsStore = useShowsStore()

const state = reactive({
  searchOptions: false
})

const isSearch = ref(true);
const searchField = ref(false);
/**
 * 
 * Methods to toggle the search field input section
 */
const showSearchField = () => {
  isSearch.value = false;
  searchField.value = true;
  state.searchOptions = false;
}

const hideSearchField = () => {
  isSearch.value = true;
  searchField.value = false;
  state.searchOptions = false;
  keyword.value = "";
  showsStore.getAllTvShows()
}

/**
 * 
 * Methods to show/hide search options dropdown
 */
const showSearchOptions = () => {
  state.searchOptions = true
  showsStore.getAllTvShows()
}

const hideSearchOptions = () => {
  setTimeout(() => {
    state.searchOptions = false
  }, 200);
}

/**
 * 
 * Search autocomplete input field filter
 */
const keyword = ref("");
const filteredShowNames = computed(() => {
  let tvShowName = [];
  if(!keyword) {
    tvShowName = showsStore.shows
  }
  if(keyword){
    showsStore.shows.filter((show) => {
    if(show?.name
    ?.toString()
    ?.toLowerCase()
    ?.indexOf(keyword.value.toString().toLowerCase()) > -1)
    tvShowName.push(show);
  })
  }
  return tvShowName
})

/**
 * 
 * Selecting a search option
 */
const selectedShowName = (showName) => {
  showsStore.searchShowsByName(showName.name);
  keyword.value = showName.name;
  console.log('selctedName', showName)
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
input{
  background: transparent;
  outline: none;
  border: none;
}

</style>
<template>
      <!-- Desktop-view -->
        <div class="desktop-view">
            <div v-if="isSearch" @click="showSearchField" class="flex items-center shadow-md hover:cursor-pointer border border-gray-600 rounded p-1.5 flex-row">
              <SearchIcon class="h-4" />
              <span class="text-sm ml-2 font-md">Search...</span>
            </div>
            <div v-if="searchField" class="flex border border-gray-600 rounded p-1.5 items-center flex-row">
              <SearchIcon class="h-4"/>
              <input class="ml-2 w-full" type="text" v-model="keyword" autofocus @focus="showSearchOptions" @blur="hideSearchOptions"/>
              <XCircleIcon @click="hideSearchField" class="h-4 hover:cursor-pointer hover:text-lime-600"/>
            </div>
            <div v-if="state.searchOptions" class="bg-white mt-1 bg-opacity-80 backdrop-blur-sm drop-shadow-lg rounded-b-lg w-80 h-60 z-40 overflow-y-auto text-sm absolute ">
              <div v-if="filteredShowNames.length > 0">
              <div class="grid grid-cols-1 divide-y" v-for="(show, index) in filteredShowNames" :key="index" @click="selectedShowName(show)">
                <div class="text-gray-900 p-2 border-b border-gray-400 hover:font-bold hover:text-black hover:cursor-pointer">{{show.name}}</div>
              </div>
              </div>
              <div v-else class="mt-20 text-gray-900 flex flex-col items-center justify-center">
                <EmojiSadIcon class="h-12 w-12" />
                <span class="flex items-center justify-center text-sm">No tv shows listed with the specified show name</span>
              </div>
            </div>
            <div>
            </div>
        </div>
        <!-- Mobile View -->
        <div class="mobile-view">
            <div v-if="isSearch" @click="showSearchField" class="flex items-center mt-2 shadow-md hover:cursor-pointer border border-gray-600 rounded p-1.5 flex-row">
              <SearchIcon class="h-4" />
              <span class="text-sm ml-2 font-md">Search...</span>
            </div>
            <div v-if="searchField" class="flex border border-gray-600 rounded mt-2 p-1.5 items-center flex-row">
              <SearchIcon class="h-4"/>
              <input class="ml-2 w-full" type="text" v-model="keyword" autofocus @focus="showSearchOptions" @blur="hideSearchOptions"/>
              <XCircleIcon @click="hideSearchField" class="h-4 hover:cursor-pointer hover:text-lime-600"/>
            </div>
            <div v-if="state.searchOptions" class="bg-white mt-1 bg-opacity-80 backdrop-blur-sm drop-shadow-lg rounded-b-lg w-full h-60 z-40 overflow-y-auto text-sm absolute ">
              <div v-if="filteredShowNames.length > 0">
              <div class="grid grid-cols-1 divide-y" v-for="(show, index) in filteredShowNames" :key="index" @click="selectedShowName(show)">
                <div class="text-gray-900 p-2 border-b border-gray-400 hover:font-bold hover:text-black hover:cursor-pointer">{{show.name}}</div>
              </div>
              </div>
              <div v-else class="mt-20 text-gray-900 flex flex-col items-center justify-center">
                <EmojiSadIcon class="h-12 w-12" />
                <span class="flex items-center justify-center text-sm">No tv shows listed with the specified show name</span>
              </div>
            </div>
            <div>
            </div>
        </div>
</template>