<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router'
import router from '@/routers'
import { delCookie } from '@/stores/userCookie'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGaugeHigh, faLock, faUsers, faRightFromBracket  } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
library.add(faGaugeHigh, faLock, faUsers, faRightFromBracket );
library.add(faAddressCard);

const routes = router.options.routes
</script>

<template>
    <div class="position-fixed left-0 top-0 my-sidebar bottom-0 d-flex flex-column flex-shrink-0 p-3 text-white">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none flex align-items-center position-relative">
            <font-awesome-icon :icon="['fas', 'gauge-high']" class="fs-2"/>
            <span class="fs-4 position-absolute space-icon">Dashboard</span>
        </a>
        <hr>

        <ul class="nav nav-pills flex-column mb-auto">
            <template v-for="item in routes">
                <template v-if="item.name === 'admin'">
                    <template v-for="(route, index) in item.children" :key="index">
                        <li class="nav-item">
                            <RouterLink
                                :to="item.path + route.path"
                                class="capitalize nav-link text-white position-relative mb-2"
                                aria-current="page"
                                >
                                <font-awesome-icon v-if="route.icon" :icon="route.icon.split(' ')"/>
                                <span class="position-absolute space-icon">{{ route.name }}</span>
                                </RouterLink>
                        </li>
                    </template>
                </template>
            </template>
        </ul>
        <div class="toggle">
            <ul class="text-small glass rounded p-2 dropdown-content" aria-labelledby="dropdownUser1">
                <li>
                    <a class="capitalize nav-link text-white position-relative" @click="delCookie('User Data')">
                        <span>Sign Out</span>
                    </a>
                </li>
            </ul>
            <hr>
            <a class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" aria-expanded="false">
                <img src="@/assets/images/no-user-image-square.jpg" alt="" width="32" height="32" class="rounded-circle me-2">
                <strong>Pham Minh Sang</strong>
            </a>
        </div>
    </div>
</template>

<style scoped>
    .my-sidebar {
        right: calc(10/12 * 100%);
        width: inherit;
        background-image: url('@/assets/images/star-night-2.jpg');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .space-icon {
        left: 3rem;
    }

    .my-sidebar li a{
        border: 1px solid transparent;
    }

    .my-sidebar .nav li:hover a{
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .dropdown-content {
        opacity: 0; 
        overflow: hidden;
        transition: all 0.5s ease;
        transform: translateY(3rem);
    }

    .toggle:hover .dropdown-content {
        opacity: 1;
        transform: translateY(0);
    }  
</style>