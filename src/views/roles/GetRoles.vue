<script setup lang="ts">
import { ref, onBeforeMount, type Ref } from 'vue'
import Card from '@/components/Card.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import getRoles from '@/apis/roles/getRoles'
import CreateRole from '@/components/roles/CreateRole.vue'

library.add(faPenToSquare, faTrashCan, faXmark)

const roles: Ref<any> = ref()

onBeforeMount(async () => {
    roles.value = await getRoles()
})

const reMount: Ref<number> = ref(0)

const handleRemount = (value: boolean) => {
    if(value) {
        reMount.value++;
    }
}

</script>

<template>
    <div v-if="roles">
        <h1>Roles List</h1>
        <div class="row">
            <div class="col-10">
                <h3>
                    Total:
                    {{
                        roles.data?.itemsCount > 1
                            ? `${roles.data?.itemsCount} Roles`
                            : `${roles.data?.itemsCount} Role`
                    }}
                </h3>
            </div>
            <div class="col-2 d-flex justify-content-end">
                <CreateRole @isDone="handleRemount"/>
            </div>
        </div>

        <div class="row gy-3" v-bind:key="reMount">
            <div class="col-4" v-for="(role, index) in roles.data.items" :key="index">
                <Card>
                    <div class="row">
                        <div class="col-10">
                            <h3>{{ role.name }}</h3>
                            <p>
                                <span>{{ role.usersCount }}</span> users
                            </p>
                        </div>

                        <div class="col-2">
                            <button
                                class="btn btn-primary w-100 d-flex justify-content-center align-items-center p-2"
                            >
                                <font-awesome-icon :icon="['far', 'pen-to-square']" />
                            </button>
                            <button
                                class="btn btn-danger w-100 d-flex justify-content-center align-items-center p-2 mt-2"
                            >
                                <font-awesome-icon :icon="['far', 'trash-can']" />
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
