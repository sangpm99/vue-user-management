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

        <p><b>User name:</b> {{ userInfo.userName }}</p>
        <p><b>Full name:</b> {{ userInfo.fullName }}</p>
        <p><b>Email:</b> {{ userInfo.email }}</p>
        <p><b>Phone Number:</b> {{ userInfo.phoneNumber }}</p>
        <p><b>Department:</b> {{ userInfo.department }}</p>
        <p>
            <b>Roles: </b>
            <span v-for="role in userInfo.roles">
                {{ role }}
            </span>
        </p>
    </div>
</template>
