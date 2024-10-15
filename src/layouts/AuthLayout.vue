<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
    <div class="row">
      <div class="col-9 bg-login"></div>

      <div class="col-3 d-flex align-items-center">
        <div class="w-100 px-5 h-auto pr-5">
          <RouterView />
        </div>
      </div>
    </div>
</template>

<style scoped>
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