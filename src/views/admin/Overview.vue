<script setup lang="ts">
import Card from '@/components/Card.vue'
import Button from '@/components/Button.vue'
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
</script>

<template>
    <h1>OverView</h1>
    <div class="row container">
        <div class="col-8">
            <Card>
                <div class="row">
                    <div class="col-8">
                        <h3>Congratulations {{ userStore.getCurrentUser.data.fullName }}! 🎉</h3>
                        <p>
                            You have done 68% 😎 more sales today.<br />
                            Check your new raising badge in your profile.
                        </p>
                        <Button path="/admin/myprofile">View Profile</Button>
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
    </div>
</template>