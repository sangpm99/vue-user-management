<script setup lang="ts">
import { ref } from 'vue'
import forgotPassword from '@/apis/authorize/forgotPassword'

const email = ref<string>('')
const reCaptcha = ref<string>('string')
</script>

<template>
    <h4 class="text-center my-3 pb-3">Forgot Password</h4>

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
                <input
                    class="mt-2 btn btn-primary float-end"
                    type="submit"
                    value="Reset Password"
                    @click.prevent="forgotPassword(email, reCaptcha)"
                />
            </div>
        </div>
    </form>
</template>
