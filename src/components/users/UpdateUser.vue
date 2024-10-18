<script setup lang="ts">
import { onBeforeMount, reactive, ref, type Ref, type Reactive } from 'vue'
import { faPenToSquare, faTrashCan, faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import getNames from '@/apis/roles/getNames'
import getUser from '@/apis/users/getUser'
import { useUserStore } from '@/stores/userStore';
library.add(faPenToSquare, faTrashCan, faFloppyDisk, faXmark)
import Swal from 'sweetalert2'

const dialog: Ref<boolean> = ref(false)

const roles: Ref<Array<any>> = ref([])

const rules = [(value: string) => !!value || 'You must enter this field']

const props = defineProps<{id: string}>();

const userStore = useUserStore();

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

onBeforeMount(async () => {
    const getRoles = await getNames()
    for (let i = 0; i < getRoles?.data?.items.length; i++) {
        roles.value.push(getRoles?.data?.items[i]?.name)
    }

    const getUserById = await getUser(props.id)
    if(getUserById) {
        user.id = getUserById.data.id;
        user.email = getUserById.data.email;
        user.userName = getUserById.data.userName;
        user.phoneNumber = getUserById.data.phoneNumber;
        user.fullName = getUserById.data.fullName;
        user.address = getUserById.data.address;
        user.department = getUserById.data.department;
        user.roles = getUserById.data.roles;
    }
})

const department: Array<string> = [
    'CEO',
    'ASSISTANCE',
    'SALE',
    'DESIGN',
    'DESIGN_MANAGER',
    'ACCOUNTING',
    'FULFILLMENT',
    'CUSTOMER_SERVICE',
    'SUPPORT',
    'IT',
    'BUILD_ACC'
]

const handleSave = async () => {
    const response = await userStore.updateUser(
        user.id,
        user.email,
        user.userName,
        user.fullName,
        user.address,
        user.phoneNumber,
        user.department,
        user.roles
    )
    if (response) {
        window.location.reload()
        dialog.value = false
    } else {
        dialog.value = false
        Swal.fire({
        title: 'Fail',
        text: 'Username Or Email is Exist, please try another',
        icon: 'error'})
    }
}
</script>

<template>
    <v-dialog v-model="dialog" max-width="800">
        <template v-slot:activator="{ props: activatorProps }">
            <button :class="userStore.getCurrentUser?.data?.id === id ? 'badge disabled' : 'badge bg-primary'" v-bind="activatorProps">
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

                <button class="btn btn-success" @click="handleSave">
                    <font-awesome-icon :icon="['far', 'floppy-disk']" />
                </button>
                <button class="btn btn-secondary" @click="dialog = false">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </button>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>