<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useUserStore } from '@/stores/userStore'
import { useLocalStorageStore } from '@/stores/localStorageStore'
import { useAuthorizeStore } from '@/stores/authorizeStore'
import {
    faGaugeHigh,
    faLock,
    faUsers,
    faRightFromBracket,
    faChartPie,
    faUserGroup,
    faChartSimple
} from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-regular-svg-icons'
import { onBeforeMount, type Ref, ref } from 'vue'
import type { UserData } from '@/types/UserData'
library.add(
    faGaugeHigh,
    faLock,
    faUsers,
    faRightFromBracket,
    faChartPie,
    faAddressCard,
    faUserGroup,
    faChartSimple
)

const localStorageStore = useLocalStorageStore()
const userStore = useUserStore()
const authorizeStore = useAuthorizeStore()

const currentUser: Ref<UserData | null> = ref(null)

onBeforeMount(async () => {
    currentUser.value = userStore.getCurrentUser()
})

const signOut = async() => {
    await authorizeStore.signOut();
    localStorageStore.delUserData();
}
</script>

<template>
    <div
        class="position-fixed left-0 top-0 my-sidebar bottom-0 d-flex flex-column flex-shrink-0 p-3 text-white"
    >
        <a
            href="/"
            class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none flex align-items-center position-relative"
        >
            <font-awesome-icon :icon="['fas', 'gauge-high']" class="fs-2" />
            <span class="fs-4 position-absolute space-icon">Dashboard</span>
        </a>
        <hr />

        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <RouterLink
                    to="/admin/overview"
                    class="capitalize nav-link text-white position-relative mb-2"
                    aria-current="page"
                >
                    <font-awesome-icon :icon="['fas', 'chart-pie']" />
                    <span class="position-absolute space-icon">Overview</span>
                </RouterLink>
            </li>

            <li class="nav-item">
                <RouterLink
                    to="/admin/myprofile"
                    class="capitalize nav-link text-white position-relative mb-2"
                    aria-current="page"
                >
                    <font-awesome-icon :icon="['far', 'address-card']" />
                    <span class="position-absolute space-icon">My Profile</span>
                </RouterLink>
            </li>

            <li class="nav-item">
                <RouterLink
                    to="/users/GetUsers"
                    class="capitalize nav-link text-white position-relative mb-2"
                    aria-current="page"
                >
                    <font-awesome-icon :icon="['fa-solid', 'fa-users']" />
                    <span class="position-absolute space-icon">User</span>
                </RouterLink>
            </li>

            <li class="nav-item">
                <RouterLink
                    to="/roles/getroles"
                    class="capitalize nav-link text-white position-relative mb-2"
                    aria-current="page"
                >
                    <font-awesome-icon :icon="['fas', 'chart-simple']" />
                    <span class="position-absolute space-icon">Role</span>
                </RouterLink>
            </li>
        </ul>
        <div class="toggle">
            <ul
                class="text-small glass rounded p-2 dropdown-content"
                aria-labelledby="dropdownUser1"
            >
                <li>
                    <a
                        class="capitalize nav-link text-white position-relative"
                        @click="signOut"
                    >
                        <span>Sign Out</span>
                    </a>
                </li>
            </ul>
            <hr />
            <a
                class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                aria-expanded="false"
            >
                <img
                    src="@/assets/images/no-user-image-square.jpg"
                    alt=""
                    width="32"
                    height="32"
                    class="rounded-circle me-2"
                />
                <strong>{{ currentUser?.fullName }}</strong>
            </a>
        </div>
    </div>
</template>

<style scoped>
.my-sidebar {
    right: calc(10 / 12 * 100%);
    width: inherit;
    background-image: url('@/assets/images/star-night.webp');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}

.space-icon {
    left: 3rem;
}

.my-sidebar li a {
    border: 1px solid transparent;
}

.my-sidebar .nav > li:hover > a {
    opacity: 0.8;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.my-sidebar .sub-nav li a {
    font-size: 90%;
}

.my-sidebar .sub-nav li:hover a {
    opacity: 0.8;
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
