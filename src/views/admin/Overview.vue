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

        <div class="col-2">
            <Card>
                <div class="position-relative h-100">
                    <h3>Users</h3>
                    <p>5</p>
                    <p>Total Users</p>
                    <Button path="/users/getusers" class="position-absolute bottom-0"
                        >View All</Button
                    >
                </div>
            </Card>
        </div>

        <div class="col-2">
            <Card>
                <div class="position-relative h-100">
                    <h3>Roles</h3>
                    <p>2</p>
                    <p>Total Roles</p>
                    <Button path="/roles/getroles" class="position-absolute bottom-0"
                        >View All</Button
                    >
                </div>
            </Card>
        </div>
    </div>
</template>