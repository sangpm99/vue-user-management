<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
</script>

<template>
    <div class="row">
        <div class="col-12">
            <Header />
        </div>
        <div class="col-3">
            <h1>Dashboard</h1>
            <Sidebar />
        </div>

        <div class="col-9">
            <RouterView />
        </div>
    </div>
</template>
