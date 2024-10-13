<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import signIn from '@/apis/authorize/signIn'

const email = ref<string>('')

const password = ref<string>('')

</script>

<template>
    <section class="vh-100" style="background-color: #eee">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col col-lg-9 col-xl-7">
                    <div class="card rounded-3">
                        <div class="card-body p-4">
                            <h4 class="text-center my-3 pb-3">Sign In</h4>

                            <form action="" method="POST" class="row mb-4 pb-2">
                                <div class="col-12">
                                    <div data-mdb-input-init class="form-outline">
                                        <label for="" class="w-100 mb-2">
                                            Email
                                            <input
                                                type="email"
                                                class="form-control"
                                                v-model="email"
                                            />
                                        </label>
                                        <br />
                                        <label for="" class="w-100 mb-2">
                                            Password
                                            <input
                                                type="password"
                                                class="form-control"
                                                v-model="password"
                                            />
                                        </label>
                                        <br />
                                        <input
                                            class="mt-2 btn btn-primary float-end"
                                            type="submit"
                                            value="Sign In"
                                            @click.prevent="
                                                signIn(email, password)
                                            "
                                        />
                                        <br />
                                        <p class="text-center mt-5">
                                            Don't have an account?
                                            <RouterLink to="/authorize/signup">Sign Up</RouterLink>
                                        </p>
                                        <p class="text-center mt-2">
                                            <RouterLink to="/authorize/forgotpassword"
                                                >Forgot password?</RouterLink
                                            >
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
