import { defineStore } from 'pinia' //importacio necessaria per senyalar que es un store

export const useTaskStore = defineStore('task', {
    //Inicialitzacio del store = que retornarà 
    state: () => ({
        taskList: [
            {
                id: 1,
                title: "1. Special title treatment 1",
                description:
                    "With supporting text below as a natural lead-in to additional content 1",
                state: "Done",
                date: "2022-10-01",
                isEditable: false,
            },
            {
                id: 2,
                title: "2. Special title treatment 2",
                description:
                    "With supporting text below as a natural lead-in to additional content 2",
                state: "Done",
                date: "2022-10-02",
                isEditable: false,
            },
            {
                id: 3,
                title: "3. Special title treatment 3",
                description:
                    "With supporting text below as a natural lead-in to additional content 3",
                state: "Done",
                date: "2022-10-05",
                isEditable: false,
            },
        ],
    }),

    //metodes per llegir informació
    getters:
    {
        getTaskList: (state) => state.taskList.sort((a, b) => { return b.id - a.id }),
        getTaskById: (state) => {
            return (id) => {
                return state.taskList.find((item) => item.id === id);
            }
        }
    },

    //accions per modificar la informació
    actions: {
        async initializedTask() {
            const url = "https://todos-mpwar.herokuapp.com/users/aleh/todos";
            try {
                const response = await fetch(url);
                const data = await response.json();
                this.taskList = data;
                console.log("this.todos", this.todos);
            } catch (error) {
                console.log(error);
            }
        },
       async insertTask() {
            //console.log("ha entrado en insert")
            /* let newtask = {
                id: this.newTaskId(),
                title: "This is a new task",
                description: "Please enter a new description for this task",
                state: "Todo",
                date: this.getTodayDate(),
                isEditable: true,
            }; */
            // Aqui haremos una peticion para insertar esta tarea en backend (API)
            // cuando se resuelva la post, el resultado lo añadimos a la lista (push)
            console.log("Passa per insert");
            console.log(this.taskList);  
            const requestOptions = {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ text: "This is a new task" }),
              };
              const url = "https://todos-mpwar.herokuapp.com/users/aleh/todos";
              try {
                const response = await fetch(url, requestOptions);
                const data = await response.json();
                console.log("data");                  
                this.taskList.push(data);
                this.taskList.sort((a, b) => { return b.id - a.id });                                                    
              } catch (error) {
                console.log(error);
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
            this.taskList.sort((a, b) => { return b.id - a.id })
            //console.log(this.taskList);           
        },
        newTaskId() {
            //console.log("pasa por new");      
            return this.taskList.reduce((max, curr) => Math.max(max, curr.id), 0) + 1;
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
    },

    computed: {

    },
});