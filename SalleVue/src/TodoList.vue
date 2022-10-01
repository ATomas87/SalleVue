<template>
    <div>
        <h1>My Todo List</h1>
    </div>
    <div>
        <div v-for="task in taskList" :key="task.id">
            <div>
                <div>
                    <p v-if="!task.isEditable">{{task.title }}</p>
                    <input type="text" v-else @blur="changeInput(task.id)" v-model="task.title" />
                </div>
                <div>
                    <p v-if="!task.isEditable">{{task.description }}</p>
                    <input type="text" v-else @blur="changeInput(task.id)" v-model="task.description" />
                </div>
                <div>
                    <p v-if="!task.isEditable">{{task.state }}</p>
                    <input type="text" v-else @blur="changeInput(task.id)" v-model="task.state" />
                </div>
                <div>
                    <p v-if="!task.isEditable">{{task.date }}</p>
                    <input type="date" v-else @blur="changeInput(task.id)" v-model="task.date" />
                </div>
                <div>
                    <img src="./assets/Edit.svg" @click="changeInput(task.id)" alt="Edit" />
                </div>
                <div>
                    <img src="./assets/Delete.svg" @click="removeTask(task.id)" alt="Remove" />
                </div>
            </div>
        </div>
        <div>
            <img src="./assets/Add.svg" @click="insertTask()" alt="New" />
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            task: {
                id: 0,
                title: "",
                description: "",
                state: "",
                date: "",
                isEditable: false
            },

            taskList: [
                // {
                //     id: 1,
                //     title: "Primera",
                //     description: "descripcion",
                //     state: "Todo",
                //     date: "2022-10-01",
                //     isEditable: false
                // },
                // {
                //     id: 2,
                //     title: "Segunda",
                //     description: "descripcion 2",
                //     state: "Todo",
                //     date: "2022-10-02",
                //     isEditable: false
                // }
            ],

        }
    },

    methods: {

        changeInput(id) {
            let tsk = this.taskList.find(task => task.id === id);
            tsk.isEditable = !tsk.isEditable;
            //console.log(tsk);
        },



        //CRUD
        insertTask() {
            let newtask =
            {
                id: this.newtask,
                title: "Nueva tarea",
                description: "Descripcion nueva tarea",
                state: "Todo",
                date: "",
                isEditable: false
            }
            if (newtask.title.length > 0) {
                this.taskList.push(newtask)
            }
        },

        updateTask(id) {

        },
        removeTask(id) {
            const indexOfObject = this.taskList.findIndex(object => { return object.id === id });
            this.taskList.splice(indexOfObject, 1);
        },
        selectTask() {

        }


    },
    computed: {

        newTask() {
            this.taskList.reduce((max, curr) => Math.max(max, curr.task.id), 0) + 1
        }
    }
}
</script>

<style>

</style>