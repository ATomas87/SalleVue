<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />

    <div class="card">
        <div :class="
          task.state === 'Todo'
            ? 'card-header list-group-item-danger'
            : task.state === 'Done'
            ? 'card-header list-group-item-success'
            : 'card-header list-group-item-warning'
        ">
            <p v-if="!task.isEditable">{{ task.state }}</p>
            <select :class="
              task.state === 'Todo'
                ? 'card-header list-group-item-danger'
                : task.state === 'Done'
                ? 'card-header list-group-item-success'
                : 'card-header list-group-item-warning'
            " v-else @blur="task.isEditable=!task.isEditable" v-model="task.state">
                <option value="Todo">Todo</option>
                <option value="Done">Done</option>
            </select>
        </div>
        <div class="card-body">
            <h5 class="card-title">
                <p v-if="!task.isEditable">{{ task.title }}</p>
                <input class="form-control" type="text" v-else @blur="task.isEditable=!task.isEditable"
                    v-model="task.title" />
            </h5>
            <p class="card-text" v-if="!task.isEditable">
                {{ task.description }}
            </p>
            <input class="form-control" type="text" v-else @blur="task.isEditable=!task.isEditable"
                v-model="task.description" />
            <div class="mb-1">
                <small class="text-muted" v-if="!task.isEditable">
                    {{ task.date }}
                </small>
                <input class="form-control" type="date" v-else @blur="task.isEditable=!task.isEditable"
                    v-model="task.date" />
            </div>
            <div class="float-end">
                <img src="./../assets/VueEdit.png" width="20" height="20" alt="Edit"
                    style="vertical-align: middle; margin: 0px 10px" @click="task.isEditable=!task.isEditable" />
                <img src="./../assets/VueDelete.png" width="16" alt="Delete"
                    style="vertical-align: middle; margin: 0px 10px" @click="deleteTask" />
            </div>
        </div>
    </div>
</template>

<script>

import { useTaskStore } from '../stores/TaskStore'

export default {
    name: "ItemList",
    props: {
        task: {
            id: Number,
            title: String,
            description: String,
            state: String,
            date: Date,
            isEditable: Boolean,
        },
    },

    setup() {
        const taskStore = useTaskStore()
        return { taskStore }
    },

    methods: {
        updateTask() {
            this.taskStore.updateTask(this.task)
        },
        deleteTask() {
            this.taskStore.deleteTask(this.task.id)
        }
    },

}
</script>

<style scoped>

</style>