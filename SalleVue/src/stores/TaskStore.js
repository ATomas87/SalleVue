import { getConstantType } from '@vue/compiler-core';
import { defineStore } from 'pinia' //importacio necessaria per senyalar que es un store

const url = "https://todos-mpwar.herokuapp.com/users/grup2/todos";

export const useTaskStore = defineStore('task', {
    //Inicialitzacio del store = que retornarà 
    state: () => ({
        taskList: [],
        temporalData: [],
    }),

    //metodes per llegir informació
    getters:
    {
        getTaskList: (state) => {
            console.log("Entra en getTaskList");
            state.taskList = [];
            state.temporalData.forEach(function (item) {
                let newTask = {
                    id: item?.id,
                    title: String(item?.text),
                    description: item?.description,
                    date: "",
                    state: "",
                    isEditable: false,
                }
                if (item?.completed === true) {
                    newTask.state = 'Done';
                }
                else {
                    newTask.state = 'Todo';
                }
                if (item?.completed === true) {
                    newTask.isEditable = true;
                }
                else {
                    newTask.isEditable = false;
                }
                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = today.getFullYear();
                newTask.date = yyyy + "-" + mm + "-" + dd;
                state.taskList.push(newTask);
            }
            );
            console.log(state.taskList);
            return state.taskList
        },
        getTaskById: (state) => {
            return (id) => {
                return state.taskList.find((item) => item.id === id);
            }
        }
    },

    //accions per modificar la informació
    actions: {
        async initializedTask() {
            try {
                this.temporalData = [];
                console.log("Entra en inicializar de store");
                const response = await fetch(url);
                const data = await response.json();
                this.temporalData = data;
                console.log("Guardado " + this.temporalData);
            } catch (error) {
                console.log(error);
            }
        },    

        async insertTask() {
            console.log("Passa per insert de store");           
            const requestOptions = {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ text: "This is a new task of grup 2" }),
            };
            try {
                const response = await fetch(url, requestOptions);
                const data = await response.json();              
                this.temporalData.push(data);
            } catch (error) {
                console.log(error);
            }
        },

        async updateTask(updatedTask) {
            console.log("Passa per update de store"); 
            let taskCompleted;
            if (updatedTask.state === 'Done') {
                taskCompleted=true;
            }
            else {
                taskCompleted=false;
            }          
            const requestOptions = {
                method: "PATCH",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ text: updatedTask.title, description: updatedTask.description, completed:taskCompleted
             }),
            };
            try {
                const response = await fetch(url+"/"+updatedTask.id, requestOptions);
                const data = await response.json();
            } catch (error) {
                console.log(error);
            }
        },

        async deleteTask(id) {
            console.log("Passa per delete de store");                    
            const requestOptions = {
                method: "DELETE",
                headers: { "Content-type": "application/json" },                
            };
            try {
                const response = await fetch(url+"/"+id, requestOptions);
                const data = await response.json();
            } catch (error) {
                console.log(error);
            }
        },



        /* FUNCIONS SINCRONES CONTRA STORE
        
        insertTask() {
            //console.log("ha entrado en insert")
            let newtask = {
                id: this.newTaskId(),
                title: "This is a new task",
                description: "Please enter a new description for this task",
                state: "Todo",
                date: this.getTodayDate(),
                isEditable: true,
            };
            if (newtask.title.length > 0) {
                this.taskList.push(newtask);
                this.taskList.sort((a, b) => { return b.id - a.id });
                //console.log(this.taskList);                   
            }      

        updateTask(updatedtask) {
            //console.log("Ha entrado en update")
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
            //console.log("Ha entrado en delete")
            const indexOfObject = this.taskList.findIndex((object) => {
                return object.id === id;
            });
            this.taskList.splice(indexOfObject, 1);
            this.taskList.sort((a, b) => { return b.id - a.id })
            //console.log(this.taskList);           
        },
        newTaskId() {
            return this.taskList.reduce((max, curr) => Math.max(max, curr.id), 0) + 1;
        },*/



        searchTask() {
            console.log("Entra en filtered=" + searchCriteria)
            return this.taskList.filter((task) => {
                return task.title.toLowerCase().includes(searchCriteria.toLowerCase());
            });
        },




        getTodayDate() {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            const todayformat = yyyy + "-" + mm + "-" + dd;
            console.log("la fecha es: " + todayformat, today.toDateString())
            return todayformat;
        },
        getState(item) {
            if (item.completed === true) {
                return 'Done';
            }
            else {
                return 'Todo';
            }
        },
        getEditable(item) {
            if (item.completed === true) {
                return false;
            }
            else {
                return true;
            }
        }
    },

    computed: {

    },
});