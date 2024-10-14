<script setup lang="ts">
import { RouterLink } from 'vue-router'
import router from '@/routers'
import { delCookie } from '@/stores/userCookie'

const routes = router.options.routes
</script>

<template>
    <div class="row">
        <div class="col-12">
            <ul>
                <template v-for="item in routes">
                    <template v-if="item.name === 'admin'">
                        <template v-for="(route, index) in item.children" :key="index">
                            <li>
                                <RouterLink
                                    :to="item.path + route.path"
                                    class="list-group-item capitalize nav-link px-4"
                                    >{{ route.name }}</RouterLink
                                >
                            </li>
                        </template>
                    </template>
                </template>
                <li>
                    <button class="nav-link me-2 p-0 ms-4" @click="delCookie('User Data')">
                        Sign Out
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>
