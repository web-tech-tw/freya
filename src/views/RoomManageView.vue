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
        <div>
          <h2 class="text-gray-800 text-3xl font-semibold">
            {{ roomData.label }}
            <span class="text-sm font-normal">
              {{ roomCode }}
            </span>
          </h2>
          <p class="mt-6 text-gray-600">
            管理員人數：{{ administrators }}
          </p>
          <p class="text-gray-600">
            成員人數：{{ roomData.members }}
          </p>
          <div class="mt-6 text-gray-600">
            簡介：
            <p
              class="my-2 mx-1 text-gray-800 text-sm"
              v-html="descriptionHtml"
            />
          </div>
          <p class="mt-4 text-gray-600">
            社群邀請網址：
          </p>
          <div class="w-full mb-4 text-gray-600 flex rounded bg-white shadow-md">
            <input
              :value="inviteUrl"
              class="w-full border-none bg-transparent px-4 py-3 text-gray-900 outline-none focus:outline-none text-gray-500"
              type="text"
              readonly
            >
            <button
              title="複製"
              class="m-2 rounded px-4 py-2 font-semibold"
              @click="onClickCopyInviteUrl"
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
        </div>
        <div class="flex justify-end mt-8">
          <button
            class="flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full mr-3"
            :disabled="isLoadRefresh"
            @click="onClickRefresh"
          >
            <loading-circle-icon
              v-if="isLoadRefresh"
              class="h-6 w-6 animate-spin"
            />
            <span v-else>
              更新資訊
            </span>
          </button>
          <button
            class="flex items-center justify-center bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded-full mr-3"
            @click="onClickInvite"
          >
            共同管理員
          </button>
          <button
            class="flex items-center justify-center bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full"
            @click="onClickCommit"
          >
            進入審核系統
          </button>
        </div>
      </div>
    </div>
    <toast-modal v-model="statusMessage" />
  </div>
</template>

<script setup>
import {ref, reactive, computed, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useClient} from "../clients/freya";

import {
  CheckIcon,
  DocumentDuplicateIcon,
} from "@heroicons/vue/24/outline";

import ToastModal from "../components/ToastModal.vue";
import LoadingCircleIcon from "../components/LoadingCircleIcon.vue";

const {
  VITE_FREYA_INTE_HOST: freyaInteHost,
} = import.meta.env;

const route = useRoute();
const router = useRouter();
const client = useClient();

const {
  roomCode,
} = route.params;

const isLoad = ref(false);
const isDead = ref(false);

const isLoadRefresh = ref(false);
const isCopy = ref(false);

const statusMessage = ref("");

const roomData = reactive({
  label: "",
  members: 0,
  description: "",
  backgroundImage: "",
  administrators: [],
});

const administrators = computed(() => {
  return roomData.administrators.length;
});

const inviteUrl = computed(() => {
  return `${freyaInteHost}/#/ti/g2/${roomCode}`;
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

const onClickCopyInviteUrl = async () => {
  if (!navigator.clipboard) {
    statusMessage.value = "您的瀏覽器不支援複製功能";
    return;
  }

  try {
    await navigator.clipboard.
      writeText(inviteUrl.value);
    statusMessage.value = "已複製邀請網址";
    isCopy.value = true;
    setTimeout(() => {
      isCopy.value = false;
    }, 3000);
  } catch (error) {
    statusMessage.value = "無法複製邀請網址";
    console.error(error);
  }
};

const onClickRefresh = async () => {
  isLoadRefresh.value = true;
  const result = await client.patch(`rooms/${roomCode}`).json();
  Object.assign(roomData, result);
  statusMessage.value = "更新成功";
  isLoadRefresh.value = false;
};

const onClickInvite = () => {
  router.push(`/rooms/${roomCode}/administrators`);
};

const onClickCommit = () => {
  router.push(`/rooms/${roomCode}/submissions`);
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
});
</script>
