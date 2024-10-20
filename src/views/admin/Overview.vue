<script setup lang="ts">
import Card from '@/components/Card.vue'
import { useUserStore } from '@/stores/userStore'
import { onMounted, type Ref, ref } from 'vue'
import type { UserData } from '@/types/UserData'
import { RouterLink } from 'vue-router'

const userStore = useUserStore()

const currentUser: Ref<UserData | null> = ref(null)

onMounted(async () => {
    currentUser.value = userStore.getCurrentUser()
})
</script>

<template>
    <h1>OverView</h1>
    <div class="row container">
        <div v-if="currentUser" class="col-8">
            <Card>
                <div class="row">
                    <div class="col-8">
                        <h5>Congratulations {{ currentUser.fullName }}! 🎉</h5>
                        <p>
                            You have done 68% 😎 more sales today.<br />
                            Check your new raising badge in your profile.
                        </p>
                        <RouterLink class="btn btn-primary" to="/admin/myprofile"
                            >View Profile</RouterLink
                        >
                    </div>

                    <div class="col-4 position-absolute bottom-0 end-0">
                        <img
                            class="w-100"
                            src="@/assets/images/illustration-john-light-D8CgFblM.png"
                            alt="image"
                        />
                    </div>
                </div>
            </Card>
        </div>
        <div v-else>Loading ...</div>
    </div>
</template>
