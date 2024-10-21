<!-- Note: Can't Delete Myself -->
<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { onBeforeMount, type Ref, ref } from 'vue'
import { type UserData } from '@/types/UserData'

const currentUser: Ref<UserData | null> = ref(null)

const dialog: Ref<boolean> = ref(false)

const userStore = useUserStore()

onBeforeMount(() => {
    currentUser.value = userStore.getCurrentUser()
})

const props = defineProps<{ id: string }>()

const handleDelete = async () => {
    if (currentUser.value?.id !== props.id) {
        await userStore.deleteUser(props.id)
    }
    dialog.value = false
}
</script>

<template>
    <v-dialog v-model="dialog" max-width="400">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
                color="error"
                size="x-small"
                :disabled="currentUser?.id === id ? true : false"
                v-bind="activatorProps"
            >
                Delete
            </v-btn>
        </template>

        <v-card prepend-icon="mdi-help-circle-outline" title="Are you sure?">
            <p class="ms-5">Sure about delete this user ?</p>
            <template v-slot:actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="error"
                    variant="elevated"
                    @click="async () => $emit('is-done', await handleDelete())"
                >
                    Yes
                </v-btn>

                <v-btn
                    color="grey"
                    @click="dialog = false"
                    variant="elevated"
                    >Cancel</v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>
