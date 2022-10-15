<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    <div>
        <img src="./../assets/VueLogo.png" style="margin: 10px 10px" />
    </div>

    <div class="container">
        <div class="row">
            <div class="col float-start">

                <router-link to="/ListView">
                    <img src="./../assets/VueListActive.png" width="30" height="30" alt="List"
                        style="vertical-align: middle; margin: 0px 10px" />
                </router-link>

                <router-link to="/StateView">
                    <img src="./../assets/VueDragListDeActive.png" width="30" height="30" alt="State"
                        style="vertical-align: middle; margin: 0px 10px" />
                </router-link>

            </div>
            <!--<div class="col">
                <input class="form-control" v-model="search" placeholder="Search title.." type="search"
                    style="display: inline" />
            </div>-->
            <div class="col">
                <img src="./../assets/VueFilter.png" width="20" height="20" alt="Filter" style="display: inline" />
            </div>
            <div class="col">
                <img src="./../assets/VueAdd.png" @click="insertTask" alt="New" />
            </div>

        </div>
    </div>

    <!-- INICI DEL LLISTAT  -->

    <div><br /></div>
    <div class="container vertical-scrollable ">
        <div v-for="task in TaskList" :key="task.id">
            <ItemList :task="task" @task-update="taskStore.updateTask()">
            </ItemList>
        </div>
    </div>
</template>
  
<script>
import ItemList from "../components/ItemList.vue"
import { useTaskStore } from '../stores/TaskStore'

export default {

    setup() {
        const taskStore = useTaskStore()
        return { taskStore }
    },

    computed: {
        TaskList() {
            console.log(this.taskStore.taskList)
            return this.taskStore.getTaskList
        }
    },

    components: {
        ItemList,
    },

    methods: {
        insertTask() {
            this.taskStore.insertTask()
        }

        /*filteredList() {
            return this.taskList.filter((task) => {
                return task.title.toLowerCase().includes(this.search.toLowerCase());
            });
        },*/
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
  