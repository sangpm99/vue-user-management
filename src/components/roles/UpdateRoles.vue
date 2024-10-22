<script setup lang="ts">
import { reactive, ref, type Reactive, type Ref } from 'vue'
import { useRoleStore } from '@/stores/roleStore'

const props = defineProps<{ id: string }>()
const dialog: Ref<boolean> = ref(false)
const dialogInvalid: Ref<boolean> = ref(false)
const dialogInvalidContent: Ref<string> = ref('')
const permissions: Ref<any> = ref()
const roleStore = useRoleStore()

defineEmits(['is-done'])

const rules = [
    (value: string) => !!value || 'You must enter a role name',
    (value: string) => (value || '').length <= 20 || 'Max 20 characters'
]

const role: Reactive<any> = reactive({
    id: '',
    name: '',
    permissions: []
})

const showEditDialog = async () => {
    const getPermissions = await roleStore.getPermissions()
    permissions.value = getPermissions?.data?.data
    const getRole = await roleStore.getRole(props.id)
    role.id = getRole?.data?.data?.id
    role.name = getRole?.data?.data?.name
    role.permissions = getRole?.data?.data?.permissions
}

const handleSave = async () => {
    const res = await roleStore.updateRole(role.id, role.name, role.permissions)
    if(res) {
        if(res.response.data.errors !== undefined) {
            const getErrors = res.response.data.errors;
            dialogInvalidContent.value = Object.values(getErrors).flat().join(',');
            dialogInvalid.value = true;
        } else {
            dialogInvalidContent.value = res.response.data.message;
            dialogInvalid.value = true;
        }
        return false;
    } else {
        dialog.value = false
        return true;
    }
}

const handleClose = () => {
    dialog.value = false
}
</script>

<template>
<div class="d-inline">
    <v-dialog v-model="dialog" max-width="800" max-height="500">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
                color="primary"
                v-bind="activatorProps"
                @click="showEditDialog"
                icon="mdi-pencil"
                variant="text"
                density="comfortable"
            >
            </v-btn>
        </template>

        <v-card title="Edit Role" v-if="role.id !== ''">
            <v-card-text>
                <v-row dense>
                    <v-col cols="12">
                        <v-text-field
                            v-model="role.name"
                            :rules="rules"
                            :counter="20"
                            variant="solo"
                            label="Role Name*"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-autocomplete
                            :items="permissions"
                            v-model="role.permissions"
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
                    variant="elevated"
                    color="primary"
                    @click="async () => $emit('is-done', await handleSave())"
                >
                    Update
                </v-btn>
                <v-btn variant="elevated" color="grey" @click="handleClose"> Cancel </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="dialogInvalid" max-width="700">
    <v-card>
        <v-alert
            icon="mdi-alert"
            color="error"
            title="Fail To Update Role"
            variant="tonal"
        >
        <p class="m-0" v-for="(item, index) in dialogInvalidContent.split(',')" :key="index">
            {{ item }}
        </p>
        </v-alert>
    </v-card>
</v-dialog>
</div>
</template>
