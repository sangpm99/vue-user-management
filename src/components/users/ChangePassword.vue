<script lang="ts" setup>
import { type Ref, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

const dialog: Ref<boolean> = ref(false)

const props = defineProps<{ userId: string | null }>()

defineEmits(['isDone'])

const oldPassword: Ref<string> = ref('')
const newPassword: Ref<string> = ref('')
const confirmNewPassword: Ref<string> = ref('')

const rules = [(value: string) => !!value || 'Enter this field']

const rulesPassword = [
    (value: string) => !!value || 'You must enter this field',
    (value: string) => /[A-Z]/.test(value) || 'Password must contain a capital letter',
    (value: string) => /[0-9]/.test(value) || 'Password must contain a number',
    (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Password must contain a symbol',
    (value: string) => value.length >= 8 || 'You must enter at least 8 characters'
]

const rulesConfirmPassword = [
    (value: string) => !!value || 'You must enter this field',
    (value: string) =>
        value === newPassword.value || 'Confirm Password and New Password must be match'
]

const userStore = useUserStore()

const handleOpenDialog = async () => {
    dialog.value = true
    oldPassword.value = ''
    newPassword.value = ''
    confirmNewPassword.value = ''
}

const handleConfirm = async () => {
    if (
        props.userId !== null &&
        oldPassword.value.length !== 0 &&
        newPassword.value.length !== 0 &&
        newPassword.value === confirmNewPassword.value
    ) {
        await userStore.changePassword(
            oldPassword.value,
            newPassword.value,
            confirmNewPassword.value
        )
        dialog.value = false
        return true;
    }
    return false;
}

const handleCancel = () => {
    oldPassword.value = '';
    newPassword.value = '';
    confirmNewPassword.value = '';
    dialog.value = false;
}
</script>

<template>
    <v-btn
        class="ms-5"
        @click="handleOpenDialog"
        prepend-icon="mdi-key-variant"
        color="primary"
        variant="elevated"
    >
        Change Password
    </v-btn>

    <v-dialog v-model="dialog" max-width="800" max-height="500">
        <v-card title="Change Password">
            <v-card-text>
                <v-row dense>
                    <v-col cols="12">
                        <v-text-field
                            v-model="oldPassword"
                            :rules="rules"
                            variant="solo"
                            label="Old Password"
                            type="password"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            v-model="newPassword"
                            :rules="rulesPassword"
                            variant="solo"
                            label="New Password"
                            type="password"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            v-model="confirmNewPassword"
                            :rules="rulesConfirmPassword"
                            variant="solo"
                            label="Confirm New Password"
                            type="password"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="success"
                    variant="elevated"
                    @click="async () => $emit('isDone', await handleConfirm())"
                >
                    Confirm
                </v-btn>

                <v-btn
                    color="grey"
                    variant="elevated"
                    @click="handleCancel"
                >
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
