import { defineStore } from 'pinia' //importacio necessaria per senyalar que es un store

export const useTaskStore = defineStore('task', {
    //Inicialitzacio del store = que retornarà 
    state: () => ( { 
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
                state: "Done",
                date: "2022-10-02",
                isEditable: false,
            },
            {
                id: 3,
                title: "3. Special title treatment",
                description:
                    "With supporting text below as a natural lead-in to additional content 2",
                state: "Done",
                date: "2022-10-05",
                isEditable: false,
            },
        ],
     }),

    //metodes per llegir informació
    getters:
    {
        getTaskList: (state) => state.taskList.sort((a,b) => {return b.id - a.id}) ,
        getTaskById: (state) => {
            return (id) => {
                return state.taskList.find((item) => item.id === id);
        }
    }
    },

    //accions per modificar la informació
    actions: {
        insertTask() {
            console.log("ha entrado en insert")
            let newtask = {
                id: this.newTaskId(),
                title: "This is a new task",
                description: "Please enter a new description for this task",
                state: "Todo",
                date: Date().toLocaleLowerCase(),
                isEditable: true,
            };
            if (newtask.title.length > 0) {
                this.taskList.push(newtask);
                this.taskList.sort((a,b) => {return b.id - a.id});
                //console.log(this.taskList);                   
            }
        },

        updateTask(updatedtask) {
            console.log("ha entrado en update")
            this.taskList.forEach(task => {
                if (task.id === updatedtask.id) {
                    task.title = updatedtask.title;
                    task.description = updatedtask.description;
                    task.state = updatedtask.state;
                    task.date = updatedtask.date;
                }
            })
        },
        deleteTask(id) {
            //console.log("ha entrado en delete")
            const indexOfObject = this.taskList.findIndex((object) => {
                return object.id === id;
            });
            this.taskList.splice(indexOfObject, 1);
            this.taskList.sort((a,b) => {return b.id - a.id})  
            //console.log(this.taskList);           
        },
        newTaskId() { 
            //console.log("pasa por new");      
            return this.taskList.reduce((max, curr) => Math.max(max, curr.id), 0) + 1;           
         },
    },

    computed: {
       
    },
});