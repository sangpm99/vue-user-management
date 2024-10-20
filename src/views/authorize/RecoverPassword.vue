<script setup lang="ts">
import { onBeforeMount, reactive, ref, type Reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthorizeStore } from '@/stores/authorizeStore'

const authorizeStore = useAuthorizeStore()
const route = useRoute()

const userData: Reactive<any> = reactive({
    email: '',
    token: '',
    newPassword: '',
    confirmNewPassword: '',
    reCaptcha: 'string'
})

onBeforeMount(() => {
    userData.email = route.query.email as string;
    userData.token = route.query.token as string;
})

const notifyPasswordNotMatch = ref<boolean>(false)

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
                <label for="" class="w-100 mb-2">
                    New Password
                    <input type="password" class="form-control" v-model="userData.newPassword" />
                </label>
                <br />
                <label
                    for=""
                    :class="notifyPasswordNotMatch ? 'w-100 mb-2 text-danger' : 'w-100 mb-2'"
                >
                    Confirm New Password
                    <input
                        type="password"
                        :class="
                            notifyPasswordNotMatch ? 'form-control border-danger' : 'form-control'
                        "
                        v-model="userData.confirmNewPassword"
                    />
                </label>
                <br />
                <label v-if="notifyPasswordNotMatch" for="" class="text-danger small">
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
