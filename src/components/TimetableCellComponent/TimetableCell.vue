<script setup>
    import { useTimetableTodosStore } from "../../stores/timetableData";
    import { ref, onMounted, onBeforeUnmount } from "vue";
    const showOptionsMenu = ref(false)
    const optionsMenuRef = ref(null);
    const props = defineProps({
        task: {
            type: Object
        },
        setActivePopup: {
            type: Function
        },
        selectedId: String
    })

    const store = useTimetableTodosStore();

    const selectOneTaskCard = () => {
        store.getSelectedTaskIds(props.selectedId)
        props.setActivePopup()
    }

    const onOptionsMenu = () => showOptionsMenu.value = !showOptionsMenu.value
    const handleClickOutside = (event) => {
        event.stopPropagation();
        if (optionsMenuRef.value && !optionsMenuRef.value.contains(event.target)) {
            showOptionsMenu.value = false;
        }
    };
    const onUpdate = () => {
        selectOneTaskCard()
        onOptionsMenu()
    }
    const onDelete = () => {
        store.getSelectedTaskIds(props.selectedId)
        store.deleteTask();
        onOptionsMenu()
    }
    const condition = (filter) => {
        switch(filter){
            case 'all':
                return props.task.taskLabel || props.task.taskLabel===''
            case 'to-do':
                return (props.task.taskLabel && props.task.status === 'to-do') || (props.task.taskLabel==='' && props.task.status === 'to-do') 
            case 'pending':
                return (props.task.taskLabel && props.task.status === 'pending') || (props.task.taskLabel==='' && props.task.status === 'pending') 
            case 'done':
                return (props.task.taskLabel && props.task.status === 'done') || (props.task.taskLabel==='' && props.task.status === 'done') 
            case 'empty':
                return props.task.taskLabel==='' 
        }
    }
</script>
<template>
    <div :class="`timetablecell-container ${task.taskLabel?task.status:''}`" v-if="condition(store.filter)">
        <div>
            <p :class="`task-title ${task.taskLabel === '' ? 'null': ''}`" >{{ task.taskLabel || "Add Task..." }}</p>
            <span class="tast-status">{{ task.taskLabel?task.status:'' }}</span>
        </div>
        <div class="task-btn" v-if="task.taskLabel" @click="selectOneTaskCard"><img src="../../assets/imgs/dots-vertical.svg"/></div>
        <div class="task-btn" v-else @click="selectOneTaskCard"><img src="../../assets/imgs/plus.svg"/></div>
        <div class="options-menu"  ref="optionsMenuRef" v-if="showOptionsMenu">
            <span @click="onUpdate"><img src="../../assets/imgs/edit.svg"</span>
            <span @click="onDelete"><img src="../../assets/imgs/trash.svg"</span>
        </div>
    </div>
    <div v-else class="timetablecell-container-hour">
        <div>
             <p class="task-hour-title" >{{ task.name }}</p>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import "./TimetableCell.style.scss";
</style>