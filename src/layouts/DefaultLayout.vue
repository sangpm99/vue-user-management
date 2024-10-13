<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
</script>

<template>
    <div class="row">
        <div class="col-12">
            <Header />
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <RouterView />
        </div>
    </div>
</template>
