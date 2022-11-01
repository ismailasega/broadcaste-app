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
.detailsModal {
  height: 100vh
}

</style>
<template>
  <!-- Desktop View -->
  <div
    class="top-0 left-0 right-0 desktop-view detailsModal pb-10 block fixed overflow-x-hidden overflow-y-auto z-30 w-full bg-[#181818] h-20"
    v-if="isShowDetailsModal">
    <div class="w-[1039px] m-auto ">
      <div class="absolute -top-20">
        <div
          class="flex items-center z-50 fixed bg-[#181818] shadow-md w-[1039px] justify-between border-b border-gray-600 p-2">
          <div class="text-2xl font-medium text-gray-200">{{ selectedShowDetails?.name }}</div>
          <XCircleIcon @click="closeShowDetailsModal" class="h-6 w-6 hover:cursor-pointer hover:text-white" />
        </div>
      </div>
      <div class="mt-20 p-4 flex flex-row">
        <div class="w-1/2">
          <img :src="selectedShowDetails?.image?.original"
            class="rounded-lg m-auto w-[300px] flex items-center justify-center" />
        </div>
        <div class="w-1/2 px-12">
          <div class="bg-black bg-opacity-30 p-4 rounded-lg">
            <h6 class="text-gray-200 font-medium text-md pb-2">Genres</h6>
            <div class="grid grid-cols-4 gap-2 pb-2 text-center">
              <span v-for="(genre, index) in selectedShowDetails?.genres" :key="index">
                <span class="border border-gray-600 rounded-lg py-1 px-4 flex items-center justify-center text-sm">{{ genre }}</span>
              </span>
            </div>
            <div class="flex-row flex justify-between items-center pt-2 mt-2">
              <div>
                <h6 class="text-gray-200 font-medium text-md mb-1">Type</h6>
                <span class="bg-slate-600 rounded-md py-1 px-4 text-sm ">{{ selectedShowDetails?.type }}</span>
              </div>
              <div>
                <h6 class="text-gray-200 font-medium text-md mb-1">Runtime</h6>
                <span class="bg-blue-600 rounded-md py-1 px-4 text-sm ">{{ !selectedShowDetails?.runtime + ' '
                    + 'mins' ? '--' + ' ' + 'mins' : selectedShowDetails?.runtime + ' ' + 'mins'
                }}</span>
              </div>
              <div>
              <h6 class="text-gray-200 font-medium text-md mb-1">Rating</h6>
              <span class="bg-orange-600 rounded-md py-1 px-4 text-sm flex flex-row items-center "><span>{{
                  !selectedShowDetails?.rating?.average ? 0 : selectedShowDetails?.rating?.average
              }}</span>
                <StarIcon class="ml-1 h-4 w-4" />
              </span>
              </div>
            </div>
            <div class="flex flex-row items-center justify-between mt-5 border-b border-gray-700 pb-4">
              <div>
                <h6 class="text-gray-200 font-medium text-md">Language</h6>
                <span class="text-sm">{{ selectedShowDetails?.language }}</span>
              </div>
              <div>
                <h6 class="text-gray-200 font-medium text-md">Premiered</h6>
                <span class="text-sm">{{ selectedShowDetails?.premiered }}</span>
              </div>
              <div>
                <h6 class="text-gray-200 font-medium text-md">Status</h6>
                <span class="text-sm">{{ selectedShowDetails?.status }}</span>
              </div>
            </div>
          </div>
          <div class="py-7 px-4">
            <div class="mt-2 pb-4">
              <h6 class="text-gray-200 font-medium text-md pb-2">Schedule</h6>
              <div class="grid grid-cols-4 gap-2 pb-2 text-center">
                <div v-for="(schedule, index) in selectedShowDetails?.schedule?.days" :key="index">
                  <span class="border border-gray-600 rounded-lg py-1 px-4 flex items-center justify-center text-sm">{{schedule}}</span>
                </div>
              </div>
              <span class="text-sm">Time: {{ !selectedShowDetails?.schedule?.time ? 'Not Specified' : selectedShowDetails?.schedule?.time  }}</span>
            </div>
            <div class=" mt-2 pb-4 flex flex-row items-center">
              <div class=" border-r border-gray-600 pr-5 ">
                <h6 class="text-gray-200 font-medium text-md">Network</h6>
                <div class="flex flex-col">
                  <span class="text-sm">{{ selectedShowDetails?.network?.name }}</span>
                  <span class="text-sm">Country: {{ !selectedShowDetails?.network?.country?.name ? 'Not Specified' : selectedShowDetails?.network?.country?.name}}</span>
                  <span class="text-sm">Timezone: {{ !selectedShowDetails?.network?.country?.timezone ? 'Not Specified' : selectedShowDetails?.network?.country?.timezone}}</span>

                </div>
              </div>
              <div class="pl-5">
                <h6 class="text-gray-200 font-medium text-md">Web Channel</h6>
                <div class="flex flex-col">
                  <span class="text-sm">{{ selectedShowDetails?.webChannel?.name }}</span>
                  <span class="text-sm">Country: {{ !selectedShowDetails?.webChannel?.country?.name ? 'Not Specified' : selectedShowDetails?.webChannel?.country?.name}}</span>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-5 bg-black bg-opacity-30 rounded-xl">
        <div class="mt-2 pb-4">
          <h6 class="text-gray-200 font-medium text-md">Summary</h6>
          <div class="text-sm" v-html="!selectedShowDetails?.summary ? 'Not Specified' : selectedShowDetails?.summary"> </div>
        </div>
        <div class="mt-2">
          <h6 class="text-gray-200 font-medium text-md">Official site</h6>
          <a :href="selectedShowDetails?.officialSite" class="text-sm">{{ !selectedShowDetails?.officialSite ? 'Not Specified' : selectedShowDetails?.officialSite }}</a>
        </div>
      </div>
    </div>
  </div>
  <!-- Mobile View -->
  <div class="top-0 mobile-view detailsModal block overflow-y-auto pb-20 fixed z-30 w-full bg-[#181818]"
    v-if="isShowDetailsModal">
    <div class="relative">
      <img :src="selectedShowDetails?.image?.original"
        class="opacity-70 w-[500px] h-[650px]" />
      <div class="bg-gradient-to-t from-[#181818] h-full absolute bottom-0 p-2 w-full text-gray-900"></div>
      <div class="m-10 ">
        <div
          class="bg-white bg-opacity-10 flex flex-col z-40 backdrop-blur-xm drop-shadow-lg rounded-lg absolute bottom-0 p-2 w-full text-white">
          <span class="font-bold text-xl px-2 mb-4">{{ selectedShowDetails?.name }}</span>
          <div class="flex flex-col px-4">
            <div class="grid grid-cols-3 gap-2 text-center">
              <span v-for="(genre, index) in selectedShowDetails?.genres" :key="index">
                <span class="bg-pink-600 flex items-center justify-center rounded-md py-1 px-4 text-sm">{{ genre }}</span>
              </span>
            </div>
            <div class="flex-row flex justify-between items-center border-t border-gray-700 pt-4 mb-3 mt-4">
              <span class="bg-slate-600 rounded-md py-1 px-4 text-sm ">{{ selectedShowDetails?.type }}</span>
              <span class="bg-blue-600 rounded-md py-1 px-4 text-sm ">{{ !selectedShowDetails?.runtime + ' '
                    + 'mins' ? '--' + ' ' + 'mins' : selectedShowDetails?.runtime + ' ' + 'mins'
              }}</span>
              <span class="bg-orange-600 rounded-md py-1 px-4 text-sm flex flex-row items-center "><span>{{
                  !selectedShowDetails?.rating?.average ? 0 : selectedShowDetails?.rating?.average
              }}</span>
                <StarIcon class="ml-1 h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="grid justify-items-stretch absolute top-5 z-50">
        <ChevronLeftIcon @click="closeShowDetailsModal"
          class="h-12 w-12 bg-white text-white rounded-r-2xl bg-opacity-20 backdrop-blur-sm drop-shadow-lg hover:cursor-pointer hover:text-black fixed" />
      </div>
    </div>
    <div class="mt-20 px-6 z-40">
      <div class="flex px-4 flex-row items-center justify-between border-b border-gray-700 pb-4">
        <div>
          <h6 class="text-gray-200 font-medium text-md">Language</h6>
          <span class="text-sm">{{ selectedShowDetails?.language }}</span>
        </div>
        <div>
          <h6 class="text-gray-200 font-medium text-md">Premiered</h6>
          <span class="text-sm">{{ selectedShowDetails?.premiered }}</span>
        </div>
        <div>
          <h6 class="text-gray-200 font-medium text-md">Status</h6>
          <span class="text-sm">{{ selectedShowDetails?.status }}</span>
        </div>
      </div>
      <div class="mt-2 px-4 border-b border-gray-700 pb-4">
        <h6 class="text-gray-200 font-medium text-md pb-2">Schedule</h6>
        <div class="grid grid-cols-4 gap-2 pb-2 text-center">
          <div v-for="(schedule, index) in selectedShowDetails?.schedule?.days" :key="index">
            <span class="border border-gray-600 rounded-lg py-1 px-4 flex items-center justify-center text-sm">{{ schedule }}</span>
          </div>
        </div>
        <span class="text-sm">Time: {{ !selectedShowDetails?.schedule?.time ? 'Not Specified' : selectedShowDetails?.schedule?.time }}</span>
      </div>
      <div class="mt-2 px-4 pb-4">
        <h6 class="text-gray-200 font-medium text-md">Network</h6>
        <div class="flex flex-col">
          <span class="text-sm">{{ selectedShowDetails.network?.name }}</span>
          <span class="text-sm">Country: {{ !selectedShowDetails?.network?.country?.name ? 'Not Specified' : selectedShowDetails?.network?.country?.name }}</span>
          <span class="text-sm">Timezone: {{ !selectedShowDetails?.network?.country?.timezone ? 'Not Specified' : selectedShowDetails?.network?.country?.timezone }}</span>

        </div>
      </div>
      <div class="mt-2 px-4 pb-4">
        <h6 class="text-gray-200 font-medium text-md">Web Channel</h6>
        <div class="flex flex-col">
          <span class="text-sm">{{ selectedShowDetails?.webChannel?.name }}</span>
          <span class="text-sm">Country: {{ !selectedShowDetails?.webChannel?.country?.name ? 'Not Specified' : selectedShowDetails?.webChannel?.country?.name }}</span>
        </div>
      </div>
      <div class="p-4 bg-black bg-opacity-30 rounded-xl">
        <div class="pb-4">
          <h6 class="text-gray-200 font-medium text-md">Summary</h6>
          <div class="text-sm" v-html="!selectedShowDetails?.summary ? 'Not Specified' : selectedShowDetails?.summary"> </div>
        </div>
        <div class="mt-2 border-b border-gray-700 pb-4">
          <h6 class="text-gray-200 font-medium text-md">Official site</h6>
          <a :href="selectedShowDetails?.officialSite" class="text-sm">{{ !selectedShowDetails?.officialSite ? 'Not Specified' : selectedShowDetails?.officialSite}}</a>
        </div>

      </div>
    </div>
  </div>

</template>