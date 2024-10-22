<script setup lang="ts">
import { ref, type Ref, watch, watchEffect } from 'vue'
import { useUserStore } from '@/stores/userStore'
import RevokeToken from '@/components/users/RevokeToken.vue'

const dialog: Ref<boolean> = ref(false)

const confirmDialog: Ref<boolean> = ref(false)

const props = defineProps<{ id: string }>()

const userStore = useUserStore()

const activities: Ref<any> = ref([])

const reMountDialog: Ref<number> = ref(0)

const isRevoke = () => {
    reMountDialog.value += 1
}

watch([() => dialog.value, () => reMountDialog.value], async (newValue, oldValue) => {
    const res = await userStore.getActivities(props.id)

    if (res) {
        if (res.status) {
            switch (true) {
                case res.status === 401:
                    window.location.href = '/authorize/signin'
                    break
                default:
                    break
            }
        }
        const items = JSON.parse(res.data.data)
        activities.value = [...items]
    }
})

const formatDate = (timeStamp: string) => {
    const date = new Date(Number(timeStamp) * 1000)

    return date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })
}

const handleRevokeAllTokens = async () => {
    confirmDialog.value = false
    await userStore.revokeAllTokens(props.id)
    reMountDialog.value++
}
</script>

<template>
    <v-dialog v-model="dialog" max-width="90%">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn size="x-small" variant="elevated" color="info" v-bind="activatorProps"
                >Activities</v-btn
            >
        </template>

        <v-card title="Activities">
            <v-card-text>
                <v-table height="600px" fixed-header>
                    <thead>
                        <tr>
                            <th class="text-left">Sign In At</th>
                            <th class="text-left">Expires At</th>
                            <th class="text-left">IP</th>
                            <th class="text-left">Blocked</th>
                            <th class="text-left">User Agent</th>
                            <th class="text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in activities" :key="index">
                            <td class="signInAt">{{ formatDate(item.SignedInAt) }}</td>
                            <td class="expiresAt">{{ formatDate(item.ExpiresAt) }}</td>
                            <td>{{ item.IpAddress }}</td>
                            <td>
                                <v-btn
                                    size="x-small"
                                    variant="tonal"
                                    :color="item.Blocked ? 'error' : 'success'"
                                >
                                    {{ item.Blocked ? 'Blocked' : 'Active' }}
                                </v-btn>
                            </td>
                            <td>{{ item.UserAgent }}</td>
                            <td class="revoke">
                                <RevokeToken
                                    v-if="id !== undefined && item.SignedInAt !== undefined"
                                    :id="id"
                                    :signInAt="item.SignedInAt"
                                    :blocked="item.Blocked"
                                    @is-done="isRevoke"
                                />
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="error" variant="elevated" @click="confirmDialog = true"
                    >Revoke All</v-btn
                >
                <v-btn color="grey" variant="elevated" @click="dialog = false"> Cancel </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="confirmDialog" max-width="400" persistent>
        <v-card
            prepend-icon="mdi-help-circle-outline"
            text="Sure about revoking all of this user's tokens?"
            title="Are you sure?"
        >
            <template v-slot:actions>
                <v-spacer></v-spacer>

                <v-btn variant="elevated" color="error" @click="handleRevokeAllTokens">Yes</v-btn>

                <v-btn variant="elevated" color="grey" @click="confirmDialog = false">Cancel</v-btn>
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
