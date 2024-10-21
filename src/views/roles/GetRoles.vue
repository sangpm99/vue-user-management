<script setup lang="ts">
import { ref, onBeforeMount, type Ref, type Reactive, reactive } from 'vue'
import Card from '@/components/Card.vue'
import CreateRole from '@/components/roles/CreateRole.vue'
import { useRoleStore } from '@/stores/roleStore'
import UpdateRoles from '@/components/roles/UpdateRoles.vue'

const roles: Ref<any> = ref()

const roleStore = useRoleStore()

const dialog: Ref<boolean> = ref(false)

const currentRole: Reactive<any> = reactive({
    roleId: '',
    roleName: ''
})

const getRoles = async () => {
    roles.value = await roleStore.getRoles()
}

onBeforeMount(getRoles)

const handleRemount = (value: boolean) => {
    if (value) {
        getRoles()
    }
}

const showDeleteRoleDialog = (roleId: string, roleName: string) => {
    currentRole.roleId = roleId
    currentRole.roleName = roleName
    dialog.value = true
}

const handleDelete = async (id: string) => {
    await roleStore.deleteRole(id)
    dialog.value = false
    getRoles()
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
                        roles.data.data?.itemsCount > 1
                            ? `${roles.data.data?.itemsCount} Roles`
                            : `${roles.data.data?.itemsCount} Role`
                    }}
                </h3>
            </div>
            <div class="col-2 d-flex justify-content-end">
                <CreateRole @isDone="handleRemount" />
            </div>
        </div>

        <div class="row gy-3 mt-2">
            <div class="col-4" v-for="(role, index) in roles.data.data.items" :key="index">
                <Card>
                    <div class="row my-card">
                        <div class="col-10">
                            <h3>{{ role.name }}</h3>
                            <p>
                                <span>{{ role.usersCount }}</span> users
                            </p>
                        </div>

                        <div class="col-2 my-nav">
                            <UpdateRoles :id="role.id" @isDone="handleRemount" />
                            <v-btn
                                color="error"
                                icon="mdi-delete"
                                variant="text"
                                density="comfortable"
                                @click="showDeleteRoleDialog(role.id, role.name)"
                            >
                            </v-btn>
                        </div>
                    </div>
                </Card>
            </div>
        </div>

        <v-dialog v-model="dialog" max-width="400">
            <v-card prepend-icon="mdi-help-circle-outline" title="Are you sure?">
                <p class="ms-5">
                    Sure about delete role <b>{{ currentRole.roleName }}</b> ?
                </p>
                <template v-slot:actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="error"
                        variant="elevated"
                        @click="handleDelete(currentRole.roleId)"
                    >
                        Yes
                    </v-btn>

                    <v-btn variant="elevated" color="grey" @click="dialog = false">Cancel</v-btn>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<style scoped>
.my-nav {
    opacity: 0;
    transition: all 0.25s ease;
}

.my-card:hover .my-nav {
    opacity: 1;
}
</style>
