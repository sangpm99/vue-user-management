<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'
import CreateUser from '@/components/users/CreateUser.vue'
import UpdateUser from '@/components/users/UpdateUser.vue'
import DeleteUser from '@/components/users/DeleteUser.vue'
import GetActivityUser from '@/components/users/GetActivity.vue'

const totals = ref<number>(0)
const userList = ref<Array<any>>([])

const itemsPerPage = ref(20)

const currentPage = ref<number>(1)

const userStore = useUserStore()

const pagination = ref<Number>(1)

watch(
    () => itemsPerPage.value,
    () => {
        currentPage.value = 1
    }
)

const getUsers = async () => {
    const res = await userStore.getUsers(currentPage.value, itemsPerPage.value)
    if (res) {
        switch (true) {
            case res.status === 401:
                window.location.href = '/authorize/signin'
                return
                break
            default:
                break
        }

        if (res.data.data.items) {
            totals.value = res.data.data.itemsCount
            userList.value = res.data.data.items

            pagination.value =
                totals.value % itemsPerPage.value === 0
                    ? Math.floor(totals.value / itemsPerPage.value)
                    : Math.floor(totals.value / itemsPerPage.value) + 1
        }
    }
}

watch(
    [() => itemsPerPage.value, () => currentPage.value],
    async () => {
        getUsers()
    },
    { immediate: true }
)
</script>

<template>
    <h1>User List</h1>
    <div class="card h-100 shadow p-3">
        <h3>Totals: {{ totals }}</h3>
        <div class="row">
            <div class="col-10">
                <label>
                    Show
                    <input
                        class="item-per-page form-control d-inline"
                        type="number"
                        min="1"
                        v-model.lazy="itemsPerPage"
                    />
                    Items Per Pages
                </label>
            </div>

            <div class="col-2 d-flex justify-content-end">
                <CreateUser
                    @is-done="
                        async (value) => {
                            if (value) {
                                await getUsers()
                            }
                        }
                    "
                />
            </div>
        </div>

        <table class="table mt-2 table-bordered">
            <thead class="table-dark">
                <tr>
                    <th scope="col">User</th>
                    <th scope="col">Department</th>
                    <th scope="col">Email</th>
                    <th scope="col">Roles</th>
                    <th scope="col">Lock Out</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in userList" :key="index">
                    <td class="my-user">
                        {{ user.fullName }}
                        <br />
                        <div class="my-nav">
                            <UpdateUser :id="user.id" @is-done="getUsers" /> |
                            <GetActivityUser :id="user.id" /> |
                            <DeleteUser :id="user.id" @is-done="getUsers" />
                        </div>
                    </td>
                    <td>{{ user.department }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.roles.join(", ") }}</td>
                    <td>{{ user.lockedOut ? 'Locked' : 'Unlocked' }}</td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex flex-wrap justify-content-end align-items-center">
            <p class="w-100 text-end fst-italic text-gray">
                Show {{ itemsPerPage }} items per pages
            </p>
            <nav aria-label="...">
                <ul class="pagination">
                    <li class="page-item">
                        <a
                            :class="currentPage === 1 ? 'page-link disabled' : 'page-link'"
                            @click="currentPage = 1"
                            >&laquo;</a
                        >
                    </li>
                    <li class="page-item">
                        <a
                            :class="currentPage === 1 ? 'page-link disabled' : 'page-link'"
                            @click="currentPage--"
                            >prev</a
                        >
                    </li>

                    <template v-for="index in pagination" :key="index">
                        <li class="page-item">
                            <a
                                :class="
                                    Number(index) === currentPage ? 'page-link active' : 'page-link'
                                "
                                @click="currentPage = Number(index)"
                            >
                                {{ Number(index) }}
                            </a>
                        </li>
                    </template>

                    <li class="page-item">
                        <a
                            :class="currentPage === pagination ? 'page-link disabled' : 'page-link'"
                            @click="currentPage++"
                            >next</a
                        >
                    </li>
                    <li class="page-item">
                        <a
                            :class="
                                currentPage === Number(pagination)
                                    ? 'page-link disabled'
                                    : 'page-link'
                            "
                            @click="currentPage = Number(pagination)"
                            >&raquo;</a
                        >
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<style scoped>
input.item-per-page {
    width: 70px;
}

.my-user .my-nav {
    opacity: 0;
    transition: all 0.25s ease;
    transform: translateY(10px);
}

.my-user:hover .my-nav {
    opacity: 1;
    transform: translateY(0);
}
</style>
