<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { useCookieStore, useUserStore } from '@/stores/useStore'
import Swal from 'sweetalert2'

const cookiesStore = useCookieStore();
const userStore = useUserStore();

const userId: Ref<string> = ref('')

const user: Ref<any> = ref(null)

const userInfo: Ref<any> = ref(null)

const isEdit: Ref<boolean> = ref(false)

const reMount: Ref<number> = ref(0);

const rules = [
    (value: string) => !!value || 'Field is required',
]

const department: Array<string> = [
    'CEO',
    'ASSISTANCE',
    'SALE',
    'DESIGN',
    'DESIGN_MANAGER',
    'ACCOUNTING',
    'FULFILLMENT',
    'CUSTOMER_SERVICE',
    'SUPPORT',
    'IT',
    'BUILD_ACC'
]

watch(
    () => user.value,
    () => {
        const cookieData = cookiesStore.getCookie()

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
    async (id) => {
        if (id !== null) {
            try {
                const userInfoResponse = await userStore.getUser(id)
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

const handleChangeProfile = async () => {
    const response = await userStore.changeProfile(
        userInfo.value.userName,
        userInfo.value.email,
        userInfo.value.fullName,
        userInfo.value.phoneNumber,
        userInfo.value.address,
        userInfo.value.department
    );

    if(response) {
        reMount.value++;
        isEdit.value = false;
        Swal.fire({
        title: 'Success',
        text: 'Your Profile Update Successfully',
        icon: 'success'})
    } else {
        Swal.fire({
        title: 'Fail',
        text: 'Username Or Email is Exist, please try another',
        icon: 'error'})
    }
}
</script>

<template>
    <div v-if="userInfo !== null" :key="reMount">
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
                    <button
                        type="button"
                        :class="isEdit ? 'btn btn-outline-dark disabled' : 'btn btn-outline-dark'"
                        style="z-index: 1"
                        @click="isEdit = true"
                    >
                        Edit profile
                    </button>
                </div>
                <div class="ms-3" style="margin-top: 130px">
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
                <div class="mb-5 text-body">
                    <h3 class="mb-1">About</h3>
                    <v-card-text>
                        <v-row dense>
                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                label="Full Name"
                                v-model.lazy="userInfo.fullName"
                                :readonly="!isEdit"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                label="User Name"
                                v-model.lazy="userInfo.userName"
                                :readonly="!isEdit"
                                :rules="rules"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                label="Email"
                                v-model.lazy="userInfo.email"
                                :readonly="!isEdit"
                                :rules="rules"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                label="Phone Number"
                                v-model.lazy="userInfo.phoneNumber"
                                :readonly="!isEdit"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                label="Address"
                                v-model.lazy="userInfo.address"
                                :readonly="!isEdit"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="6">
                            <v-autocomplete
                                label="Department"
                                auto-select-first
                                variant="solo"
                                :items="department"
                                v-model.lazy="userInfo.department"
                                :readonly="!isEdit"
                            ></v-autocomplete>
                        </v-col>

                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                label="Roles"
                                v-model.lazy="userInfo.roles"
                                readonly
                            ></v-text-field>
                        </v-col>

                        <div class="w-100" v-if="isEdit">
                            <input
                                class="btn btn-secondary float-end"
                                type="submit"
                                value="Cancel"
                                @click.prevent="isEdit = false"
                            />
                            <input
                                class="btn btn-primary float-end me-2"
                                type="submit"
                                value="Update"
                                @click.prevent="handleChangeProfile"
                            />
                        </div>

                        <div class="gap mb-4"></div>
                    </v-row>
                </v-card-text>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-4 text-body">
                    <h3 class="mb-0">Recent photos</h3>
                    <p class="mb-0"><a href="#!" class="text-muted">Show all</a></p>
                </div>
                <div class="row g-2">
                    <div class="col mb-2">
                        <img
                            width="100%"
                            height="500px"
                            src="@/assets/images/view-breathtaking-beach-nature-landscape.webp"
                            alt="image 1"
                            class="w-100 rounded-3"
                        />
                    </div>
                    <div class="col mb-2">
                        <img
                            width="100%"
                            height="500px"
                            src="@/assets/images/autumn-landscape-pond-with-gazebo.webp"
                            alt="image 2"
                            class="w-100 rounded-3"
                        />
                    </div>
                </div>
                <div class="row g-2">
                    <div class="col">
                        <img
                            width="100%"
                            height="500px"
                            src="@/assets/images/nature-landscape-with-starry-clear-sky.webp"
                            alt="image 3"
                            class="w-100 rounded-3"
                        />
                    </div>
                    <div class="col">
                        <img
                            width="100%"
                            height="500px"
                            src="@/assets/images/beautiful-rainbow-nature.webp"
                            alt="image 4"
                            class="w-100 rounded-3"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
