import { defineStore } from 'pinia'
import axios from 'axios'

export const useTodoStore = defineStore('todo', {
    state: () => {
        return {
            apiUrl: import.meta.env.VITE_TODO_APP_API_URL,
            taskFormData: {},
            data: {},
            todoItems: [],
            status: 'All'
        };
    },
    actions: {
        initTaskForm(data = null) {
            this.taskFormData = {
                id: data?.id ?? null,
                title: data?.title ?? '',
                description: data?.description ?? '',
                status: data?.status ?? 'Pending'
            };

            document.getElementById('taskFormModal').classList.remove('hidden');
        },
        statusFilterOnChange(event) {
            this.fetchData();
        },
        onChangePage(page) {
            if (Number.isInteger(page)) {
                this.fetchData(page);
            } else if (page == 'next' && this.data.next_page_url != null) {
                this.fetchData(this.data.current_page + 1);
            } else if (page == 'prev' && this.data.prev_page_url != null) {
                this.fetchData(this.data.current_page - 1);
            }
        },
        fetchData(page = 1) {
            axios.get(this.apiUrl + '/api/v1/todo', {
                params: {
                    page: page,
                    status: this.status
                }
            }).then((response) => {
                this.data = response.data;
                this.todoItems = this.data?.data ?? [];
            }).catch((err) => {
                alert(err.message);
            });
        },
        closeTaskModal() {
            document.getElementById('taskFormModal').classList.add('hidden');
        },
        deleteConfirmation(task) {
            if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
                // Delete Todo
                axios.delete(`${this.apiUrl}/api/v1/todo/${task.id}`).then((response) => {
                    this.fetchData();
                    this.closeTaskModal();
                }).catch((err) => {
                    alert(err.message);
                });
            }
        },
        saveTask(data) {
            const isUpdate = data.id != null;

            const endpoint = this.apiUrl + '/api/v1/todo';

            const todoId = data.id;
            delete data.id;

            if (isUpdate) {
                // Update Todo
                axios.put(`${endpoint}/${todoId}`, data).then((response) => {
                    this.fetchData();
                    this.closeTaskModal();
                }).catch((err) => {
                    alert(err.message);
                });
            } else {
                // Insert new Todo
                axios.post(endpoint, data).then((response) => {
                    console.log(response)
                    this.fetchData();
                    this.closeTaskModal();
                }).catch((err) => {
                    alert(err.message);
                });
            }
        }
    },
    getters: {
        getTodoItems: (state) => state.todoItems,
        formData: (state) => state.taskFormData
    }
});