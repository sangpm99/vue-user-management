<script setup lang="ts">
import { ref, watch } from 'vue'
import { getCookie } from '@/stores/userCookie'
import getUser from '@/apis/admin/getUser'
import changePassword from '@/apis/admin/changePassword'

const userId = ref(null)

const user = ref(null)

const userInfo = ref(null)

const oldPassword = ref('')

const newPassword = ref('')

const confirmNewPassword = ref('')

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
        <h1>Change Password</h1>

        <form>
            <label>
                Old Password
                <input type="password" v-model="oldPassword" />
            </label>
            <br />

            <label>
                New Password
                <input type="password" v-model="newPassword" />
            </label>
            <br />

            <label>
                Confirm New Password
                <input type="password" v-model="confirmNewPassword" />
            </label>
            <br />

            <input
                type="submit"
                value="Update"
                @click.prevent="changePassword(oldPassword, newPassword, confirmNewPassword)"
            />
        </form>
    </div>
</template>
