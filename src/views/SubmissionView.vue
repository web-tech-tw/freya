<template>
  <div class="flex w-full justify-center bg-lime-600">
    <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
      <div
        id="captcha"
        data-theme="light"
      />
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {loadTurnstile} from "../plugins/turnstile";

const captchaToken = ref("");

onMounted(() => {
  loadTurnstile("#captcha", (token) => {
    captchaToken.value = token;
  });
});
</script>
