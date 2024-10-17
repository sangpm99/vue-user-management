<template>
    <div class="my-card h-100 position-relative">
        <slot></slot>
    </div>
</template>

<style scoped>
.my-card {
    box-shadow: 2px 2px 6px -4px #999;
    padding: 1.25rem;
    overflow-wrap: break-word;
    transition: all 0.5s ease;
    background-color: #fff;
    border-radius: 1rem;
}
</style>
