<script setup lang="ts">
import { reactive, ref, type Ref, type Reactive, watch, onBeforeMount } from 'vue'
import { faPenToSquare, faTrashCan, faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useRoleStore } from '@/stores/roleStore'
import { useUserStore } from '@/stores/userStore'
library.add(faPenToSquare, faTrashCan, faFloppyDisk, faXmark)
import { useDepartmentStore } from '@/stores/departmentStore'

const dialog: Ref<boolean> = ref(false)

const rules = [(value: string) => !!value || 'You must enter this field']

const userStore = useUserStore()
const roleStore = useRoleStore()
const departmentStore = useDepartmentStore()

const department: string[] = departmentStore.getDepartment()

const roles: Ref<any> = ref([])

watch(dialog, async (dialogIsOpen) => {
    if (dialogIsOpen) {
        const getRoles = await roleStore.getRolesName()
        roles.value = getRoles
    }
})

const rulesPassword = [
    (value: string) => !!value || 'You must enter this field',
    (value: string) => /[A-Z]/.test(value) || 'Password must contain a capital letter',
    (value: string) => /[0-9]/.test(value) || 'Password must contain a number',
    (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Password must contain a symbol',
    (value: string) => value.length >= 8 || 'You must enter at least 8 characters'
]

const rulesConfirmPassword = [
    (value: string) => !!value || 'You must enter this field',
    (value: string) => value === user.password || 'Confirm Password and New Password must be match'
]

const user: Reactive<any> = reactive({
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    address: '',
    phoneNumber: '',
    department: '',
    roles: []
})

const handleSave = async () => {
    await userStore.createUser(
        user.email,
        user.userName,
        user.password,
        user.confirmPassword,
        user.fullName,
        user.phoneNumber,
        user.address,
        user.department,
        user.roles
    )
    dialog.value = false
}
</script>

<template>
    <v-dialog v-model="dialog" max-width="800">
        <template v-slot:activator="{ props: activatorProps }">
            <!-- <span v-tooltip="'Add New User'"></span> -->
            <v-btn color="success" v-bind="activatorProps">
                Add New User
            </v-btn>
        </template>

        <v-card title="Add New User">
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
                            label="Password*"
                            :rules="rulesPassword"
                            v-model="user.password"
                            type="password"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-text-field
                            variant="solo"
                            label="Confirm Password*"
                            v-model="user.confirmPassword"
                            :rules="rulesConfirmPassword"
                            type="password"
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

                <v-btn
                    color="success"
                    variant="elevated"
                    @click="async () => $emit('is-done', await handleSave())"
                >
                    Save
                </v-btn>
                <v-btn 
                    color="grey"
                    variant="elevated"
                    @click="dialog = false">
                    Trash
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
