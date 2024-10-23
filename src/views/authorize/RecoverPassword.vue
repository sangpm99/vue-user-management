<script setup lang="ts">
import { onBeforeMount, reactive, ref, type Reactive, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthorizeStore } from '@/stores/authorizeStore'

const authorizeStore = useAuthorizeStore()
const route = useRoute()
const invalidLink: Ref<boolean> = ref(false);

const userData: Reactive<any> = reactive({
    email: '',
    token: '',
    newPassword: '',
    confirmNewPassword: '',
    reCaptcha: 'string'
})

onBeforeMount(() => {
    if((route.query.email as string) && (route.query.token as string)) {
        invalid.value = false;
        userData.email = route.query.email as string
        userData.token = route.query.token as string
    } else {
        invalidLink.value = true;
    }
})

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
        value === userData.newPassword || 'Confirm Password and New Password must be match'
]

const invalid: Reactive<any> = reactive({
    isInvalid: false,
    status: null,
    message: ''
})

const handleRecoverPassword = async () => {
    await authorizeStore.recoverPassword(
        userData.email,
        userData.newPassword,
        userData.confirmNewPassword,
        userData.token,
        userData.reCaptcha
    )
}
</script>

<template>
    <h4 class="text-center my-3 pb-3">Recover Password</h4>

    <form action="" method="POST" class="row mb-4 pb-2">
        <div class="col-12">
            <div data-mdb-input-init class="form-outline">
                <v-row dense v-if="invalidLink = false">
                    <v-col cols="12">
                        <v-text-field
                            v-model="userData.newPassword"
                            :rules="rulesPassword"
                            variant="outlined"
                            label="New Password"
                            type="password"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            v-model="userData.confirmNewPassword"
                            :rules="rulesConfirmPassword"
                            variant="outlined"
                            label="Confirm New Password"
                            type="password"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-alert
                            v-if="invalid.isInvalid"
                            border="start"
                            close-label="Close Alert"
                            color="red"
                            variant="tonal"
                            closable
                            class="mt-2 mb-5"
                        >
                            {{ invalid.message }}
                        </v-alert>
                    </v-col>

                    <v-btn class="float-end" color="primary" @click.prevent="handleRecoverPassword"
                    >Reset Password</v-btn
                    >
                </v-row>
                

                <v-alert
                    border="start"
                    close-label="Close Alert"
                    color="error"
                    variant="tonal"
                    closable
                    class="my-2"
                    v-if="invalidLink = true"
                >
                    Please confirm your forgotten password email then click link received before using this function.
                </v-alert>
            </div>
        </div>
    </form>
</template>
