<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore';
import { ref, type Ref } from 'vue'
const confirmDialog: Ref<boolean> = ref(false)

const useStore = useUserStore();

const props = defineProps<{id: string, signInAt: string}>();

const handleRevokeToken = async () => {
    confirmDialog.value = false;
    const res = await useStore.revokeToken(props.id, props.signInAt)
    if(res.success) {
        return true;
    }
    return false;
}

</script>

<template>
    <button :class="[$attrs.class]" @click="confirmDialog = true">Revoke</button>

    <v-dialog
      v-model="confirmDialog"
      max-width="400"
      persistent
    >
      <v-card
        prepend-icon="mdi-help-circle-outline"
        text="Are you sure you want to revoke this tokens?"
        title="Are you sure?"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <button class="btn btn-danger" @click=" async () => $emit('is-done', await handleRevokeToken())">Yes</button>

          <button class="btn btn-secondary" @click="confirmDialog = false">
            Cancel
          </button>
        </template>
      </v-card>
    </v-dialog>
</template>