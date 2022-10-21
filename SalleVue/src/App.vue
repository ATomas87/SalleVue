<template>
    <router-view></router-view>
</template>

<script>

import { useTaskStore } from './stores/TaskStore'
import { createDOMCompilerError } from '@vue/compiler-dom';

export default {
    name: "App",
    components: {
        //ListView, StateView        
    },
    setup() {
        const taskStore = useTaskStore()
        return { taskStore }
    },
    created()
    {
        this.taskStore.initializedTask()
    }
    
}
</script>

<style scoped>
.wrapper {
    display: grid;
    place-items: center;
    min-height: 100vh;
    background: #eee;
}

.appBox {
    max-width: 660px;
    min-height: 400px;
    width: 80%;
    margin: 100px;
    padding: 20px;
    box-shadow: 3px 2px 12px 8px #e1e1e1;
    border-radius: 20px;
}
</style>