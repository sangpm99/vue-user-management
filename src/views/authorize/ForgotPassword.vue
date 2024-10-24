<script setup lang="ts">
import { ref, type Ref, reactive, type Reactive } from 'vue'
import { useAuthorizeStore } from '@/stores/authorizeStore'
import router from '@/routers'
import ReCaptCha from '@/components/ReCaptCha.vue';

const authorizeStore = useAuthorizeStore()

const email = ref<string>('')
const reCaptcha: Ref<string | null> = ref(null)

const isGetLink: Ref<boolean> = ref(false)

const link: Ref<string> = ref('')
const token: Ref<string> = ref('')

const invalid: Reactive<any> = reactive({
    isInvalid: false,
    status: null,
    message: ''
})

const handleGetLink = async () => {
    if(reCaptcha.value === null) {
        invalid.isInvalid = true
        invalid.message = 'The reCaptcha must be authenticated.'
        return
    }
    const res = await authorizeStore.forgotPassword(email.value, reCaptcha.value)
    if (res) {
        switch (true) {
            case res.status >= 200 && res.status <= 299:
                invalid.isInvalid = false
                break
            case res.status === 400:
                invalid.isInvalid = true
                invalid.message = 'The Email field is not a valid e-mail address.'
                break
            case res.status === 401 || res.status === 404:
                invalid.isInvalid = true
                invalid.message = "The Email doesn't exist."
                break
            default:
                invalid.isInvalid = true
                invalid.message = 'An error occurred, please try again later.'
        }
    } else {
        invalid.isInvalid = true
        invalid.message = 'An error occurred, please try again later.'
    }
    isGetLink.value = true
}

// const handleSend = async () => {
//     const arr = link.value.split('token=')
//     token.value = arr[1]
//     router.push({
//         path: '/change-password',
//         query: { email: email.value, token: token.value }
//     })
// }

const rules = [(value: string) => !!value || 'Please enter this field']
</script>

<template>
    <form class="row mb-4 pb-2 form-inline">
        <h4 class="text-center my-3 pb-3">Forgot Password</h4>
        <div class="col-12">
            <div data-mdb-input-init class="form-outline">
                <v-row dense>
                    <v-col cols="12">
                        <v-text-field
                            v-model="email"
                            :rules="rules"
                            variant="outlined"
                            label="Email"
                            v-if="!(isGetLink && !invalid.isInvalid)"
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
                            class="my-2"
                        >
                            {{ invalid.message }}
                        </v-alert>
                    </v-col>

                    <ReCaptCha
                        v-if="!(isGetLink && !invalid.isInvalid)"
                        :re-captcha-receive="reCaptcha"
                        @handle-error-callback="(value) => reCaptcha = value"
                        @handle-expired-callback="(value) => reCaptcha = value"
                        @handle-load-callback="(value) => reCaptcha = value"
                    />

                    <v-col cols="12">
                        <v-btn
                            class="float-end"
                            color="primary"
                            @click.prevent="handleGetLink"
                            v-if="!(isGetLink && !invalid.isInvalid)"
                            >Submit</v-btn
                        >
                    </v-col>

                    <v-col cols="12" v-if="isGetLink && !invalid.isInvalid">
                        <v-alert
                            border="start"
                            close-label="Close Alert"
                            color="success"
                            variant="tonal"
                            closable
                            class="my-2"
                        >
                            Password reset link has been sent to your email, please reset your
                            password soon.
                        </v-alert>
                    </v-col>
                </v-row>
            </div>
        </div>

        <!-- <div class="fade-in-up" v-if="isGetLink && !invalid.isInvalid">
            <div class="col-12 mt-2">
                <div data-mdb-input-init class="form-outline">
                    <v-row dense>
                        <v-col cols="12">
                            <v-text-field
                                v-model="link"
                                :rules="rules"
                                variant="outlined"
                                label="Enter link email"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </div>
            </div>

            <div class="col-12 d-flex justify-content-end mt-4">
                <div data-mdb-input-init class="form-outline">
                    <v-btn color="primary" @click.prevent="handleSend">Send</v-btn>
                </div>
            </div>
        </div> -->
    </form>
</template>

<style scoped>
form {
    margin-top: -8rem;
    position: relative;
}

.fade-in-up {
    position: absolute;
    animation: fadeInUp 1s ease forwards;
}

@keyframes fadeInUp {
    from {
        transform: translateY(6rem);
        opacity: 0;
    }
    to {
        transform: translateY(8rem);
        opacity: 1;
    }
}
</style>
