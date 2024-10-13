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
                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <template v-for="item in routes">
                        <template
                            v-if="item.name === 'home'"
                            v-for="(route, index) in item.children"
                            :key="index"
                        >
                            <li>
                                <RouterLink
                                    :to="item.path + route.path"
                                    class="list-group-item capitalize nav-link px-4"
                                    >{{ route.name }}</RouterLink
                                >
                            </li>
                        </template>
                    </template>
                </ul>

                <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                    <input
                        type="search"
                        class="form-control"
                        placeholder="Search..."
                        aria-label="Search"
                    />
                </form>

                <div v-if="userData" class="text-end">
                    <span class="nav-link" href=""
                        >Hi, {{ userData ? userData[0].email : '' }}</span
                    >
                    <ul class="nav">
                        <li>
                            <span class="me-2 nav-link p-0">Manage Profile</span>
                            <ul class="sub-nav position-absolute">
                                <li>
                                    <RouterLink class="me-2 nav-link p-0" to="#"
                                        >View Profile</RouterLink
                                    >
                                </li>
                            </ul>
                        </li>
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
