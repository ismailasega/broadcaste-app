<!--
  * @Author: Ismail Debele Asega
  * @Email: asega03@gmail.com
  * @LinkedIn: https://www.linkedin.com/in/asegaismail/
  * @Github: https://github.com/ismailasega
  * @GitLab: https://gitlab.com/asegaismail
  * @Tel: +256-784-491412 / +256-756-454376
 -->

<script setup>
import { inject } from 'vue'
import { XCircleIcon, ChevronLeftIcon, StarIcon } from '@heroicons/vue/solid'

defineProps(['selectedShowDetails'])

const isShowDetailsModal = inject("isShowDetailsModal");
const openShowDetailsModal = inject("closeShowDetailsModal");
const closeShowDetailsModal = inject("closeShowDetailsModal");

</script>
<style scoped>
.detailsModal{
  height: 100vh;  
}

</style>
<template>
<!-- Desktop View -->
  <div class="top-0 desktop-view detailsModal px-4 block fixed z-30 w-full bg-[#181818] h-20" v-if="isShowDetailsModal">
    <div class="flex items-center justify-between border-b border-gray-400 p-4">
      <div class="text-2xl font-bold">{{selectedShowDetails.name}}</div>
      <XCircleIcon @click="closeShowDetailsModal" class="h-10 w-10 hover:cursor-pointer hover:text-lime-600"/>
    </div>
    <div class="mt-6 p-4 relative flex flex-row flex-1 overflow-auto ">
      <div class="w-1/2">
      <img :src="selectedShowDetails?.image?.original" class="rounded-lg w-[500px] flex items-center justify-center" />
      </div>
      <div class="w-1/2">
      </div>
    </div>
  </div>
  <!-- Mobile View -->
  <div class="top-0 mobile-view detailsModal block fixed z-30 w-full bg-[#181818] h-20" v-if="isShowDetailsModal">
    <div class="relative">
      <img :src="selectedShowDetails?.image?.original" class="rounded-lg opacity-70 w-[500px] flex items-center justify-center" />
      <div class="bg-gradient-to-t from-[#181818] h-full absolute bottom-0 p-2 w-full text-gray-900"></div>
      <div class="m-10 ">
      <div
        class="bg-white bg-opacity-20 flex flex-col z-40 backdrop-blur-sm drop-shadow-lg h-[100px] rounded-xl absolute bottom-0 p-2 w-full text-white">
        <span class="font-bold mb-4">{{ selectedShowDetails.name }}</span>
        <div class="flex flex-row justify-between items-center px-4">
        <span v-for="(genre, index) in selectedShowDetails.genres" :key="index">
          <span class="bg-pink-600 rounded-full py-1 px-4 text-sm ">{{genre}}</span>
        </span>
        <span class="bg-blue-600 rounded-full py-1 px-4 text-sm ">{{selectedShowDetails.runtime + ' ' +'mins'}}</span>
        <span class="bg-orange-600 rounded-full py-1 px-4 text-sm flex flex-row items-center "><span>{{selectedShowDetails.rating.average}}</span><StarIcon class="ml-1 h-4 w-4"/></span>   
        </div>
      </div>
      </div>
      <div class="grid justify-items-stretch absolute top-2 z-10">
      <ChevronLeftIcon @click="closeShowDetailsModal" class="h-12 w-12 justify-self-end hover:cursor-pointer hover:text-lime-600"/>
      </div>
    </div>
    <div class="mt-20 px-6 z-40">
      <div class="flex flex-row items-center justify-between border-b border-gray-600 pb-4">
      <div >
        <h6 class="text-gray-500 font-medium text-xl">Language</h6>
        <span>{{selectedShowDetails.language}}</span>
      </div>
      <div>
        <h6 class="text-gray-500 font-medium text-xl">Premiered</h6>
        <span>{{selectedShowDetails.premiered}}</span>
      </div>
      <div>
        <h6 class="text-gray-500 font-medium text-xl">Status</h6>
        <span>{{selectedShowDetails.status}}</span>
      </div>
      </div>
      <div class="mt-2">
        <h6 class="text-gray-500 font-medium text-xl">About</h6>
        <div v-html="selectedShowDetails.summary"> </div>
      </div>
      </div>
  </div>

</template>