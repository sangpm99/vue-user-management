<script setup lang="ts">
import { ref, onBeforeMount, type Ref, computed } from 'vue'
import Card from '@/components/Card.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPenToSquare, faTrashCan, faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import getRoles from '@/apis/roles/getRoles'
import CreateRole from '@/components/roles/CreateRole.vue'
import getPermissions from '@/apis/roles/getPermissions'

library.add(faPenToSquare, faTrashCan, faFloppyDisk, faXmark)

const roles: Ref<any> = ref()

const dialog: Ref<boolean> = ref(false)

const roleName: Ref<string> = ref('')

const permissions: Ref<any> = ref()

const permissionsSelected: Ref<any> = ref([])

onBeforeMount(async () => {
    roles.value = await getRoles()
    permissions.value = await getPermissions()
})

const rules = [
    (value: string) => !!value || 'You must enter a role name',
    (value: string) => (value || '').length <= 20 || 'Max 20 characters'
]

const onSave = async () => {
    console.log(permissionsSelected.value)
}

const onClose = () => {
    permissionsSelected.value = []
    dialog.value = false
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
                <v-dialog v-model="dialog" max-width="800" max-height="500">
                    <template v-slot:activator="{ props: activatorProps }">
                        <button class="btn btn-success" v-bind="activatorProps">
                            Add New Roles
                        </button>
                    </template>

                    <v-card title="Add New Role">
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="roleName"
                                        :rules="rules"
                                        :counter="20"
                                        variant="solo"
                                        label="Role Name*"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-autocomplete
                                        :items="permissions.data"
                                        v-model="permissionsSelected"
                                        label="Permissions"
                                        auto-select-first
                                        multiple
                                        variant="solo"
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <button class="btn btn-success" @click="onSave">
                                <font-awesome-icon :icon="['far', 'floppy-disk']" />
                            </button>
                            <button class="btn btn-secondary" @click="onClose">
                                <font-awesome-icon :icon="['fas', 'xmark']" />
                            </button>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </div>

        <div class="row gy-3">
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
