<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore'
import { ref, type Ref } from 'vue'
const confirmDialog: Ref<boolean> = ref(false)

const useStore = useUserStore()

const props = defineProps<{ id: string; signInAt: string; blocked: boolean }>()

const handleRevokeToken = async () => {
    confirmDialog.value = false
    const res = await useStore.revokeToken(props.id, props.signInAt)
    return true
}
</script>
<template>
    <v-btn
        size="x-small"
        color="warning"
        :disabled="blocked ? true : false"
        @click="confirmDialog = true"
        >Revoke</v-btn
    >

    <v-dialog v-model="confirmDialog" max-width="400" persistent>
        <v-card
            prepend-icon="mdi-help-circle-outline"
            text="Sure about revoking this user's token?"
            title="Are you sure?"
        >
            <template v-slot:actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="error"
                    variant="elevated"
                    @click="async () => $emit('is-done', await handleRevokeToken())"
                >
                    Yes
                </v-btn>

                <v-btn variant="elevated" color="grey" @click="confirmDialog = false">Cancel</v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>
