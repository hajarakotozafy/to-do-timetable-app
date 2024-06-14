<script setup>
defineProps({
    tableTitle: String,
})
</script>
<template>
    <div class="timetableHead">
        <span>{{ tableTitle }}</span>
    </div>
</template>
<style lang="scss" scoped>
    @import "./TimetableHead.style.scss";
</style>