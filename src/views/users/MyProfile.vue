<script setup lang="ts">
import { onBeforeMount, ref, watch, type Ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import Swal from 'sweetalert2'
import { getDepartment } from '@/stores/departmentStore'
import type { UserData } from '@/types/UserData'
import TwoFactor from '@/components/users/TwoFactor.vue'
import ChangePassword from '@/components/users/ChangePassword.vue'

const userStore = useUserStore()

const userChanged: Ref<any> = ref(null)

const isEdit: Ref<boolean> = ref(false)

const reMount: Ref<number> = ref(0)

const user: Ref<UserData | null> = ref(null)

const isUserNameTaken: Ref<boolean> = ref(false)

const formRef = ref()

const rulesUserName = [
    (value: string) => !!value || 'Field is required',
    () => !isUserNameTaken.value || 'User name is already taken, please choose another one'
]

const rulesEmail = [
    (value: string) => !!value || 'Field is required',
    (value: string) =>
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value) ||
        'The Email field is not a valid e-mail address.'
]

const department: string[] = getDepartment()

const handleChangeProfile = async () => {
    const res = await userStore.changeProfile(
        userChanged.value.userName,
        userChanged.value.email,
        userChanged.value.fullName,
        userChanged.value.phoneNumber,
        userChanged.value.address,
        userChanged.value.department
    )
    if (res) {
        switch (true) {
            case res.status === 406:
                isUserNameTaken.value = true
                const isValid = await formRef.value?.validate()
                if (!isValid) return
                break
            default:
                break
        }
    } else {
        isUserNameTaken.value = false
        reMount.value++
        isEdit.value = false
        Swal.fire({
            title: 'Success',
            text: 'Your Profile Update Successfully',
            icon: 'success'
        })
    }
}

const getData = async () => {
    const getUserStorage: UserData | null = userStore.getCurrentUser()
    const userId = getUserStorage?.id
    if (userId) {
        const getUser = await userStore.getUser(userId)
        if (getUser.data.data) {
            user.value = getUser.data.data
            userChanged.value = user.value
        }
    }
}

onBeforeMount(async () => {
    getData()
})
</script>

<template>
    <div class="m-h-100" v-if="user" :key="reMount">
        <h1>My Profile</h1>

        <div class="card shadow">
            <div class="rounded-top text-white d-flex flex-row cover">
                <div class="ms-4 mt-10 d-flex flex-column" style="width: 150px">
                    <img
                        src="@/assets/images/no-user-image-square.jpg"
                        alt="Generic placeholder image"
                        class="img-fluid img-thumbnail mt-4 mb-2"
                        style="width: 150px; z-index: 1"
                    />
                </div>
                <div class="ms-3" style="margin-top: 130px">
                    <h5>{{ user.fullName }}</h5>
                    <p>{{ user.department }}</p>
                </div>
            </div>
            <div class="p-4 text-black bg-body-tertiary">
                <div class="d-flex justify-content-between text-center py-1 text-body">
                    <div>
                        <v-btn
                            color="primary"
                            variant="elevated"
                            :disabled="isEdit ? true : false"
                            @click="isEdit = true"
                            prepend-icon="mdi-pencil"
                        >
                            Edit Profile
                        </v-btn>

                        <ChangePassword
                            :userId="user.id"
                            @is-done="
                                (value: boolean) => {
                                    if (value) {
                                        getData
                                    }
                                }
                            "
                        />

                        <TwoFactor :user="user" @is-done="getData" />
                    </div>
                    <div class="d-flex">
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
            </div>
            <div class="card-body p-4 text-black">
                <div class="mb-5 text-body">
                    <h3 class="mb-1">About</h3>
                    <v-form ref="formRef">
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="6">
                                    <v-text-field
                                        variant="solo"
                                        label="Full Name"
                                        v-model.lazy="userChanged.fullName"
                                        :readonly="!isEdit"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="6">
                                    <v-text-field
                                        variant="solo"
                                        label="User Name"
                                        v-model.lazy="userChanged.userName"
                                        :readonly="!isEdit"
                                        :rules="rulesUserName"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="6">
                                    <v-text-field
                                        variant="solo"
                                        label="Email"
                                        v-model.lazy="userChanged.email"
                                        :readonly="!isEdit"
                                        :rules="rulesEmail"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="6">
                                    <v-text-field
                                        variant="solo"
                                        label="Phone Number"
                                        v-model.lazy="userChanged.phoneNumber"
                                        :readonly="!isEdit"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="6">
                                    <v-text-field
                                        variant="solo"
                                        label="Address"
                                        v-model.lazy="userChanged.address"
                                        :readonly="!isEdit"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="6">
                                    <v-autocomplete
                                        label="Department"
                                        auto-select-first
                                        variant="solo"
                                        :items="department"
                                        v-model.lazy="userChanged.department"
                                        :readonly="!isEdit"
                                    ></v-autocomplete>
                                </v-col>

                                <v-col cols="6">
                                    <v-text-field
                                        variant="solo"
                                        label="Roles"
                                        v-model.lazy="userChanged.roles"
                                        readonly
                                    ></v-text-field>
                                </v-col>

                                <div class="w-100" v-if="isEdit">
                                    <v-btn
                                        class="float-end"
                                        color="grey"
                                        @click.prevent="isEdit = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        class="float-end me-2"
                                        color="success"
                                        type="submit"
                                        @click.prevent="handleChangeProfile"
                                    >
                                        Update
                                    </v-btn>
                                </div>
                                <div class="gap mb-4"></div>
                            </v-row>
                        </v-card-text>
                    </v-form>
                </div>
                <div class="h-20"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.h-20 {
    height: 20vh;
}
.cover {
    background-image: url('@/assets/images/star-night.webp');
    background-position: bottom;
    background-size: cover;
    background-repeat: no-repeat;
    height: 200px;
}

img {
    object-fit: cover;
}

.btn-outline-dark {
    color: #000;
}

.btn-outline-dark:hover {
    color: #fff;
}

.btn-secondary {
    color: #fff;
}
</style>
