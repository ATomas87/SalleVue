import { defineStore } from 'pinia' //importacio necessaria per senyalar que es un store

export const useTaskStore = defineStore('task', {
    //Inicialitzacio del store = que retornarà 
    state: () => { return { 
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
     } },

    //metodes per llegir informació
    getters:
    {
        getTasks: (state) => state.taskList,
        getTaskById: (state) => {
            return (id) => {
                return state.taskList.find((item) => item.id === id);
        }
    }
    },

    //accions per modificar la informació
    actions: {
        increment() { this.count++ }
    },
});