<script setup lang="ts">
import { watch, reactive, ref, type Ref, type Reactive, onBeforeMount } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRoleStore } from '@/stores/roleStore'
import { type UserData } from '@/types/UserData'
import { getDepartment } from '@/stores/departmentStore'

const dialog: Ref<boolean> = ref(false)
const dialogInvalid: Ref<boolean> = ref(false)
const dialogInvalidContent: Ref<string> = ref('')

const props = defineProps<{ id: string }>()

const userStore = useUserStore()
const roleStore = useRoleStore()

const department: string[] = getDepartment()

defineEmits(['is-done'])

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
    const res = await userStore.updateUserFull(
        user.id,
        user.email,
        user.userName,
        user.fullName,
        user.address,
        user.phoneNumber,
        user.department,
        user.roles
    )
    if (res) {
        if (res.response.data.errors !== undefined) {
            const getErrors = res.response.data.errors
            dialogInvalidContent.value = Object.values(getErrors).flat().join(',')
            dialogInvalid.value = true
        } else {
            dialogInvalidContent.value = res.response.data.message
            dialogInvalid.value = true
        }
    } else {
        dialog.value = false
    }
}

const rules = [(value: string) => !!value || 'You must enter this field']

const rulesEmail = [
    (value: string) => !!value || 'You must enter this field',
    (value: string) =>
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value) ||
        'The Email field is not a valid e-mail address.'
]
</script>

<template>
    <div class="d-inline">
        <v-dialog v-model="dialog" max-width="800">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                    color="primary"
                    size="x-small"
                    v-bind="activatorProps"
                    :disabled="currentUser?.id === id ? true : false"
                >
                    Edit
                </v-btn>
            </template>

            <v-card title="Edit User">
                <v-card-text>
                    <v-row dense>
                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                label="Email Address*"
                                :rules="rulesEmail"
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
                                label="Full Name"
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
                        append-icon="mdi-content-save"
                    >
                        Save
                    </v-btn>
                    <v-btn color="grey" @click="dialog = false" variant="elevated"> Cancel </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogInvalid" max-width="700">
            <v-card>
                <v-alert icon="mdi-alert" color="error" title="Fail To Update User" variant="tonal">
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
