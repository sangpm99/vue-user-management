<!-- <script setup lang="ts">
import { type Ref, ref, onBeforeMount, watch } from 'vue'
import { useRoleStore } from '@/stores/roleStore';

const props = defineProps<{ permissionsUnChanged?: Array<any> }>()

const roleStore = useRoleStore();

const permissionsSelected: Ref<any> = ref([])

const permissionSave: Ref<any> = ref([])

const items: Ref<any> = ref([])

const data: Ref<any> = ref([])

interface PermissionNode {
    label: string
    name: string
    children?: PermissionNode[]
}

const result: { [key: string]: PermissionNode[] } = {}

const addPermission = (permission: string) => {
    const parts = permission.split('.')
    const [, category, subCategory, action] = parts

    if (!result[category]) {
        result[category] = []
    }

    let subCategoryNode = result[category].find((node) => node.label === subCategory)
    if (!subCategoryNode) {
        subCategoryNode = { label: subCategory, name: subCategory, children: [] }
        result[category].push(subCategoryNode)
    }

    if (action) {
        subCategoryNode.children!.push({
            label: action,
            name: permission
        })
    }
}

onBeforeMount(async () => {
    const res = await roleStore.getPermissions();
    data.value = res.data.data;

    await Promise.all(data.value.map(addPermission));

    const transformedResult: PermissionNode[] = Object.entries(result).map(
        ([categoryName, children]) => ({
            label: categoryName,
            name: categoryName,
            children
        })
    );

    items.value = [
        {
            id: 1,
            name: 'All Permission',
            label: 'All Permission',
            children: [...transformedResult]
        }
    ]
})

watch(
    () => permissionsSelected.value,
    () => {
        permissionSave.value = permissionsSelected.value.map(item => item.name);
    },{immediate: true}
)

defineEmits(['return-permission-selected']);
</script>

<template>
    <v-card>
        <v-row>
            <v-col cols="4">
                <v-card-text>
                    <v-treeview
                        v-model:selected="permissionsSelected"
                        :items="items"
                        true-icon="mdi-checkbox-marked"
                        false-icon="mdi-checkbox-blank-outline"
                        indeterminate-icon="mdi-minus-box-outline"
                        item-title="label"
                        item-value="name"
                        select-strategy="classic"
                        return-object
                        selectable
                    ></v-treeview>
                </v-card-text>
            </v-col>

            <v-divider vertical></v-divider>

            <v-col cols="8">
                <v-card-text>
                    <div
                        v-if="permissionsSelected.length === 0"
                        key="title"
                        class="text-h6 font-weight-light text-grey pa-4 text-center"
                    >
                        Select Permissions
                    </div>

                    <v-scroll-x-transition group hide-on-leave>
                        <v-chip
                            v-for="(selection, i) in permissionsSelected"
                            :key="i"
                            :text="selection.name"
                            class="ma-1"
                            color="grey"
                            prepend-icon="mdi-check"
                            size="small"
                        ></v-chip>
                    </v-scroll-x-transition>
                </v-card-text>
            </v-col>
        </v-row>
    </v-card>
</template>

<style>
.v-card-text
    > .v-list
    > .v-list-group
    > .v-list-group__items
    > .v-list-group
    > .v-list-group__items
    > .v-list-group
    > .v-list-group__items
    > .v-list-item
    .v-list-item__prepend {
    margin-left: 2rem;
}
</style> -->
