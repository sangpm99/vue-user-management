<script lang="ts" setup>
    import { ref, onMounted, watch } from 'vue';
    import {useUserStore} from '@/stores/userStore';

    const totals = ref<number>(0);
    const userList = ref<Array<any>>([]);

    const itemsPerPage = ref(2);

    const currentPage = ref<number>(1);

    const paginationList = ref<Array<any>>([]);

    onMounted(async () => {
        const userStore = useUserStore();
        const data = await userStore.getUsers();

        if(data) {
            totals.value = data.data.itemsCount;
            userList.value = data.data.items;
        }
    })

    watch(
        [() => itemsPerPage.value, () => userList.value],
        () => {
            let i = 0;
            const copyUserList = [...userList.value];
            const newUserList = [];

            while (i < copyUserList.length) {
                newUserList.push(copyUserList.slice(i, itemsPerPage.value + i));
                i += itemsPerPage.value;
            }

            paginationList.value = [...newUserList];
        },
        { immediate: true }
    )
</script>

<template>
    <h1>List User</h1>
    <h3>Totals: {{ totals }}</h3>
    <label for="">
        Show
        <input class="w-25 form-control d-inline" type="number" min="1" v-model.lazy="itemsPerPage">
        Items Per Pages
    </label>

    <table class="table">
    <thead>
        <tr>
        <th scope="col">FullName</th>
        <th scope="col">Department</th>
        <th scope="col">Email</th>
        <th scope="col">Roles</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(user,index) in paginationList[currentPage - 1]" :key="index">
            <td>{{ user.fullName }}</td>
            <td>{{ user.department }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.roles }}</td>
        </tr>
    </tbody>
    </table>
    <div class="d-flex flex-wrap justify-content-end align-items-center">
        <p class="w-100 text-end fst-italic text-gray">Show {{ itemsPerPage }} items per pages</p>
        <nav aria-label="...">
            <ul class="pagination">
                <li class="page-item">
                    <a :class="currentPage === 1 ? 'page-link disabled' : 'page-link'" @click="currentPage--"><</a>
                </li>

                <template v-for="(page, index) in paginationList" :key="index">
                    <li class="page-item">
                        <a 
                            :class="(index + 1) === currentPage ? 'page-link active' : 'page-link'"
                            @click="currentPage = index + 1"
                        >
                            {{ index + 1 }}
                        </a>
                    </li>
                </template>

                <li class="page-item">
                    <a :class="currentPage === paginationList.length ? 'page-link disabled' : 'page-link'" @click="currentPage++">></a>
                </li>
            </ul>
        </nav>
    </div>
</template>