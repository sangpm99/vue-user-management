<script setup lang="ts">
	import {type Ref, ref, onBeforeMount} from 'vue';
	const tree = ref([]);

	const items: Ref<any> = ref([]);

    const data = [
        "Permission.Identity.User.Read",
        "Permission.Identity.User.Create",
        "Permission.Identity.User.Update",
        "Permission.Identity.User.Delete",
        "Permission.Identity.Role.Read",
        "Permission.Identity.Role.Create",
        "Permission.Identity.Role.Update",
        "Permission.Identity.Role.Delete"
    ];

	interface PermissionNode {
		label: string;
		name: string;
		children?: PermissionNode[];
	}

	const result: { [key: string]: PermissionNode[] } = {};

	function addPermission(permission: string) {
		const parts = permission.split(".");
		const [ , category, subCategory, action] = parts;

		if (!result[category]) {
			result[category] = [];
		}

		let subCategoryNode = result[category].find(node => node.label === subCategory);
		if (!subCategoryNode) {
			subCategoryNode = { label: subCategory, name: subCategory, children: [] };
			result[category].push(subCategoryNode);
		}

		if (action) {
			subCategoryNode.children!.push({
				label: action,
				name: permission,
			});
		}
	}

	data.forEach(addPermission);

	const transformedResult: PermissionNode[] = Object.entries(result).map(([categoryName, children]) => ({
		label: categoryName,
		name: categoryName,
		children,
	}));
	
	onBeforeMount(() => {
		items.value = [
			{
				id: 1,
				name: 'All Permission',
				label: 'All Permission',
				children: [
					{
						...transformedResult[0]
					}
				]
			}
		]
	})
</script>

<template>
	<v-card>
	  <v-row>
		<v-col>
		  <v-card-text>
			<v-treeview
			  v-model:selected="tree"
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
  
		<v-col
		  cols="12"
		  md="6"
		>
		  <v-card-text>
			<div
			  v-if="tree.length === 0"
			  key="title"
			  class="text-h6 font-weight-light text-grey pa-4 text-center"
			>
			  Select Permissions
			</div>
  
			<v-scroll-x-transition
			  group
			  hide-on-leave
			>
			  <v-chip
				v-for="(selection, i) in tree"
				:key="i"
				:text="selection.name"
				class="ma-1"
				color="grey"
				prepend-icon="mdi-beer"
				size="small"
			  ></v-chip>
			</v-scroll-x-transition>
		  </v-card-text>
		</v-col>
	  </v-row>
  
	</v-card>
  </template>

<style>
	.v-card-text>
	.v-list>
	.v-list-group>
	.v-list-group__items>
	.v-list-group>
	.v-list-group__items>
	.v-list-group>
	.v-list-group__items>
	.v-list-item .v-list-item__prepend
	{
		margin-left: 2rem;
	}
</style>