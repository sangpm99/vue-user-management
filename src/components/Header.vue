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
        <div class="row">
            <div class="col-10 d-flex flex-wrap align-items-center justify-content-end">
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

            <div class="col-3"></div>
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
