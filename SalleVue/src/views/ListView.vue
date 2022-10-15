<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    <div>
        <img src="./../assets/VueLogo.png" style="margin: 10px 10px" />
    </div>

    <div class="container">
        <div class="row">
            <div class="col float-start">
                <img src="./../assets/VueListActive.png" width="30" height="30" alt="Edit"
                    style="vertical-align: middle; margin: 0px 10px" />
                <img src="./../assets/VueDragListDeActive.png" width="30" height="30" alt="Edit"
                    style="vertical-align: middle; margin: 0px 10px" />
            </div>
            <div class="col">
                <input class="form-control" v-model="search" placeholder="Search title.." type="search"
                    style="display: inline" />
            </div>
            <div class="col">
                <img src="./../assets/VueFilter.png" width="20" height="20" alt="Filter" style="display: inline" />
            </div>
        </div>
    </div>

    <!-- INICI DEL LLISTAT  -->

    <div><br /></div>
    <div class="container vertical-scrollable ">
        <div v-for="task in taskList" :key="task.id">
            <ItemList :task="task" @task-update="updateTask">
            </ItemList>
        </div>
    </div>
    <div>
        <img src="./../assets/VueAdd.png" @click="insertTask()" alt="New" />
    </div>
</template>
  
<script>
import ItemList from "../components/ItemList.vue"

export default {
    components: {
        ItemList,
    },
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
        //CRUD
        insertTask() {
            let newtask = {
                id: this.newtask,
                title: "This is a new task",
                description: "Please enter a new description for this task",
                state: "Todo",
                date: "",
                isEditable: false,
            };
            if (newtask.title.length > 0) {
                this.taskList.push(newtask);
            }
        },
        //metode per reemplaçar la info de la tasca editada per la tasca del llistat.
        updateTask(updatedtask) {
            this.taskList.forEach(task => {
                if (task.id === updatedtask.id) {
                    task.title = updatedtask.title;
                    task.description = updatedtask.description;
                    task.state = updatedtask.state;
                    task.date = updatedtask.date;
                }
            })
        }
    },

    computed: {
        newTask() {
            this.taskList.reduce((max, curr) => Math.max(max, curr.task.id), 0) + 1;
        },
    },

    tasksToShow() {
        return this.taskList
            ? this.taskList.filter(task => task.state !== "deleted")
            : this.taskList.filter(task => task.state === this.filterBy);
    },
    filteredList() {
        return this.taskList.filter((task) => {
            return task.title.toLowerCase().includes(this.search.toLowerCase());
        });
    },
};
</script>
  
<style>
.vertical-scrollable {
    /*  position: absolute; */
    /* top: 120px;
            bottom: 100px;
            left: 180px;           
            width: 50%;*/
    overflow-y: scroll;
}
</style>
  