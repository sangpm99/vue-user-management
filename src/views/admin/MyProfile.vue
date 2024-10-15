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

            <div class="card shadow">
            <div class="rounded-top text-white d-flex flex-row cover">
                <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px;">
                <img src="@/assets/images/no-user-image-square.jpg"
                    alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"
                    style="width: 150px; z-index: 1">
                <button type="button" class="btn btn-outline-dark" style="z-index: 1;">
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
                    <img src="https://img.freepik.com/free-photo/ursa-major-ursa-minor-constellations_23-2150028871.jpg?t=st=1729007106~exp=1729010706~hmac=ca1b252776fd2308efb16bf684e57554ef4c2779b9f9d8e04cbf69fdfc51348f&w=1380" alt="image 1"
                    class="w-100 rounded-3">
                </div>
                <div class="col mb-2">
                    <img src="https://img.freepik.com/free-photo/peak-bamboo-lijiang-rural-mist_1417-410.jpg?t=st=1729007183~exp=1729010783~hmac=7dc86a4512cb167ed8676e5ea13315825ed2469b2f7d2724e5bbdc53ef1db839&w=1380" alt="image 1"
                    class="w-100 rounded-3">
                </div>
                </div>
                <div class="row g-2">
                <div class="col">
                    <img src="https://img.freepik.com/free-photo/scenery-asian-nature-green-beautiful_1417-194.jpg?t=st=1729007210~exp=1729010810~hmac=9cc71c44f36c6c70e24c9301639953c0c2690dceef9bbae180715ae207fc2e93&w=1380" alt="image 1"
                    class="w-100 rounded-3">
                </div>
                <div class="col">
                    <img src="https://img.freepik.com/free-photo/japanese-gazebo-pound-autumn_23-2151843614.jpg?t=st=1729007229~exp=1729010829~hmac=5f085ac05600e323b5d37565a91f7799f1d8a5fe6691fc1cd3b537a451dc4262&w=1380" alt="image 1"
                    class="w-100 rounded-3">
                </div>
                </div>
            </div>
            </div>
        </div>
</template>

<style scoped>
    .cover {
        background-image: url('@/assets/images/star-night-2.jpg');
        background-position: bottom;
        background-size: cover;
        background-repeat: no-repeat;
        height: 200px;
    }
</style>