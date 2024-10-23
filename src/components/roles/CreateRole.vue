<script lang="ts" setup>
import { useRoleStore } from '@/stores/roleStore'
import { ref, onBeforeMount, type Ref } from 'vue'
const roleStore = useRoleStore()
const dialog: Ref<boolean> = ref(false)
const roleName: Ref<string> = ref('')
const permissions: Ref<any> = ref()
const permissionsSelected: Ref<any> = ref([])
const rules = [
    (value: string) => !!value || 'You must enter a role name',
    (value: string) => (value || '').length <= 20 || 'Max 20 characters'
]
const handleSave = async () => {
    await roleStore.createRole(roleName.value, permissionsSelected.value)
    dialog.value = false
    return true
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
    <v-dialog v-model="dialog" max-width="800" max-height="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn color="success" v-bind="activatorProps">Add New Roles</v-btn>
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
                            :items="permissions"
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
</template>