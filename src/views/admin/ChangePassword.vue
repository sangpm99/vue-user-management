<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { getCookie } from '@/stores/userCookie'
import getUser from '@/apis/admin/getUser'
import changePassword from '@/apis/admin/changePassword'
import Swal from 'sweetalert2'

const userId: Ref<any> = ref(null)

const user: Ref<any> = ref(null)

const userInfo: Ref<any> = ref(null)

const oldPassword: Ref<string> = ref('')

const newPassword: Ref<string> = ref('')

const confirmNewPassword: Ref<any> = ref('')

watch(
    () => user.value,
    () => {
        const cookieData = getCookie('User Data')

        if (cookieData !== null) {
            if (cookieData !== JSON.stringify(user.value)) {
                try {
                    user.value = JSON.parse(cookieData)
                    userId.value = user?.value?.data?.id || ''
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
    async (id) => {
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

const handleUpdate = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to proceed with the update?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'Cancel'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const statusCode = await changePassword(
                oldPassword.value,
                newPassword.value,
                confirmNewPassword.value
            )
            console.log(statusCode)
            switch (Number(statusCode)) {
                case 200: {
                    Swal.fire({
                        text: 'Password changed successfully',
                        icon: 'success'
                    })
                    break
                }

                case 406: {
                    Swal.fire({
                        text: 'Password not accepted',
                        icon: 'warning'
                    })
                    break
                }

                default: {
                    Swal.fire({
                        text: 'An error occurred, please try again later.',
                        icon: 'error'
                    })
                    break
                }
            }
        }
    })
}
</script>

<template>
    <div class="h-100" v-if="userInfo">
        <h1>Change Password</h1>
        <div class="card h-100 shadow p-3">
            <form method="POST" class="row mb-4 pb-2">
                <div class="col-12">
                    <div data-mdb-input-init class="form-outline">
                        <label class="w-100 mb-2">
                            Old Password
                            <input type="password" class="form-control" v-model="oldPassword" />
                        </label>
                        <br />
                        <label class="w-100 mb-2">
                            New Password
                            <input type="password" class="form-control" v-model="newPassword" />
                        </label>

                        <br />
                        <label class="w-100 mb-2">
                            Confirm New Password
                            <input
                                type="password"
                                class="form-control"
                                v-model="confirmNewPassword"
                            />
                        </label>
                        <input
                            class="btn btn-primary float-end"
                            type="submit"
                            value="Update"
                            @click.prevent="handleUpdate"
                        />
                    </div>
                </div>
            </form>
            <p>
                Password Must:
                <br />
                - Include lower and upper characters.
                <br />
                - Include at least 1 number and symbol.
                <br />
                - Be at least 8 characters long.
                <br />
                - New password and Confirm New Password must math.
                <br />
                - Can not contain spaces and tab.
            </p>
        </div>
    </div>
</template>
