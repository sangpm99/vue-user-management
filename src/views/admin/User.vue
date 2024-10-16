<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import {useUserStore} from '@/stores/userStore';

    const totals = ref<number>(0);
    const userList = ref<Array<any>>([]);

    const itemsPerPage = ref(2);

    const currentPage = ref<number>(1);

    const userStore = useUserStore();

    const pagination = ref<Number>(1);

    watch(
        () => itemsPerPage.value,
        () => {
            currentPage.value = 1;
        }
    );

    watch(
        [() => itemsPerPage.value, () => currentPage.value],
        async () => {
            const data = await userStore.getUsers(currentPage.value, itemsPerPage.value);

            if (data) {
                totals.value = data.data.itemsCount;
                userList.value = data.data.items;

                pagination.value = (totals.value % itemsPerPage.value) === 0 ? Math.floor(totals.value / itemsPerPage.value) : Math.floor(totals.value / itemsPerPage.value) + 1;
            }
        },
        { immediate: true }
    );
</script>

<template>
    <div class="card h-100 shadow p-3">
        <h1>User List</h1>
        <h3>Totals: {{ totals }}</h3>
        <label>
            Show
            <input class="item-per-page form-control d-inline" type="number" min="1" v-model.lazy="itemsPerPage">
            Items Per Pages
        </label>

        <table class="table mt-2 table-bordered">
        <thead class="table-dark">
            <tr>
            <th scope="col">FullName</th>
            <th scope="col">Department</th>
            <th scope="col">Email</th>
            <th scope="col">Roles</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(user,index) in userList" :key="index">
                <td>{{ user.fullName }}</td>
                <td>{{ user.department }}</td>
                <td>{{ user.email }}</td>
                <td><span v-for="(role, index) in user.roles" :key="index">{{ role }}&nbsp;</span></td>
            </tr>
        </tbody>
        </table>
        <div class="d-flex flex-wrap justify-content-end align-items-center">
            <p class="w-100 text-end fst-italic text-gray">Show {{ itemsPerPage }} items per pages</p>
            <nav aria-label="...">
                <ul class="pagination">
                    <li class="page-item">
                        <a :class="currentPage === 1 ? 'page-link disabled' : 'page-link'" @click="currentPage = 1">&laquo;</a>
                    </li>
                    <li class="page-item">
                        <a :class="currentPage === 1 ? 'page-link disabled' : 'page-link'" @click="currentPage--">prev</a>
                    </li>

                    <template v-for="index in pagination" :key="index">
                        <li class="page-item">
                            <a 
                                :class="(Number(index)) === currentPage ? 'page-link active' : 'page-link'"
                                @click="currentPage = Number(index)"
                            >
                                {{ Number(index)}}
                            </a>
                        </li>
                    </template>

                    <li class="page-item">
                        <a :class="currentPage === pagination ? 'page-link disabled' : 'page-link'" @click="currentPage++">next</a>
                    </li>
                    <li class="page-item">
                        <a :class="currentPage === Number(pagination) ? 'page-link disabled' : 'page-link'" @click="currentPage = Number(pagination)">&raquo;</a>
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
</style>