<script setup>
    import { ref } from "vue";
    import Timetable from "../../components/TimetableComponent/Timetable.vue";
    import PopupForm from "../../components/PopupFormComponent/PopupForm.vue";
    import Filter from "../../components/FilterComponent/Filter.vue";
    import SideStat from "../../components/SideStatComponent/SideStat.vue";
    import { day } from "../../data/day";
    import { hour } from "../../data/hour";
    import { todos } from "../../data";
    let activePopup = ref(false);
    const setActivePopup = () => activePopup.value = ! activePopup.value
    import { useTimetableTodosStore } from "../../stores/timetableData";
    const store = useTimetableTodosStore();
</script>

<template>
    <PopupForm :activePopup="activePopup" :setActivePopup="setActivePopup"/>
    <div class="dashboard-container">
        <SideStat/>
        <div>
            <div class="dash-top">
                <Filter/>
                <div class="buttons">
                    <button class="re-init-btn" @click="store.reinit">Reload</button>
                    <button class="load-fake-data-btn" @click="store.loadFakeData">Load Fake Data</button>
                </div>
            </div>
            <Timetable :day="day" :hour="hour" :todos="todos" :setActivePopup="setActivePopup"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "./DashboardLayout.style.scss";
</style>