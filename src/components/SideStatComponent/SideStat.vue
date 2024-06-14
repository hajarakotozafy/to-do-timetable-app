<script setup>
    import { useTimetableTodosStore } from "../../stores/timetableData";
    const store = useTimetableTodosStore();
    const statBy = [
        {
            id: 0,
            name: 'To Do',
            value: 'to-do'
        },
        {
            id: 1,
            name: 'Pending',
            value: 'pending'
        },
        {
            id: 2,
            name: 'Done',
            value: 'done'
        },
    ]
</script>
<template>
    <div class="side-card">
        <div v-for="stat in statBy" :key="stat.id" >
            <div  v-if="store.filter==='all' || store.filter===stat.value || store.filter==='empty'">
                <p>{{ store.groupedTodosBy(stat.value)}}<span>{{ stat.name }}</span></p>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import "./SideStat.style.scss";
</style>