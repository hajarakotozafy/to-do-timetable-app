<script setup>
    import { storeToRefs } from "pinia";
    import { onUpdated, ref } from "vue";
    const props = defineProps({
        activePopup: true | false,
        setActivePopup: {
            type: Function
        }
    })

    import { useTimetableTodosStore } from "../../stores/timetableData";
    const store = useTimetableTodosStore();
    const todo = ref(null)
    const pending = ref(null)
    const done = ref(null)
    const onSubmitForm = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const task = Object.fromEntries(data.entries());
        if(!task.title || !task.status) return
        store.addTask({
            taskLabel: task.title,
            status: task.status
        })
        props.setActivePopup()
    }
    const onDelete = () => {
        store.deleteTask();
        props.setActivePopup()
    }

    onUpdated(() => {
        switch(store.getSelectedTaskData[0].status){
            case 'to-do':
                todo.value.checked = true;
                break;
            case 'pending':
                pending.value.checked = true;
                break;
            case 'done':
                done.value.checked = true;
                break;
            default:
                todo.value.checked = true;
                break;
        }
    })
</script>

<template>
    <div :class="`popup-container ${activePopup ? 'active': ''}`">
        <div class="popup-inner">
            <h1 class="popup-title">Form</h1>
            <div class="close-btn" @click="setActivePopup()">
                <img src="../../assets/imgs/x.svg"/>
            </div>
            <form @submit="onSubmitForm">
                <div class="form-control">
                    <p class="label">Time</p>
                    <p>{{ store.getSelectedDate }}</p>
                    
                </div>
                <div class="form-control">
                    <label class="label" for="task-title">Title</label>
                    <input type="text" class="input-text" id="task-title" name="title" placeholder="ex: learn css..." :value="store.getSelectedTaskData[0].taskLabel" required/>
                </div>
                <div class="form-control">
                    <p class="label">Status</p>
                    <div class="radio-control">
                        <input ref="todo" type="radio" name="status" id="to-do" value="to-do" required/>
                        <label for="to-do">To do</label>
                    </div>
                    <div class="radio-control">
                        <input ref="pending" type="radio" name="status" id="pending" value="pending" required/>
                        <label for="pending">Pending</label>
                    </div>
                    <div class="radio-control">
                        <input ref="done" type="radio" name="status" id="done" value="done" required/>
                        <label for="done">Done</label>
                    </div>
                </div>
                <div class="btn-control">
                    <button>Submit</button>
                    <p v-if="store.getSelectedTaskData[0].taskLabel" @click="onDelete"><img src="../../assets/imgs/trash.svg"></p>
                    <span v-else></span>
                </div>
            </form>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import "./PopupForm.style.scss";
</style>