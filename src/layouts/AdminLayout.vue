<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
    <div class="row">
        <div class="col-2 position-relative">
            <Sidebar />
        </div>

        <div class="col-10 content px-10">
            <RouterView />
        </div>
    </div>
</template>

<style scoped>
.content {
    background-color: #f7f7f9;
    min-height: 100vh;
}
</style>
