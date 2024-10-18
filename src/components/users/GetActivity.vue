<script setup lang="ts">
import { ref, type Ref, watch } from 'vue'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useUserStore } from '@/stores/userStore';
import RevokeToken from '@/components/users/RevokeToken.vue';
import { delCookie } from '@/stores/userCookie';

library.add(faXmark)

const dialog: Ref<boolean> = ref(false)

const confirmDialog: Ref<boolean> = ref(false)

const isLogin: Ref<boolean> = ref(false)

const props = defineProps<{id: string}>();

const userStore = useUserStore();

const activities: Ref<any> = ref([]);

const reMountDialog: Ref<number> = ref(0);

watch(
    [() => dialog.value, () => reMountDialog.value],
    async (newValue) => {
        if(newValue) {
            const res = await userStore.getActivities(props.id);
            console.log('status code: ', res)
            if(!res) {
                dialog.value = false;
                confirmDialog.value = false;
                isLogin.value = true;
            } else {
                const items = JSON.parse(res.data)
                activities.value = [...items];
            }
        }
})

const formatDate = (timeStamp: string) => {
    const date = new Date(Number(timeStamp) * 1000);

    return date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}

const handleRevokeAllTokens = async() => {
    confirmDialog.value = false;
    const res = await userStore.revokeAllTokens(props.id);
    if(res) {
        reMountDialog.value++;
    }
}

const directToSignIn = () => {
    delCookie('User Data');
}

</script>

<template>
    <v-dialog v-model="dialog" max-width="90%">
        <template v-slot:activator="{ props: activatorProps }">
            <button class="badge bg-info" v-bind="activatorProps">
                Activities
            </button>
        </template>


        <v-card title="Activities" >
            <v-card-text>
                <v-table
                    height="600px"
                    fixed-header
                >
                    <thead>
                    <tr>
                        <th class="text-left">
                        Sign In At
                        </th>
                        <th class="text-left">
                        Expires At
                        </th>
                        <th class="text-left">
                        IP
                        </th>
                        <th class="text-left">
                        Blocked
                        </th>
                        <th class="text-left">
                        User Agent
                        </th>
                        <th class="text-left">
                        Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        v-for="(item, index) in activities"
                        :key="index"
                    >
                        <td class="signInAt">{{ formatDate(item.SignedInAt) }}</td>
                        <td class="expiresAt">{{ formatDate(item.ExpiresAt) }}</td>
                        <td>{{ item.IpAddress }}</td>
                        <td>
                            <span :class="item.Blocked ? 'badge bg-danger' : 'badge bg-success'">
                                {{ item.Blocked ? 'Blocked' : 'Active' }}
                            </span>
                        </td>
                        <td>{{ item.UserAgent }}</td>
                        <td class="revoke">
                            <RevokeToken
                                v-if="(id !== undefined) && (item.SignedInAt !== undefined)"
                                :class="item.Blocked ? 'badge disabled' : 'badge bg-warning'"
                                :id="id"
                                :signInAt="item.SignedInAt"
                                @isDone="(value) => {if (value) reMountDialog++}"
                            />
                        </td>
                    </tr>
                    </tbody>
                </v-table>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>

                <button class="btn btn-danger" @click="confirmDialog = true">
                    Revoke All
                </button>
                <button class="btn btn-secondary" @click="dialog = false">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </button>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog
      v-model="confirmDialog"
      max-width="400"
      persistent
    >
      <v-card
        prepend-icon="mdi-help-circle-outline"
        text="Sure about revoking all of this user's tokens?"
        title="Are you sure?"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <button class="btn btn-danger" @click="handleRevokeAllTokens">
            Yes
          </button>

          <button class="btn btn-secondary" @click="confirmDialog = false">
            Cancel
          </button>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="isLogin"
      max-width="400"
      persistent
    >
      <v-card
        title="Your session has expired!"
        text="Please sign in again to use this feature"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <button class="btn btn-primary" @click="directToSignIn">
            Sign In
          </button>
        </template>
      </v-card>
    </v-dialog>
</template>

<style scoped>
.signInAt {
    width: 15%;
}
.expiresAt {
    width: 15%;
}
.revoke {
    width: 5%;
}
</style>