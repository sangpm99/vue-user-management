<script setup lang="ts">
import { ref, type Ref, reactive, type Reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthorizeStore } from '@/stores/authorizeStore'
import { useLocalStorageStore } from '@/stores/localStorageStore'
import { RecaptchaV2 } from "vue3-recaptcha-v2";

const handleWidgetId = (widgetId: number) => {
  console.log("Widget ID: ", widgetId);
};
const handleErrorCalback = () => {
  console.log("Error callback");
};
const handleExpiredCallback = () => {
  console.log("Expired callback");
};
const handleLoadCallback = (response: unknown) => {
  console.log("Load callback", response);
};

const localStorageStore = useLocalStorageStore()

const authorizeStore = useAuthorizeStore()

const email: Ref<string> = ref<string>('')

const password: Ref<string> = ref<string>('')

const reCaptcha: Ref<string> = ref<string>('string')

const rememberMe: Ref<boolean> = ref<boolean>(false)

const isTwoFactor: Ref<boolean> = ref<boolean>(false)

const verifyCode: Ref<string> = ref<string>('')

const invalid: Reactive<any> = reactive({
    isInvalid: false,
    status: null,
    message: ''
})

const user: Ref<any> = ref({})

const rules = [(value: string) => !!value || 'Please enter this field']

const handleSignIn = async () => {
    const res = await authorizeStore.signIn(
        email.value,
        password.value,
        reCaptcha.value,
        rememberMe.value
    )
    user.value = res
    if (res !== undefined) {
        switch (true) {
            case res.status >= 200 && res.status <= 299:
                invalid.isInvalid = false
                if (user.value.data.data.twoFactorEnabled) {
                    isTwoFactor.value = true
                } else {
                    localStorageStore.setUserData(user.value.data.data)
                    window.location.href = '/admin/overview'
                }
                break
            case res.status === 400:
                invalid.isInvalid = true
                invalid.message = 'The Email field is not a valid e-mail address.'
                break
            case res.status === 401:
                invalid.isInvalid = true
                invalid.message = 'Email or password is incorrect.'
                break
            default:
                invalid.isInvalid = true
                invalid.message = 'An error occurred, please try again later.'
        }
    } else {
        invalid.isInvalid = true
        invalid.message = 'An error occurred, please try again later.'
    }
}

const handleVerifyCode = async () => {
    if (verifyCode.value.length !== 0) {
        const res = await authorizeStore.twoFactor(
            email.value,
            user.value.data.data.token,
            verifyCode.value,
            rememberMe.value
        )
        if (res !== undefined) {
            switch (true) {
                case res.status >= 200 && res.status <= 299:
                    invalid.isInvalid = false
                    localStorageStore.setUserData(res.data.data)
                    window.location.href = '/admin/overview'
                    break
                case res.status === 401:
                    invalid.isInvalid = true
                    invalid.message = 'Verification failed. Please enter the correct code.'
                    break
                default:
                    invalid.isInvalid = true
                    invalid.message = 'Verification failed. Please enter the correct code.'
                    break
            }
        } else {
            invalid.isInvalid = true
            invalid.message = 'Verification failed. Please enter the correct code.'
        }
    }
}
</script>

<template>
    <form action="" method="POST" class="row mb-4 pb-2">
        <div class="col-12">
            <div data-mdb-input-init class="form-outline" v-if="!isTwoFactor">
                <h4 class="text-center my-3 pb-3 w-100">Sign In</h4>
                <v-row dense>
                    <v-col cols="12">
                        <v-text-field
                            v-model="email"
                            :rules="rules"
                            variant="outlined"
                            label="Email"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                            v-model="password"
                            :rules="rules"
                            type="password"
                            variant="outlined"
                            label="Password"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <input
                    type="checkbox"
                    class="form-check-input me-2"
                    id="rememberMe"
                    v-model="rememberMe"
                />
                <label for="rememberMe">Remember me?</label>
                <br />
                <v-alert
                    v-if="invalid.isInvalid"
                    border="start"
                    close-label="Close Alert"
                    color="red"
                    variant="tonal"
                    closable
                    class="my-2"
                >
                    {{ invalid.message }}
                </v-alert>
                <v-btn class="float-end" color="primary" @click.prevent="handleSignIn"
                    >Sign In</v-btn
                >
                <div class="clearfix"></div>
                <br />
                <p class="text-center">
                    <RouterLink to="/authorize/forgotpassword">Forgot password?</RouterLink>
                </p>
            </div>

            <div data-mdb-input-init class="form-outline" v-else="isTwoFactor">
                <h4 class="text-center my-3 pb-3 w-100">Verification</h4>
                <v-row dense>
                    <v-col cols="12">
                        <v-text-field
                            v-model="verifyCode"
                            :rules="rules"
                            variant="outlined"
                            label="Enter Your Code"
                        ></v-text-field>
                    </v-col>

                    <v-alert
                        v-if="invalid.isInvalid"
                        border="start"
                        close-label="Close Alert"
                        color="red"
                        variant="tonal"
                        closable
                        class="my-2"
                    >
                        {{ invalid.message }}
                    </v-alert>
                </v-row>
                <br />
                <RecaptchaV2
                    @widget-id="handleWidgetId(1)"
                    @error-callback="handleErrorCalback"
                    @expired-callback="handleExpiredCallback"
                    @load-callback="handleLoadCallback"
                />
                <v-btn class="float-end" color="primary" @click.prevent="handleVerifyCode"
                    >Submit</v-btn
                >
            </div>
        </div>
    </form>
</template>
