<script>
import { normalizeStyle } from "vue";
export default {
  data() {
    return {
      todos: [],
    };
  },
  methods: {
    async getTodosAsyncAwait() {
      const url = "https://todos-mpwar.herokuapp.com/users/aleh/todos";
      try {
        const response = await fetch(url);
        const data = await response.json();
        this.todos = data;
        console.log("this.todos", this.todos);
      } catch (error) {
        console.log(error);
      }
    },
    async postAddTodo() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ text: "Segundo todo" }),
      };
      const url = "https://todos-mpwar.herokuapp.com/users/aleh/todos";
      try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    console.log("createFetch");
    this.getTodosAsyncAwait();
  },
};
</script>
 
<template>
  <ul id="todoAsync">
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ul>
</template>