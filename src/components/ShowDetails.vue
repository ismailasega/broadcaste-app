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
import { XCircleIcon } from '@heroicons/vue/solid'

const isShowDetailsModal = inject("isShowDetailsModal");
const openShowDetailsModal = inject("closeShowDetailsModal");
const closeShowDetailsModal = inject("closeShowDetailsModal");

</script>
<style scoped>

</style>
<template>
  <div class="top-0  px-4 block fixed z-30 w-full h-screen bg-[#181818] h-20" v-if="isShowDetailsModal">
    <div class="flex items-center justify-between border-b border-gray-400 p-4">
      <div class="text-2xl font-bold">Movie Title</div>
      <XCircleIcon @click="closeShowDetailsModal" class="h-10 w-10 hover:cursor-pointer hover:text-lime-600"/>
    </div>
  </div>

</template>