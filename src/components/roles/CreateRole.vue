<script lang="ts" setup>
import { useRoleStore } from '@/stores/userStore';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { ref, onBeforeMount, type Ref } from 'vue'

library.add(faFloppyDisk)

const roleStore = useRoleStore();

const dialog: Ref<boolean> = ref(false)

const roleName: Ref<string> = ref('')

const permissions: Ref<any> = ref()

const permissionsSelected: Ref<any> = ref([])

const rules = [
    (value: string) => !!value || 'You must enter a role name',
    (value: string) => (value || '').length <= 20 || 'Max 20 characters'
]

const handleSave = async () => {
    const res = await roleStore.createRole(roleName.value, permissionsSelected.value);
    console.log(res);
    if(res) {
        dialog.value = false;
        return true;
    }
    return false;
}

const handleClose = () => {
    permissionsSelected.value = []
    dialog.value = false
}

onBeforeMount(async () => {
    const res = await roleStore.getPermissions();
    permissions.value = res.data;
})

</script>

<template>
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

                <button class="btn btn-success" @click="async() => $emit('is-done', await handleSave())">
                    <font-awesome-icon :icon="['far', 'floppy-disk']" />
                </button>
                <button class="btn btn-secondary" @click="handleClose">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </button>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
