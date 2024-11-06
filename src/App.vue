<script setup>
import { RouterView } from 'vue-router'
import { useTodoStore } from "./stores/todo"

const todoStore = useTodoStore()
</script>

<template>
  <div>
    <nav class="border-gray-200 bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <span class="self-center text-lg font-semibold whitespace-nowrap text-white text-sm sm:text-2xl">To-Do Application</span>
        </a>

        <div class="w-full md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
            <!-- <li>
              <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 text-white md:text-blue-500" aria-current="page">To-Do List</a>
            </li> -->
            <li>
              <a @click="todoStore.initTaskForm()" href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">Create New Task</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  
  <RouterView/>
</template>
