<!-- Note: Can't Delete Myself -->
<script setup lang="ts">
import deleteUser from '@/apis/users/deleteUser';
import { onBeforeMount, ref, type Ref } from 'vue';
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const props = defineProps<{id: string}>()

const handleDelete = async() => {
    if(userStore.getCurrentUser.data.id && userStore.getCurrentUser.data.id !== props.id) {
        const req = await deleteUser(props.id)
        if(req) {
            window.location.reload();
        } else {
            console.log('Error request')
        }
    } else {
        alert("Can't delete myself")
    }  
}
</script>

<template>
    <button :class="userStore.getCurrentUser.data.id === id ? 'badge disabled' : 'badge bg-danger'" @click="handleDelete">Delete</button>
</template>