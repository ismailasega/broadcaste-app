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
import { XCircleIcon, ChevronLeftIcon } from '@heroicons/vue/solid'

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
      <div class="grid justify-items-stretch absolute top-2 z-10">
      <ChevronLeftIcon @click="closeShowDetailsModal" class="h-12 w-12 justify-self-end hover:cursor-pointer hover:text-lime-600"/>
      </div>
    </div>
    <div class="mt-6 relative flex flex-col flex-1 overflow-auto ">
      <div class="">
      </div>
      <div class="w-1/2">
      </div>
    </div>
  </div>

</template>