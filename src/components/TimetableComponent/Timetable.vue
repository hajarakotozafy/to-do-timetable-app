<script setup>
    import TimetableHead from "../TimetableHeadComponent/TimetableHead.vue";
    import TimetableCell from "../TimetableCellComponent/TimetableCell.vue";
    import { useTimetableTodosStore } from "../../stores/timetableData";

    defineProps({
        day:{
            type: Array
        },
        hour:{
            type: Array
        },
        setActivePopup:{
            type: Function
        }
    })
    const store = useTimetableTodosStore()
</script>

<template>
    <div class="timetable-container">
        <div class="column">
            <TimetableHead tableTitle="Hour"/>
            <TimetableCell v-for="h in hour" :task="h"/>
        </div>
        <div class="column" v-for="d in day">
            <TimetableHead :tableTitle="d.name"/>
            <TimetableCell v-for="t in store.timetableData[d.id]" :selectedId="`${d.id} ${t.hId}`":task="t" :setActivePopup="setActivePopup"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "./Timetable.style.scss";
</style>