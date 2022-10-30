<!--
  * @Author: Ismail Debele Asega
  * @Email: asega03@gmail.com
  * @LinkedIn: https://www.linkedin.com/in/asegaismail/
  * @Github: https://github.com/ismailasega
  * @GitLab: https://gitlab.com/asegaismail
  * @Tel: +256-784-491412 / +256-756-454376
 -->

 <script setup>
 import { ref } from "vue";
 import { SearchIcon } from '@heroicons/vue/outline'
 import { XCircleIcon } from '@heroicons/vue/solid'

const isSearch = ref(true)
const searchField = ref(false)

const showSearchField = () => {
  isSearch.value = false;
  searchField.value = true;
}

const hideSearchField = () => {
  isSearch.value = true;
  searchField.value = false;
}


</script>
<style scoped>
input{
  background: transparent;
  outline: none;
  border: none;
}

</style>
<template>
        <div>
            <div v-if="isSearch" @click="showSearchField" class="flex items-center shadow-md hover:cursor-pointer border border-gray-600 rounded p-1.5 flex-row">
              <SearchIcon class="h-4" />
              <span class="text-sm ml-2 font-md">Search...</span>
            </div>
            <div v-if="searchField" class="flex border border-gray-600 rounded p-1 items-center flex-row">
              <SearchIcon class="h-4"/>
              <input class="ml-2" type="text" autofocus />
              <XCircleIcon @click="hideSearchField" class="h-4 hover:cursor-pointer hover:text-lime-600"/>
            </div>
        </div>
</template>