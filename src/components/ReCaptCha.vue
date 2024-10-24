<script lang="ts" setup>
import { type Ref, ref } from 'vue';
import { RecaptchaV2 } from 'vue3-recaptcha-v2'

const props = defineProps<{reCaptchaReceive: string | null}>();

const reCaptcha: Ref<string | null> = ref(props.reCaptchaReceive);

// Ham goi khi khoi tao
const handleWidgetId = (widgetId: number) => {}

// Ham goi khi loi
const handleErrorCalback = () => {}

// Ham duoc goi khi het han
const handleExpiredCallback = () => {
    reCaptcha.value = null;
}

// Ham duoc goi khi click
const handleLoadCallback = (response: unknown) => {
    if(typeof(response) === 'string') {
        reCaptcha.value = response;
    } else {
        reCaptcha.value = JSON.stringify(response);
    }
}

</script>

<template>
    <RecaptchaV2
        v-model="reCaptcha"
        @widget-id="handleWidgetId"
        @error-callback="handleErrorCalback"
        @expired-callback="handleExpiredCallback"
        @load-callback="handleLoadCallback"
    />
</template>