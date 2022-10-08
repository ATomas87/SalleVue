<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    <div><br /></div>
    <div>
        <img src="./assets/VueLogo.png" style="margin: 20px 30px" />
    </div>
    <br />
    <div class="container">
        <div class="row">
            <div class="col float-start">
                <img src="./assets/VueListActive.png" width="30" height="30" alt="Edit"
                    style="vertical-align: middle; margin: 0px 10px" />
                <img src="./assets/VueDragListDeActive.png" width="30" height="30" alt="Edit"
                    style="vertical-align: middle; margin: 0px 10px" />
            </div>
            <div class="col">
                <input class="form-control" v-model="search" placeholder="Search title.." type="search"
                    style="display: inline" />
            </div>
            <div class="col">
                <img src="./assets/VueFilter.png" width="20" height="20" alt="Filter" style="display: inline" />
            </div>
        </div>
    </div>

    <!-- INICI DEL LLISTAT  -->

    <div><br /></div>
    <div class="container">
        <div data-bs-spy="scroll" data-bs-target="#navbar-example" data-bs-offset="0" class="scrollspy-example"
            tabindex="0">
            <div v-for="task in taskList" :key="task.id">
                <div class="card">
                    <div :class="
                      task.state === 'Todo'
                        ? 'card-header list-group-item-danger'
                        : task.state === 'Done'
                        ? 'card-header list-group-item-success'
                        : 'card-header list-group-item-warning'
                    ">
                        <p v-if="!task.isEditable">{{ task.state }}</p>
                        <input :class="
                          task.state === 'Todo'
                            ? 'card-header list-group-item-danger'
                            : task.state === 'Done'
                            ? 'card-header list-group-item-success'
                            : 'card-header list-group-item-warning'
                        " type="text" v-else @blur="changeInput(task.id)" v-model="task.state" />
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">
                            <p v-if="!task.isEditable">{{ task.title }}</p>
                            <input class="form-control" type="text" v-else @blur="changeInput(task.id)"
                                v-model="task.title" />
                        </h5>
                        <p class="card-text" v-if="!task.isEditable">
                            {{ task.description }}
                        </p>
                        <input class="form-control" type="text" v-else @blur="changeInput(task.id)"
                            v-model="task.description" />
                        <div class="mb-1">
                            <small class="text-muted" v-if="!task.isEditable">
                                {{ task.date }}
                            </small>
                            <input class="form-control" type="date" v-else @blur="changeInput(task.id)"
                                v-model="task.date" />
                        </div>
                        <div class="float-end">
                            <img src="./assets/VueEdit.png" width="20" height="20" alt="Edit"
                                style="vertical-align: middle; margin: 0px 10px" @click="changeInput(task.id)" />
                            <img src="./assets/VueDelete.png" width="16" alt="Delete"
                                style="vertical-align: middle; margin: 0px 10px" @click="removeTask(task.id)" />
                            <img src="./assets/VueDots.png" width="5" alt="More"
                                style="vertical-align: middle; margin: 0px 10px" />
                        </div>
                    </div>
                </div>
                <br />
            </div>
        </div>
        <div>
            <img src="./assets/VueAdd.png" @click="insertTask()" alt="New" />
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            search: "",
            task: {
                id: 0,
                title: "",
                description: "",
                state: "",
                date: "",
                isEditable: false,
            },
            taskList: [
                {
                    id: 1,
                    title: "1. Special title treatment",
                    description:
                        "With supporting text below as a natural lead-in to additional content",
                    state: "Done",
                    date: "2022-10-01",
                    isEditable: false,
                },
                {
                    id: 2,
                    title: "2. Special title treatment",
                    description:
                        "With supporting text below as a natural lead-in to additional content 2",
                    state: "Todo",
                    date: "2022-10-02",
                    isEditable: false,
                },
                {
                    id: 3,
                    title: "3. Special title treatment",
                    description:
                        "With supporting text below as a natural lead-in to additional content 2",
                    state: "InProgress",
                    date: "2022-10-05",
                    isEditable: false,
                },
            ],
        };
    },
    methods: {
        changeInput(id) {
            let tsk = this.taskList.find((task) => task.id === id);
            tsk.isEditable = !tsk.isEditable;
            //console.log(tsk);
        },
        //CRUD
        insertTask() {
            let newtask = {
                id: this.newtask,
                title: "This is a new task",
                description: "Please enter a new description for this task",
                state: "Todo",
                date: "",
                isEditable: true,
            };
            if (newtask.title.length > 0) {
                this.taskList.push(newtask);
            }
        },
        updateTask(id) { },
        removeTask(id) {
            const indexOfObject = this.taskList.findIndex((object) => {
                return object.id === id;
            });
            this.taskList.splice(indexOfObject, 1);
        },
        selectTask() { },
    },

    computed: {
        newTask() {
            this.taskList.reduce((max, curr) => Math.max(max, curr.task.id), 0) + 1;
        },
    },
    filteredList() {
        return this.taskList.filter((task) => {
            return task.title.toLowerCase().includes(this.search.toLowerCase());
        });
    },
};
</script>
  
<style>

</style>
  