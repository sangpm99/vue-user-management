<script setup lang="ts">
import { RouterLink } from 'vue-router'
import router from '@/routers'
import { useUserData } from '@/composables/useUserData'
import { delCookie } from '@/stores/userCookie'

const { userData } = useUserData()

const routes = router.options.routes
</script>

<template>
    <header class="py-3 border-bottom">
        <div class="container">
            <div
                class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
            >
                <ul
                    class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
                ></ul>

                <div v-if="userData" class="text-end">
                    <span class="nav-link" href=""
                        >Hi, {{ userData ? userData.data.fullName : '' }}</span
                    >
                    <ul class="nav">
                        <li>
                            <button class="nav-link me-2 p-0" @click="delCookie('User Data')">
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </div>

                <div v-if="!userData" class="text-end">
                    <RouterLink class="me-2" to="/authorize/signin">Sign In</RouterLink>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
.nav .sub-nav {
    display: none;
}

.nav > li:hover .sub-nav {
    display: block;
}
</style>
