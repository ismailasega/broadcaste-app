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
    <div class="flex top-0 fixed z-20 bg-black h-14 px-4 w-full shadow-md flex-row items-center justify-between">
        <div class="font-bold text-gray-200 text-xl">BROADCASTER</div>
        <div class="flex items-center flex-row">
            <SearchBar />
            <button class="ml-4 bg-lime-700 hover:bg-lime-600 p-1.5 rounded shadow-md font-md text-white text-sm">Create
                Account</button>
        </div>
    </div>
</template>