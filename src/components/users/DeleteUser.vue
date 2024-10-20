<!-- Note: Can't Delete Myself -->
<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { onBeforeMount, type Ref, ref } from 'vue'
import { type UserData } from '@/types/UserData'

const currentUser: Ref<UserData | null> = ref(null)

const dialog: Ref<boolean> = ref(false);

const userStore = useUserStore()

onBeforeMount(() => {
    currentUser.value = userStore.getCurrentUser()
})

const props = defineProps<{ id: string }>()

const handleDelete = async () => {
    if (currentUser.value?.id !== props.id) {
        await userStore.deleteUser(props.id)
    }
    dialog.value = false;
}
</script>

<template>
    <v-dialog
        v-model="dialog"
        max-width="400"
        >
        <template v-slot:activator="{ props: activatorProps }">
            <button
                :class="currentUser?.id === id ? 'badge disabled' : 'badge bg-danger'"
                v-bind="activatorProps"
                >Delete</button>
        </template>

        <v-card
            prepend-icon="mdi-help-circle-outline"
            title="Are you sure?"
        >
            <p class="ms-5">Sure about delete this user ?</p>
            <template v-slot:actions>
                <v-spacer></v-spacer>

                <button class="btn btn-danger" @click="async() => $emit('is-done', await handleDelete())">
                    Yes
                </button>

                <button class="btn btn-secondary" @click="dialog = false">
                    Cancel
                </button>
            </template>
        </v-card>
    </v-dialog>
</template>
