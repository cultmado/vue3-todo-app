<script setup>
    import TaskModal from '@/components/TaskModal.vue';
    import { useTodoStore } from "../../stores/todo";

    const todoStore = useTodoStore();
    todoStore.fetchData();
</script>

<template>
    <TaskModal/>
    <div class="w-full flex justify-center">
        <div class="container">
        <div class="flex flex-col items-center justify-center p-4 gap-4">
            <div class="w-full flex justify-start">
                <div>
                    <label class="block mb-2 text-sm font-medium">Todo Status</label>
                    <select @change="todoStore.statusFilterOnChange($event)" v-model="todoStore.status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>
                <div class="w-full overflow-x-auto overflow-hidden">
                    <div class="relative shadow-md ">
                        <table class="w-full text-sm text-left text-gray-500 text-gray-400">
                            <thead class="text-xs uppercase bg-gray-700 text-gray-100">
                                <tr>
                                    <th scope="col" class="px-6 py-3">Id</th>
                                    <th scope="col" class="px-6 py-3">Title</th>
                                    <th scope="col" class="px-6 py-3">Description</th>
                                    <th scope="col" class="px-6 py-3">Status</th>
                                    <th scope="col" class="px-6 py-3">Created At</th>
                                    <th scope="col" class="px-6 py-3">Updated At</th>
                                    <th scope="col" class="px-6 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="todoStore.getTodoItems.length > 0">
                                    <tr v-for="task in todoStore.getTodoItems" class="border-b bg-gray-800 border-gray-700 hover:bg-gray-50 hover:bg-gray-600 text-gray-200">
                                        <td class="px-6 py-4 font-medium whitespace-nowrap">
                                            {{task.id}}
                                        </td>
                                        <td class="px-6 py-4">
                                            {{task.title}}
                                        </td>
                                        <td class="px-6 py-4">
                                            {{task.description}}
                                        </td>
                                        <td class="px-6 py-4">
                                            <span :class="{'bg-green-500': task.status == 'Completed', 'bg-orange-500': task.status == 'Pending'}" class="px-2 py-[3px] rounded-lg text-xs text-gray-900 font-semibold">
                                                {{task.status}}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4">
                                            {{task.created_at}}
                                        </td>
                                        <td class="px-6 py-4">
                                            {{task.updated_at}}
                                        </td>
                                        <td class="px-6 py-4 text-right flex justify-center gap-2">
                                            <a @click="todoStore.initTaskForm(task)" href="javascript:;" class="font-medium text-blue-600 text-blue-500 hover:underline">Edit</a>
                                            <p>|</p>
                                            <a @click="todoStore.deleteConfirmation(task)" href="javascript:;" class="font-medium text-red-600 text-red-500 hover:underline">Delete</a>
                                        </td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr class="border-b bg-gray-800 border-gray-700">
                                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-white text-center" colspan="7">No Items Found</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>

                <nav>
                    <ul class="inline-flex text-sm">
                        <li>
                            <a @click="todoStore.onChangePage('prev')" href="javascript:;" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"><</a>
                        </li>

                        <template v-for="(link, idx) in todoStore.data.links">
                            <li v-if="idx != 0 && idx != todoStore.data.links.length - 1">
                                <a @click="todoStore.onChangePage(parseInt(link.label))" href="javascript:;" :class="{'bg-gray-600': link.active}" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">{{link.label}}</a>
                            </li>
                        </template>

                        <li>
                            <a @click="todoStore.onChangePage('next')" href="javascript:;" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>

</template>