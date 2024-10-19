<!-- Note: Can't Delete Myself -->
<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { onBeforeMount, type Ref, ref } from 'vue';
import { type UserData } from '@/types/UserData';

const currentUser: Ref<UserData | null> = ref(null);

const userStore = useUserStore()

onBeforeMount(() => {
    currentUser.value = userStore.getCurrentUser();
})

const props = defineProps<{id: string}>()

const handleDelete = async() => {
    if(currentUser.value?.id !== props.id) {
        await userStore.deleteUser(props.id)
        window.location.reload();
    }
}
</script>

<template>
    <button :class="currentUser?.id === id ? 'badge disabled' : 'badge bg-danger'" @click="handleDelete">Delete</button>
</template>