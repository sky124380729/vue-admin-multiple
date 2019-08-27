<template>
    <div>
        HOME
        <button @click="goPage">试试</button>
        <router-view />
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        goPage() {
            window.location.href = window.location.origin + '/oa/x'
        }
    }
}
</script>
