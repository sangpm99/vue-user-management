<script setup lang="ts">
import { ref, watch } from 'vue'
import { getCookie } from '@/stores/userCookie'
import getUser from '@/apis/admin/getUser'

const userId = ref(null)

const user = ref(null)

const userInfo = ref(null)

watch(
    () => user.value,
    () => {
        const cookieData = getCookie('User Data')

        if (cookieData !== null) {
            if (cookieData !== JSON.stringify(user.value)) {
                try {
                    user.value = JSON.parse(cookieData)
                    userId.value = user.value.data.id
                } catch (error) {
                    console.error('Cookie data is not valid JSON:', error)
                }
            }
        }
    },
    { immediate: true }
)

watch(
    () => userId.value,
    async (id: string) => {
        if (id !== null) {
            try {
                const userInfoResponse = await getUser(id)
                if (userInfoResponse !== null) {
                    userInfo.value = userInfoResponse.data
                }
            } catch (error) {
                console.error('Error fetching user info:', error)
            }
        }
    },
    { immediate: true }
)
</script>

<template>
    <div v-if="userInfo !== null">
        <h1>My Profile</h1>

        <div class="col">
            <div class="card">
            <div class="rounded-top text-white d-flex flex-row" style="background-color: #000; height:200px;">
                <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px;">
                <img src="@/assets/images/no-user-image-square.jpg"
                    alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"
                    style="width: 150px; z-index: 1">
                <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-dark text-body" style="z-index: 1;">
                    Edit profile
                </button>
                </div>
                <div class="ms-3" style="margin-top: 130px;">
                <h5>{{ userInfo.fullName }}</h5>
                <p>{{ userInfo.department }}</p>
                <p></p>
                </div>
            </div>
            <div class="p-4 text-black bg-body-tertiary">
                <div class="d-flex justify-content-end text-center py-1 text-body">
                <div>
                    <p class="mb-1 h5">253</p>
                    <p class="small text-muted mb-0">Photos</p>
                </div>
                <div class="px-3">
                    <p class="mb-1 h5">1026</p>
                    <p class="small text-muted mb-0">Followers</p>
                </div>
                <div>
                    <p class="mb-1 h5">478</p>
                    <p class="small text-muted mb-0">Following</p>
                </div>
                </div>
            </div>
            <div class="card-body p-4 text-black">
                <div class="mb-5  text-body">
                <h3 class="mb-1">About</h3>
                <div class="p-4 bg-body-tertiary">
                    <p class="font-italic mb-1">Full Name: {{ userInfo.fullName }}</p>
                    <p class="font-italic mb-1">User Name: {{ userInfo.userName }}</p>
                    <p class="font-italic mb-1">Email: {{ userInfo.email }}</p>
                    <p class="font-italic mb-1">Address: {{ userInfo.address }}</p>
                    <p class="font-italic mb-1">Department: {{ userInfo.department }}</p>
                    <p class="font-italic mb-1">Roles: <span v-for="role in userInfo.roles">{{ role }}</span></p>
                </div>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-4 text-body">
                <h3 class="mb-0">Recent photos</h3>
                <p class="mb-0"><a href="#!" class="text-muted">Show all</a></p>
                </div>
                <div class="row g-2">
                <div class="col mb-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp" alt="image 1"
                    class="w-100 rounded-3">
                </div>
                <div class="col mb-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp" alt="image 1"
                    class="w-100 rounded-3">
                </div>
                </div>
                <div class="row g-2">
                <div class="col">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp" alt="image 1"
                    class="w-100 rounded-3">
                </div>
                <div class="col">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp" alt="image 1"
                    class="w-100 rounded-3">
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
</template>