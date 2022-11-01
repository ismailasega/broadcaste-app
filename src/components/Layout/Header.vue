<!--
  * @Author: Ismail Debele Asega
  * @Email: asega03@gmail.com
  * @LinkedIn: https://www.linkedin.com/in/asegaismail/
  * @Github: https://github.com/ismailasega
  * @GitLab: https://gitlab.com/asegaismail
  * @Tel: +256-784-491412 / +256-756-454376
 -->

<script setup>
import SearchBar from './SearchBar.vue'

</script>
<style scoped>

</style>
<template>
    <!-- Desktop View -->
    <div
        class="desktop-view flex top-0 fixed z-20 bg-black h-20 px-4 w-full shadow-md flex-row items-center justify-between">
        <h1 class="font-bold text-gray-200 text-xl">BROADCASTER</h1>
        <div class="flex items-center flex-row">
            <SearchBar />
            <button class="ml-4 bg-lime-700 hover:bg-lime-600 p-1.5 rounded shadow-md font-md text-white text-sm">Create
                Account</button>
        </div>
    </div>
    <!-- Mobile View -->
    <div
        class="mobile-view flex py-4 top-0 fixed z-20 bg-black h-30 px-4 w-full shadow-md flex-col items-center justify-between">
        <div class="flex flex-row justify-between items-center">
            <div class="font-bold text-gray-200 text-xl">BROADCASTER</div>
            <button class="ml-4 bg-lime-700 hover:bg-lime-600 p-1.5 rounded shadow-md font-md text-white text-sm">Create
                Account</button>
        </div>
        <SearchBar class="mt-2" />
    </div>
</template>