<template>
  <div :style="backgroundStyle">
    <div
      class="flex flex-wrap w-full justify-center py-20"
      :class="backdropClass"
    >
      <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
        <div class="flex justify-center md:justify-end -mt-16">
          <img
            :alt="profile.nickname"
            :src="profile.avatarUrl"
            class="w-20 h-20 object-cover rounded-full border-2 border-white-500"
          >
        </div>
        <h2 class="text-gray-800 text-3xl font-semibold">
          {{ profile.nickname }}
        </h2>
        <p class="mt-6 text-gray-600">
          {{ profile.email }}
        </p>
        <div class="flex justify-end mt-8">
          <button
            class="flex items-center justify-center bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full mr-2"
            @click="onClickRedirectRooms"
          >
            管理社群
          </button>
          <button
            class="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            @click="onClickRedirectSara"
          >
            設定帳號
          </button>
        </div>
      </div>
    </div>
    <toast-modal v-model="statusMessage" />
  </div>
</template>

<script setup>
import ToastModal from "../components/ToastModal.vue";

import {useRouter} from "vue-router";
import {redirectLogin, useProfile} from "../plugins/profile.js";

const router = useRouter();
const profile = useProfile();

const onClickRedirectRooms = () => {
  router.push("/rooms");
};

const onClickRedirectSara = () => {
  redirectLogin(false);
};
</script>
