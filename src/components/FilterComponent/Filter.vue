<script setup>
    import { useTimetableTodosStore } from "../../stores/timetableData";
    const store = useTimetableTodosStore();
    const onChangeFilter = (e) => {
        store.setFilterTo(e.target.value);        
    }
</script>
<template>
    <form @change="onChangeFilter">
        <span>Filter by:</span>
        <div>
            <input type="radio" name="filter" value="all" id="a" checked/>
            <label for="a">All</label>
        </div>
        <div>
            <input type="radio" name="filter" value="to-do" id="b"/>
            <label for="b">To-do</label>
        </div>
        <div>
            <input type="radio" name="filter" value="pending" id="c"/>
            <label for="c">Pending</label>
        </div>
        <div>
            <input type="radio" name="filter" value="done" id="d"/>
            <label for="d">Done</label>
        </div>
        <div>
            <input type="radio" name="filter" value="empty" id="e"/>
            <label for="e">Empty</label>
        </div>
    </form>
</template>

<style lang="scss" scoped>
    @import "./Filter.style.scss";
</style>