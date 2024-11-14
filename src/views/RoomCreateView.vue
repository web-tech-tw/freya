<template>
  <div>
    <div class="flex flex-wrap w-full justify-center bg-lime-600 py-20">
      <div
        v-if="step === 1"
        class="max-w-md mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg"
      >
        <h2 class="text-gray-800 text-3xl font-semibold">
          建立社群資訊
        </h2>
        <p class="mt-2 text-gray-600">
          嗨！歡迎您採用 Freya 芙蕾雅，煩請您填寫以下資料，以建立您的社群資訊。
        </p>
        <p class="mt-2 text-gray-600">
          建立社群即同意我們的
          <router-link
            to="/terms"
            class="text-sky-600 hover:text-sky-500"
          >
            服務條款
          </router-link>
          。
        </p>
        <div class="flex justify-end mt-4">
          <button
            class="flex items-center justify-center bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full"
            @click="onClickNext"
          >
            我同意，下一步
          </button>
        </div>
      </div>
      <div
        v-else-if="step === 2"
        class="max-w-md md:w-1/2 mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg"
      >
        <h2 class="text-gray-800 text-3xl font-semibold">
          建立社群資訊
        </h2>
        <p class="mt-2 text-gray-600">
          請輸入您的社群邀請網址：
        </p>
        <div class="w-full mt-2 text-gray-600 flex rounded bg-white shadow-md">
          <input
            v-model="pageUrl"
            placeholder="https://line.me/ti/g2/J7bTfoHgmfgc42C9baJNs2gwH00kAMd9QfJDsQ"
            class="w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:outline-none"
            type="text"
          >
        </div>
        <div class="flex justify-end mt-4">
          <button
            class="flex items-center justify-center bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full"
            @click="onClickRequest"
          >
            <loading-circle-icon
              v-if="isLoad"
              class="h-6 w-6 animate-spin"
            />
            <span v-else>下一步</span>
          </button>
        </div>
      </div>
      <div
        v-else-if="step === 3"
        class="max-w-md mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg"
      >
        <h2 class="text-gray-800 text-3xl font-semibold">
          {{ roomProfile.label }}
        </h2>
        <p class="mt-2 text-gray-600">
          這是您的社群嗎？請複製以下訊息，並貼到您的社群簡介欄位中。
        </p>
        <p class="mt-2 text-gray-600">
          <textarea
            :value="verifyMessage"
            readonly
          />
        </p>
        <div class="flex justify-end mt-4">
          <button
            class="flex items-center justify-center bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full"
            @click="onClickVerify"
          >
            <loading-circle-icon
              v-if="isLoad"
              class="h-6 w-6 animate-spin"
            />
            <span v-else>驗證所有權</span>
          </button>
        </div>
      </div>
      <div
        v-else-if="step === 4"
        class="max-w-md mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg"
      >
        <h2 class="text-gray-800 text-3xl font-semibold">
          歡迎！
        </h2>
        <p class="mt-2 text-gray-600">
          {{ roomProfile.label }}
        </p>
        <div class="flex justify-end mt-4">
          <button
            class="flex items-center justify-center bg-lime-700 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded-full"
            @click="onClickRefresh"
          >
            查看社群
          </button>
        </div>
      </div>
      <div
        v-else
        class="max-w-md mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg"
      >
        <h2 class="text-gray-800 text-3xl font-semibold">
          錯誤
        </h2>
        <p class="mt-2 text-gray-600">
          未預期的錯誤發生，請重新整理頁面。
        </p>
        <div class="flex justify-end mt-4">
          <button
            class="flex items-center justify-center bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full"
            @click="onClickRefresh"
          >
            重新整理
          </button>
        </div>
      </div>
    </div>
    <toast-modal v-model="statusMessage" />
  </div>
</template>

<script setup>
import {ref, computed, reactive} from "vue";
import {useClient} from "../clients/freya.js";

import ToastModal from "../components/ToastModal.vue";
import LoadingCircleIcon from "../components/LoadingCircleIcon.vue";

const step = ref(1);
const pageUrl = ref("");

const isLoad = ref(false);

const code = ref("");
const hash = ref("");

const statusMessage = ref("");
const verifyMessage = computed(() => {
  return `${code.value}`;
});

const roomProfile = reactive({
  label: "",
  members: "",
  description: "",
  backgroundImage: "",
});

const onClickNext = () => {
  step.value += 1;
};

const onClickRefresh = () => {
  location.reload();
};

const onClickRequest = async () => {
  if (!pageUrl.value) {
    statusMessage.value = "請輸入社群加入網址。";
    return;
  }

  isLoad.value = true;
  try {
    const client = useClient();
    const result = await client.post("rooms", {
      json: {
        url: pageUrl.value,
      },
    }).json();

    Object.assign(roomProfile, result.room);
    code.value = result.code;
    hash.value = result.hash;

    step.value += 1;
  } catch (error) {
    statusMessage.value = error.message;
  }
  isLoad.value = false;
};

const onClickVerify = async () => {
  isLoad.value = true;
  try {
    const client = useClient();
    await client.patch("rooms", {
      json: {
        url: pageUrl.value,
        code: code.value,
        hash: hash.value,
      },
    });
    step.value += 1;
  } catch (error) {
    statusMessage.value = error.message;
  }
  isLoad.value = false;
};
</script>
