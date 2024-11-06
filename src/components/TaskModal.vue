<script setup>
import { useTodoStore } from "../stores/todo"

const todoStore = useTodoStore()
</script>

<template>
    <div id="taskFormModal" class="relative z-10 hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <form @submit.prevent="todoStore.saveTask(todoStore.formData)">
                        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3 class="text-base font-semibold text-gray-900" id="modal-title">{{todoStore.formData.id != null ? 'Task Details' : 'Create New Task'}}</h3>
                                <div class="mt-2 w-full">
                                    
                                    <div class="flex flex-col justify-center py-2 gap-2">
                                        <div class="w-full">
                                            <label class="block mb-2 text-sm font-medium">Title</label>
                                            <input type="text" v-model="todoStore.formData.title" class="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Title" autocomplete="off" required />
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm font-medium">Description</label>
                                            <textarea rows="4" v-model="todoStore.formData.description" type="text" class="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Description" required></textarea>
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm font-medium">Status</label>
                                            <select v-model="todoStore.formData.status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
                                                <option value="Pending">Pending</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="submit" class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto">{{todoStore.formData.id != null ? 'Save Changes' : 'Save'}}</button>
                            <button @click="todoStore.closeTaskModal()" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>