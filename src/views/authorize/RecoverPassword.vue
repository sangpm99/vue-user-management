<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import recoverPassword from '@/apis/authorize/recoverPassword'

const route = useRoute()

const email = ref<string>(route.query.email as string)

const token = ref<string>(
    'Q2ZESjhIeHAwY1M1ZjhWTWkzaWNsUjJMQmZLZFVtSFUzOVhXeWZyWEtNR0NBeGhzWlRtSDZLQlNvOGxRTytlck1FbmZnRzFvS0tyL3F4Z3ZUemE4MXgzeTFWaDZZT3d0T01pUHUvMVdkOWlTbTNMaDVOS2t2NUZHcGNWNTBoRWRobUdlNlRCUTFmWldDellSNVFSS05nVGJqeldEeTdsSnBkQTQvZVVPWTNsSFBHa2dmRWd2SDNPZ0N0VUc5TWhMV1A2Q1VrbFNjcnQ4dGR5TXY1ZWRqbXl3WlVaeE9jRFh1Q3pYQkRSRDdJL2I2ak0w'
)

const newPassword = ref<string>('')

const confirmNewPassword = ref<string>('')

const reCaptcha = ref<string>('string')

const notifyPasswordNotMatch = ref<boolean>(false)

const handleRecoverPassword = async () => {
    if (
        await recoverPassword(
            email.value,
            newPassword.value,
            confirmNewPassword.value,
            token.value,
            reCaptcha.value
        )
    ) {
        notifyPasswordNotMatch.value = true
    } else {
        notifyPasswordNotMatch.value = false
    }
}
</script>

<template>
    <h4 class="text-center my-3 pb-3">Recover Password</h4>

    <form action="" method="POST" class="row mb-4 pb-2">
        <div class="col-12">
            <div data-mdb-input-init class="form-outline">
                <label for="" class="w-100 mb-2">
                    Email
                    <input
                        disabled
                        type="email"
                        class="form-control not-allow"
                        v-model="email"
                    />
                </label>
                <br />
                <label for="" class="w-100 mb-2">
                    New Password
                    <input
                        type="password"
                        class="form-control"
                        v-model="newPassword"
                    />
                </label>
                <br />
                <label
                    for=""
                    :class="
                        notifyPasswordNotMatch
                            ? 'w-100 mb-2 text-danger'
                            : 'w-100 mb-2'
                    "
                >
                    Confirm New Password
                    <input
                        type="password"
                        :class="
                            notifyPasswordNotMatch
                                ? 'form-control border-danger'
                                : 'form-control'
                        "
                        v-model="confirmNewPassword"
                    />
                </label>
                <br />
                <label
                    v-if="notifyPasswordNotMatch"
                    for=""
                    class="text-danger small"
                >
                    Confirm new password must match new password
                </label>
                <br />
                <input
                    class="mt-2 btn btn-primary float-end"
                    type="submit"
                    value="Recover Password"
                    @click.prevent="handleRecoverPassword"
                />
            </div>
        </div>
    </form>
</template>
