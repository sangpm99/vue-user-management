<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useAuthorizeStore } from '@/stores/authorizeStore'
import router from '@/routers';

const authorizeStore = useAuthorizeStore()

const email = ref<string>('')
const reCaptcha = ref<string>('string')

const isGetLink: Ref<boolean> = ref(false);

const link: Ref<string> = ref('');
const token: Ref<string> = ref('');

const handleGetLink = async() => {
    await authorizeStore.forgotPassword(email.value, reCaptcha.value)
    isGetLink.value = true;
}

const handleSend = async() => {
    const arr = link.value.split('token=');
    token.value = arr[1];
    router.push({
        path: '/authorize/recoverpassword',
        query: { email: email.value, token: token.value }
    })
}
</script>

<template>
    <form class="row mb-4 pb-2 form-inline">
        <h4 class="text-center my-3 pb-3">Forgot Password</h4>
        <div class="col-9">
            <div data-mdb-input-init class="form-outline">
                <label for="" class="w-100">
                    Email
                    <input type="email" :class="isGetLink ? 'form-control disabled' : 'form-control'" v-model="email" />
                </label>
            </div>
        </div>

        <div class="col-2 d-flex align-items-end">
            <div data-mdb-input-init class="form-outline">
                <input
                    :class="isGetLink ? 'btn disabled' : 'btn btn-primary'"
                    type="submit"
                    value="Get Link"
                    @click.prevent="handleGetLink"
                />
            </div>
        </div>

        <div class="fade-in-up" v-if="isGetLink">
            <div class="col-12 mt-2 ">
                <div data-mdb-input-init class="form-outline">
                    <label for="" class="w-100">
                        Enter link email
                        <input type="text" class="form-control" v-model="link" />
                    </label>
                </div>
            </div>

            <div class="col-12 d-flex justify-content-end mt-4">
                <div data-mdb-input-init class="form-outline">
                    <input
                        class="btn btn-primary"
                        type="submit"
                        value="Send"
                        @click.prevent="handleSend"
                    />
                </div>
            </div>
        </div>
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