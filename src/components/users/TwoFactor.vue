<script lang="ts" setup>
import { type Ref, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

const dialog: Ref<boolean> = ref(false)

const props = defineProps<{ user: any }>()

const verifyCode: Ref<string> = ref('')

const dialogInvalid: Ref<boolean> = ref(false)

defineEmits(['is-done'])

const rules = [(value: string) => !!value || 'Enter this field']

const userStore = useUserStore()

const handleOpenDialog = async () => {
    dialog.value = true
    verifyCode.value = ''
    await userStore.toggleTwoFactor()
}

const handleConfirm = async () => {
    const res = await userStore.changeTwoFactor(verifyCode.value)
    if (!res) {
        dialog.value = false
        return false
    }
    dialogInvalid.value = true
    return true
}
</script>

<template>
    <div class="d-inline">
        <v-btn
            class="ms-5"
            @click="handleOpenDialog"
            :prepend-icon="user.twoFactorEnabled ? 'mdi-lock' : 'mdi-lock-open'"
            :color="user.twoFactorEnabled ? 'success' : 'grey'"
            variant="elevated"
        >
            {{ user.twoFactorEnabled ? '2FA: On' : '2FA: Off' }}
        </v-btn>

        <v-dialog v-model="dialog" max-width="800" max-height="500">
            <v-card title="Confirm to Change 2FA">
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12">
                            <v-text-field
                                v-model="verifyCode"
                                :rules="rules"
                                variant="solo"
                                label="Verify Code"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        variant="elevated"
                        @click="async () => $emit('is-done', await handleConfirm())"
                    >
                        Confirm
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogInvalid" max-width="700">
            <v-card>
                <v-alert icon="mdi-alert" color="error" title="Fail To Change 2FA" variant="tonal">
                    <p class="m-0">Verify Code Is Incorrect</p>
                </v-alert>
            </v-card>
        </v-dialog>
    </div>
</template>
