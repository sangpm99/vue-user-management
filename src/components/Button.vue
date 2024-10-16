<script lang="ts" setup>
    import { RouterLink } from 'vue-router'
    import router from '@/routers'

    const routes = router.options.routes

    const props = defineProps<{
        path?: string;
    }>();

</script>

<template>
    <RouterLink
        :to="path || '#'"
        class="btn text-white my-btn"
    >
        <slot></slot>
    </RouterLink>
</template>

<style scoped>
    .my-btn {
        background-color: #666CFF;
        transition: all 0.25s ease;
    }

    .my-btn:hover,
    .my-btn:active {
        opacity: 0.8;
    }


</style>