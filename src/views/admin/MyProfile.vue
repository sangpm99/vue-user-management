<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { getCookie } from '@/stores/userCookie'
import getUser from '@/apis/admin/getUser'
import changeProfile from '@/apis/admin/changeProfile'

const userId: Ref<string> = ref('')

const user: Ref<any> = ref(null)

const userInfo: Ref<any> = ref(null)

const isEdit: Ref<boolean> = ref(false)

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

const handleChangeProfile = async () => {
    // const response = changeProfile(
    //     userInfo.value.fullName,
    //     userInfo.value.userName,
    //     userInfo.value.email,
    //     userInfo.value.phoneNumber,
    //     userInfo.value.address,
    //     userInfo.value.department
    // )
    // if(response) {
    // }
}
</script>

<template>
    <div v-if="userInfo !== null">
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
                    <div class="px-4 pt-4 bg-body-tertiary">
                        <form class="row mb-4">
                            <div class="col-12">
                                <div data-mdb-input-init class="form-outline">
                                    <label for="" class="w-100 mb-2">
                                        Full Name
                                        <input
                                            type="text"
                                            :class="
                                                isEdit ? 'form-control' : 'form-control disabled'
                                            "
                                            v-model.lazy="userInfo.fullName"
                                        />
                                    </label>
                                    <br />

                                    <label for="" class="w-100 mb-2">
                                        User Name
                                        <input
                                            type="text"
                                            :class="
                                                isEdit ? 'form-control' : 'form-control disabled'
                                            "
                                            v-model.lazy="userInfo.userName"
                                        />
                                    </label>
                                    <br />

                                    <label for="" class="w-100 mb-2">
                                        Email
                                        <input
                                            type="text"
                                            :class="
                                                isEdit ? 'form-control' : 'form-control disabled'
                                            "
                                            v-model.lazy="userInfo.email"
                                        />
                                    </label>
                                    <br />

                                    <label for="" class="w-100 mb-2">
                                        Phone Number
                                        <input
                                            type="text"
                                            :class="
                                                isEdit ? 'form-control' : 'form-control disabled'
                                            "
                                            v-model.lazy="userInfo.phoneNumber"
                                        />
                                    </label>
                                    <br />

                                    <label for="" class="w-100 mb-2">
                                        Address
                                        <input
                                            type="text"
                                            :class="
                                                isEdit ? 'form-control' : 'form-control disabled'
                                            "
                                            v-model.lazy="userInfo.address"
                                        />
                                    </label>
                                    <br />

                                    <label for="" class="w-100 mb-2">
                                        Department
                                        <input
                                            type="text"
                                            :class="
                                                isEdit ? 'form-control' : 'form-control disabled'
                                            "
                                            v-model.lazy="userInfo.department"
                                        />
                                    </label>

                                    <label for="" class="w-100 mb-2">
                                        Roles
                                        <input
                                            type="text"
                                            class="form-control disabled"
                                            v-model.lazy="userInfo.roles"
                                        />
                                    </label>
                                    <br />

                                    <div v-if="isEdit">
                                        <input
                                            class="btn btn-primary float-end"
                                            type="submit"
                                            value="Update"
                                            @click.prevent="handleChangeProfile"
                                        />
                                        <input
                                            class="btn btn-secondary float-end me-2"
                                            type="submit"
                                            value="Cancel"
                                            @click.prevent="isEdit = false"
                                        />
                                    </div>

                                    <div class="gap mb-4"></div>
                                </div>
                            </div>
                        </form>
                    </div>
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
                            src="https://media.baoquangninh.vn/dataimages/201809/original/images1098138_vinh_ha_long.jpg"
                            alt="image 1"
                            class="w-100 rounded-3"
                        />
                    </div>
                    <div class="col mb-2">
                        <img
                            width="100%"
                            height="500px"
                            src="https://assets2.htv.com.vn/Images/.NEWZ/08.2023/18/NHI/Screenshot%202023-08-18%20113855.png"
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
                            src="https://mia.vn/media/uploads/blog-du-lich/danh-lam-thang-canh-viet-nam-09-1710680494.jpeg"
                            alt="image 3"
                            class="w-100 rounded-3"
                        />
                    </div>
                    <div class="col">
                        <img
                            width="100%"
                            height="500px"
                            src="https://static.vinwonders.com/production/danh-lam-thang-canh-ha-noi-8.jpg"
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
    background-image: url('@/assets/images/star-night-2.jpg');
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
</style>
