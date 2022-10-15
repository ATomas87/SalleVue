<script>
import { useCounterStore } from '../stores/TaskStore.js'

export default {
    setup(){
        const counterStore = useCounterStore
        
        return{ counterStore }
    },
    computed: {
        quadrupleCounter()
        {
            return this.counterStore.doubleCount * 2
        }
    }
}
</script>