<script setup lang="ts">
import Card from '@/components/Card.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPenToSquare, faTrashCan  } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faPenToSquare, faTrashCan);

</script>

<template>
    <div class="container">
        <h1>Roles List</h1>
        <div class="row">
            <div class="col-4">
                <Card>
                    <div class="row">
                        <div class="col-9">
                            <h3>Title</h3>
                            <p><span>4</span>users</p>
                        </div>

                        <div class="col-2">
                            <button class="btn btn-primary w-100">
                                <font-awesome-icon :icon="['far', 'pen-to-square']" />
                            </button>
                            <button class="btn btn-danger w-100">
                                <font-awesome-icon :icon="['far', 'trash-can']" />
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>