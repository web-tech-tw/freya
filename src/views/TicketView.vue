<template>
  <div :style="backgroundStyle">
    <div
      v-if="isDead"
      class="flex flex-wrap w-full justify-center bg-white py-20"
    >
      <div class="text-center text-red-500">
        發生錯誤
      </div>
    </div>
    <div
      v-else-if="isLoad"
      class="flex flex-wrap w-full justify-center bg-white py-20"
    >
      <div class="flex justify-center my-16">
        <loading-circle-icon class="h-8 w-8 animate-spin text-lime-600" />
      </div>
    </div>
    <div
      v-else
      class="flex flex-wrap w-full justify-center py-20"
      :class="backdropClass"
    >
      <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
        <div class="flex justify-center md:justify-end -mt-16">
          <img
            :alt="roomData.label"
            :src="roomData.backgroundImage"
            class="w-20 h-20 object-cover rounded-full border-2 border-white-500"
          >
        </div>
        <h2 class="text-gray-800 text-3xl font-semibold">
          {{ roomData.label }}
          <span class="text-sm font-normal">
            {{ roomCode }}
          </span>
        </h2>
        <div v-if="isSubmmited">
          <p class="mt-6 text-gray-600">
            請複製這份代碼，再貼上到OpenChat的審核答案內：
          </p>
          <div class="w-full my-4 text-gray-600 flex rounded bg-white shadow-md">
            <input
              :value="submissionCode"
              class="w-full border-none bg-transparent px-4 py-3 text-gray-900 outline-none focus:outline-none text-gray-500"
              type="text"
              readonly
            >
            <button
              title="複製"
              class="m-2 rounded px-4 py-2 font-semibold"
              @click="onClickCopy"
            >
              <check-icon
                v-if="isCopy"
                class="h-6 w-6"
              />
              <document-duplicate-icon
                v-else
                class="h-6 w-6"
              />
            </button>
          </div>
          <div class="flex justify-end mt-8">
            <button
              class="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              @click="onClickRedirect"
            >
              前往 OpenChat 界面貼上代碼
            </button>
          </div>
        </div>
        <div v-else>
          <p
            class="mt-6 text-gray-600"
            v-html="descriptionHtml"
          />
          <div class="checkbox my-3">
            <div
              id="captcha"
              data-theme="light"
            />
          </div>
          <div class="flex justify-end mt-8">
            <button
              class="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              @click="onSubmit"
            >
              <loading-circle-icon
                v-if="isLoadSubmit"
                class="h-6 w-6 animate-spin"
              />
              <span v-else>加入社群</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <toast-modal v-model="statusMessage" />
  </div>
</template>

<script setup>
import {ref, reactive, computed, onMounted} from "vue";

import {
  CheckIcon,
  DocumentDuplicateIcon,
} from "@heroicons/vue/24/outline";

import LoadingCircleIcon from "../components/LoadingCircleIcon.vue";
import ToastModal from "../components/ToastModal.vue";

import {useRoute} from "vue-router";
import {useClient} from "../clients/freya.js";
import {useTurnstile} from "../plugins/turnstile.js";

const route = useRoute();
const client = useClient();
const turnstile = useTurnstile();

const {
  roomCode,
} = route.params;

const isLoad = ref(false);
const isDead = ref(false);

const isLoadSubmit = ref(false);
const isCopy = ref(false);

const statusMessage = ref("");
const captchaToken = ref("");
const submissionCode = ref("");

const roomData = reactive({
  label: "",
  description: "",
  backgroundImage: "",
  pageUrl: "",
});

const isSubmmited = computed(() => {
  return submissionCode.value !== "";
});

const descriptionHtml = computed(() => {
  const escapeMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;",
  };
  const {description} = roomData;
  return description?.
    replace(/[&<>"']/g, (i) => escapeMap[i]).
    replaceAll("\n", "<br />");
});

const backgroundStyle = computed(() => {
  const {backgroundImage} = roomData;
  return !!backgroundImage ? {
    backgroundImage: `url(${backgroundImage})`,
  } : {};
});

const backdropClass = computed(() => {
  const {backgroundImage} = roomData;
  return !!backgroundImage ? "backdrop-brightness-50" : "";
});

const onClickCopy = async () => {
  if (!navigator.clipboard) {
    statusMessage.value = "您的瀏覽器不支援複製功能";
    return;
  }

  try {
    await navigator.clipboard.
      writeText(submissionCode.value);
    statusMessage.value = "已複製代碼";
    isCopy.value = true;
    setTimeout(() => {
      isCopy.value = false;
    }, 3000);
  } catch (error) {
    statusMessage.value = "無法複製代碼";
    console.error(error);
  }
};

const onClickRedirect = () => {
  window.open(roomData.pageUrl, "_blank");
};

const onSubmit = async () => {
  if (!captchaToken.value) {
    statusMessage.value = "尚未完成系統驗證";
    return;
  }

  isLoadSubmit.value = true;
  const result = await client.post("submissions", {
    json: {
      captcha: captchaToken.value,
      roomCode,
    },
  }).json();
  submissionCode.value = result.code;
  isLoadSubmit.value = false;
};

onMounted(async () => {
  isLoad.value = true;
  try {
    const result = await client.get(`rooms/${roomCode}`).json();
    Object.assign(roomData, result);
  } catch (error) {
    isDead.value = true;
    console.error(error);
  }
  isLoad.value = false;

  if (!isDead.value) {
    turnstile.render("#captcha");
    captchaToken.value = await turnstile.token();
  }
});
</script>
