<script setup lang="ts">
import { watch, reactive, ref, type Ref, type Reactive, onBeforeMount } from 'vue'
import { faPenToSquare, faTrashCan, faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useUserStore } from '@/stores/userStore'
import { useRoleStore } from '@/stores/roleStore'
import { type UserData } from '@/types/UserData'
import { useDepartmentStore } from '@/stores/departmentStore'

library.add(faPenToSquare, faTrashCan, faFloppyDisk, faXmark)

const dialog: Ref<boolean> = ref(false)

const rules = [(value: string) => !!value || 'You must enter this field']

const props = defineProps<{ id: string }>()

const userStore = useUserStore()
const roleStore = useRoleStore()
const departmentStore = useDepartmentStore()

const department: string[] = departmentStore.getDepartment()

const roles: Ref<any> = ref([])

const user: Reactive<any> = reactive({
    id: '',
    email: '',
    userName: '',
    fullName: '',
    address: '',
    phoneNumber: '',
    department: '',
    roles: []
})

const currentUser: Ref<UserData | null> = ref(null)

watch(dialog, async (dialogIsOpen) => {
    if (dialogIsOpen) {
        const getRoles = await roleStore.getRolesName()
        roles.value = getRoles

        const getUserById = await userStore.getUser(props.id)
        if (getUserById.data.data) {
            user.id = getUserById.data.data.id
            user.email = getUserById.data.data.email
            user.userName = getUserById.data.data.userName
            user.phoneNumber = getUserById.data.data.phoneNumber
            user.fullName = getUserById.data.data.fullName
            user.address = getUserById.data.data.address
            user.department = getUserById.data.data.department
            user.roles = getUserById.data.data.roles
        }
    }
})

onBeforeMount(() => {
    currentUser.value = userStore.getCurrentUser()
})

const handleSave = async () => {
    await userStore.updateUser(
        user.id,
        user.email,
        user.userName,
        user.fullName,
        user.address,
        user.phoneNumber,
        user.department,
        user.roles
    )
    dialog.value = false;
}
</script>

<template>
    <v-dialog v-model="dialog" max-width="800">
        <template v-slot:activator="{ props: activatorProps }">
            <button
                :class="currentUser?.id === id ? 'badge disabled' : 'badge bg-primary'"
                v-bind="activatorProps"
            >
                Edit
            </button>
        </template>

        <v-card title="Edit User">
            <v-card-text>
                <v-row dense>
                    <v-col cols="6">
                        <v-text-field
                            variant="solo"
                            label="Email Address*"
                            :rules="rules"
                            v-model="user.email"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-text-field
                            variant="solo"
                            label="User Name*"
                            :rules="rules"
                            v-model="user.userName"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-text-field
                            variant="solo"
                            label="Full Name*"
                            :rules="rules"
                            v-model="user.fullName"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-text-field
                            variant="solo"
                            label="Address"
                            v-model="user.address"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-text-field
                            variant="solo"
                            label="Phone Number"
                            v-model="user.phoneNumber"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-autocomplete
                            label="Department"
                            auto-select-first
                            variant="solo"
                            :items="department"
                            v-model="user.department"
                        ></v-autocomplete>
                    </v-col>

                    <v-col cols="12" v-if="JSON.stringify(roles) !== '{}'">
                        <v-autocomplete
                            label="Roles"
                            auto-select-first
                            multiple
                            variant="solo"
                            :items="roles"
                            v-model="user.roles"
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
                <button class="btn btn-secondary" @click="dialog = false">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </button>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
