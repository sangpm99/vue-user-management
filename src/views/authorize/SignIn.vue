<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthorizeStore } from '@/stores/authorizeStore'

const authorizeStore = useAuthorizeStore()

const email = ref<string>('')

const password = ref<string>('')

const reCaptcha = ref<string>('string')

const rememberMe = ref<boolean>(false)
</script>

<template>
    <h4 class="text-center my-3 pb-3 w-100">Sign In</h4>
    <form action="" method="POST" class="row mb-4 pb-2">
        <div class="col-12">
            <div data-mdb-input-init class="form-outline">
                <label for="" class="w-100 mb-2">
                    Email
                    <input type="email" class="form-control" v-model="email" />
                </label>
                <br />
                <label for="" class="w-100 mb-2">
                    Password
                    <input type="password" class="form-control" v-model="password" />
                </label>
                <br />
                <input
                    type="checkbox"
                    class="form-check-input me-2"
                    id="rememberMe"
                    v-model="rememberMe"
                />
                <label for="rememberMe">Remember me?</label>
                <br />
                <input
                    class="btn btn-primary float-end"
                    type="submit"
                    value="Sign In"
                    @click.prevent="authorizeStore.signIn(email, password, reCaptcha, rememberMe)"
                />
                <div class="clearfix"></div>
                <br />
                <p class="text-center mt-2">
                    <RouterLink to="/authorize/forgotpassword">Forgot password?</RouterLink>
                </p>
            </div>
        </div>
    </form>
</template>
