<script lang="ts" setup>
import { useRoleStore } from '@/stores/roleStore'
import { ref, onBeforeMount, type Ref } from 'vue'
import Permissions from '@/components/roles/Permissions.vue';

const roleStore = useRoleStore()

const dialog: Ref<boolean> = ref(false)
const dialogInvalid: Ref<boolean> = ref(false)
const dialogInvalidContent: Ref<string> = ref('')

const roleName: Ref<string> = ref('')

const permissions: Ref<any> = ref()

const permissionsSelected: Ref<any> = ref([])

defineEmits(['is-done'])

const rules = [
    (value: string) => !!value || 'You must enter a role name',
    (value: string) => (value || '').length <= 20 || 'Max 20 characters'
]

const handleSave = async () => {
    const res = await roleStore.createRole(roleName.value, permissionsSelected.value)

    if (res) {
        if (res.response.data.errors !== undefined) {
            const getErrors = res.response.data.errors
            dialogInvalidContent.value = Object.values(getErrors).flat().join(',')
            dialogInvalid.value = true
        } else {
            dialogInvalidContent.value = res.response.data.message
            dialogInvalid.value = true
        }
        return false
    } else {
        dialog.value = false
        return true
    }
}

const handleClose = () => {
    permissionsSelected.value = []
    dialog.value = false
}

onBeforeMount(async () => {
    const res = await roleStore.getPermissions()
    permissions.value = res.data.data
})
</script>

<template>
    <div class="d-inline">
        <v-dialog v-model="dialog" max-width="1200" max-height="800">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn color="success" v-bind="activatorProps">Add New Roles</v-btn>
            </template>

            <v-card title="Add New Role">
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12">
                            <span>Role Name *</span>
                            <v-text-field
                                v-model="roleName"
                                :rules="rules"
                                :counter="20"
                                variant="solo"
                            ></v-text-field>
                        </v-col>

                        <!-- <v-col cols="12">
                            <v-autocomplete
                                :items="permissions"
                                v-model="permissionsSelected"
                                label="Permissions"
                                auto-select-first
                                multiple
                                variant="solo"
                            ></v-autocomplete>
                        </v-col> -->

                        <v-col cols="12">
                            <span>Permission</span>
                            <Permissions />
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="success"
                        @click="async () => $emit('is-done', await handleSave())"
                        variant="elevated"
                    >
                        Save
                    </v-btn>
                    <v-btn color="grey" @click="handleClose" variant="elevated"> Cancel </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogInvalid" max-width="700">
            <v-card>
                <v-alert icon="mdi-alert" color="error" title="Fail To Create Role" variant="tonal">
                    <p
                        class="m-0"
                        v-for="(item, index) in dialogInvalidContent.split(',')"
                        :key="index"
                    >
                        {{ item }}
                    </p>
                </v-alert>
            </v-card>
        </v-dialog>
    </div>
</template>
