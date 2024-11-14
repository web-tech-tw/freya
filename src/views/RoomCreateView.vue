<template>
  <div :style="backgroundStyle">
    <div
      class="flex flex-wrap w-full justify-center py-20"
      :class="backdropClass"
    >
      <div
        v-if="step === 1"
        class="w-full md:w-2/3 mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg"
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
        <div class="flex justify-end mt-8">
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
        class="w-full md:w-2/3 mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg"
      >
        <h2 class="text-gray-800 text-3xl font-semibold">
          建立社群資訊
        </h2>
        <p class="mt-2 text-gray-600">
          請輸入您的社群邀請網址：
        </p>
        <div class="w-full my-8 text-gray-600 flex rounded bg-white shadow-md">
          <input
            v-model="roomData.pageUrl"
            placeholder="https://line.me/ti/g2/J7bTfoHgmfgc42C9baJNs2gwH00kAMd9QfJDsQ"
            class="w-full border-none bg-transparent px-4 py-3 text-gray-900 outline-none focus:outline-none text-gray-500"
            type="text"
          >
        </div>
        <div class="flex justify-end mt-8">
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
        class="w-full md:w-2/3 mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg"
      >
        <div class="flex justify-center md:justify-end -mt-16">
          <img
            :alt="roomData.label"
            :src="roomData.backgroundImage"
            class="w-20 h-20 object-cover rounded-full border-2 border-white-500"
          >
        </div>
        <h2 class="text-gray-800 text-3xl font-semibold">
          {{ roomData.label }}
        </h2>
        <p class="mt-2 text-gray-600">
          這是您的社群嗎？
        </p>
        <p class="mt-2 text-gray-600">
          請複製以下訊息，並貼到您的社群簡介欄位中：
        </p>
        <div class="w-full my-8 text-gray-600 flex rounded bg-white shadow-md">
          <textarea
            :value="verifyMessage"
            class="w-full border-none bg-transparent px-4 py-3 text-gray-900 outline-none focus:outline-none text-gray-500 resize-none"
            readonly
          />
          <button
            title="複製"
            class="m-2 rounded px-4 py-2 font-semibold"
            @click="onClickCopyVerifyMessage"
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
        <p class="mt-2 text-gray-600">
          這份訊息將用來引導申請人轉往使用 Freya 芙蕾雅系統加入您的社群。
        </p>
        <p class="mt-2 text-gray-600">
          同時用以驗證您對於該社群是否具有管理權限。
        </p>
        <div class="flex justify-end mt-8">
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
        class="w-full md:w-2/3 mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg"
      >
        <h2 class="text-gray-800 text-3xl font-semibold">
          歡迎加入芙蕾雅！<br>
          <span class="font-normal">
            {{ roomData.label }}
          </span>
        </h2>
        <div class="mt-2">
          <img
            :alt="roomData.label"
            :src="roomData.backgroundImage"
            class="w-20 h-20 object-cover rounded-full border-2 border-white-500"
          >
        </div>
        <p class="mt-2 text-gray-600">
          耶！感謝 {{ profile.nickname }}
        </p>
        <p class="mt-2 text-gray-600">
          恭喜您已經成功為
          {{ roomData.label }}
          設定 Freya 芙蕾雅，
          擺脫垃圾夢魘啦！
        </p>
        <div class="flex justify-end mt-8">
          <button
            class="flex items-center justify-center bg-lime-700 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded-full"
            @click="onClickRoomManage"
          >
            前往社群管理
          </button>
        </div>
      </div>
      <div
        v-else
        class="w-full md:w-2/3 mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg"
      >
        <h2 class="text-gray-800 text-3xl font-semibold">
          錯誤
        </h2>
        <p class="mt-2 text-gray-600">
          未預期的錯誤發生，請重新整理頁面。
        </p>
        <div class="flex justify-end mt-8">
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

import {useRouter} from "vue-router";
import {useClient} from "../clients/freya.js";
import {useProfile} from "../plugins/profile.js";

import {
  CheckIcon,
  DocumentDuplicateIcon,
} from "@heroicons/vue/24/outline";

import ToastModal from "../components/ToastModal.vue";
import LoadingCircleIcon from "../components/LoadingCircleIcon.vue";

const {
  VITE_FREYA_INTE_HOST: freyaInteHost,
} = import.meta.env;

const router = useRouter();
const profile = useProfile();

const isLoad = ref(false);
const isCopy = ref(false);

const step = ref(1);
const code = ref("");
const hash = ref("");

const statusMessage = ref("");
const verifyMessage = computed(() => {
  return `煩請前往：\n${freyaInteHost}/#/ti/g2/${code.value}\n` +
    "遵循流程取得加入代碼，並在此填入，感謝您\n" +
    "（⚠️請勿回覆加入代碼以外的答案）";
});

const roomData = reactive({
  code: "",
  label: "",
  members: "",
  description: "",
  backgroundImage: "",
  pageUrl: "",
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

const onClickNext = () => {
  step.value += 1;
};

const onClickRefresh = () => {
  location.reload();
};

const onClickRoomManage = () => {
  const {code: roomCode} = roomData;
  router.push(`/rooms/${roomCode}`);
};

const onClickCopyVerifyMessage = async () => {
  if (!navigator.clipboard) {
    statusMessage.value = "您的瀏覽器不支援複製功能";
    return;
  }

  try {
    await navigator.clipboard.
      writeText(verifyMessage.value);
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

const onClickRequest = async () => {
  if (!roomData.pageUrl) {
    statusMessage.value = "請輸入社群加入網址。";
    return;
  }

  if (!roomData.pageUrl.startsWith("https://")) {
    const {pageUrl: pageUrlMessage} = roomData;
    const urls = pageUrlMessage.match(/https?:\/\/\S+/);
    if (urls.length !== 1) {
      statusMessage.value = "請輸入正確的社群加入網址。";
      return;
    }
    roomData.pageUrl = urls[0];
  }


  isLoad.value = true;
  try {
    const client = useClient();
    const result = await client.post("rooms", {
      json: {
        url: roomData.pageUrl,
      },
    }).json();

    Object.assign(roomData, result.room);
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
        url: roomData.pageUrl,
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
