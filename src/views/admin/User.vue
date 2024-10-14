<script lang="ts" setup>
    import { ref, onMounted } from 'vue';
    import {useUserStore} from '@/stores/userStore';

    const totals = ref(0);
    const userList = ref([]);

    onMounted(async () => {
        const userStore = useUserStore();
        const data = await userStore.getUsers();

        if(data) {
            totals.value = data.data.itemsCount;
            userList.value = data.data.items;
        }
    })
</script>

<template>
    <h1>List User</h1>
    <h3>Totals: {{ totals }}</h3>

    <table class="table">
    <thead>
        <tr>
        <th scope="col">STT</th>
        <th scope="col">FullName</th>
        <th scope="col">Department</th>
        <th scope="col">Email</th>
        <th scope="col">Roles</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(user,index) in userList" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ user.fullName }}</td>
            <td>{{ user.department }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.roles }}</td>
        </tr>
    </tbody>
    </table>
</template>