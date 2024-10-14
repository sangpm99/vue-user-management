<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
    <a-row>
      <a-col class="bg-login" :span="16">
      </a-col>
      <a-col :span="8" class="d-flex align-items-center">
        <div class="w-100 px-5 h-auto">
            <RouterView />
        </div>
      </a-col>
    </a-row>
</template>

<style scoped lang="scss">
    .bg-login {
        background-image: url("@/assets/images/background-login.png");
        background-color: #f1f1f1;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: top;
        height: 100vh;
        overflow: hidden;
    }
</style>