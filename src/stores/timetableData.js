import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { todos } from "../data";
import { fake } from "../data/fake";
import { day } from "../data/day";
import { hour } from "../data/hour";

export const useTimetableTodosStore = defineStore('timetableTodos', () => {
    // States
    let timetableData = reactive(todos)
    const selectedTaskIds = ref('')
    const filter = ref('all')
    // Getters
    const getSelectedTaskData = computed(() => {
        if(!selectedTaskIds.value) return [{
            hId: 0,
            taskLabel: "",
            priority: "",
            status: "",
            color: ''
        }]
        const [i,j] = selectedTaskIds.value.split(' ')
        return timetableData[i].filter(row => row.hId == j)
    }) 

    const getSelectedDate = computed(() => {
        if(!selectedTaskIds.value) return ' '
        const [i,j] = selectedTaskIds.value.split(' ')
        return `${day[i].name} | ${hour[j].name}`
    })

    const getToDoTask = computed(() => {
        let count = 0;
        timetableData.forEach(col => col.forEach(row => row.status === "to-do"? count++: ''))
        return count;
    })

    const getPendingTask = computed(() => {
        let count = 0;
        timetableData.forEach(col => col.forEach(row => row.status === "pending"? count++: ''))
        return count;
    })
    
    const getDoneTask = computed(() => {
        let count = 0;
        timetableData.forEach(col => col.forEach(row => row.status === "done"? count++: ''))
        return count;
    })

    // Actions
    const getSelectedTaskIds = (ids) => {
        selectedTaskIds.value = ids
    }

    const addTask = (task) => {
        const [i,j] = selectedTaskIds.value.split(' ')
        const newTask = {
            hId: j,
            taskLabel: task.taskLabel,
            priority: "",
            status: task.status,
            color: ""
        }
        timetableData[i][j] = newTask
    }
    
    const groupedTodosBy = (status) => {
        return status === 'to-do' ? getToDoTask : status === 'pending' ? getPendingTask : getDoneTask;
    }

    const deleteTask = () => {
        const [i,j] = selectedTaskIds.value.split(' ')
        const newTask = {
            hId: j,
            taskLabel: "",
            priority: "",
            status: "",
            color: ""
        }
        timetableData[i][j] = newTask
    }

    const setFilterTo = (filterValue) => {
        filter.value = filterValue
    }

    const loadFakeData = () => {
        for(let i = 0; i < timetableData.length; i++){
            for(let j = 0; j < timetableData[i].length; j++){
                timetableData[i][j] = fake[i][j]
            }
        }
    }
    const reinit = () => {
        for(let i = 0; i < timetableData.length; i++){
            for(let j = 0; j < timetableData[i].length; j++){
                timetableData[i][j] =  {
                    hId: j,
                    taskLabel: "",
                    priority: "",
                    status: "",
                    color: ""
                }
            }
        }
    }
    return {
        timetableData,
        getSelectedDate,
        getSelectedTaskIds,
        getSelectedTaskData,
        addTask,
        deleteTask,
        groupedTodosBy,
        filter,
        setFilterTo,
        loadFakeData,
        reinit
    }
})