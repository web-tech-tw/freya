<template>
  <div :style="backgroundStyle">
    <div
      v-if="isNotFound"
      class="flex flex-wrap w-full justify-center bg-white py-20"
    >
      <div class="text-center text-amber-700">
        邀請已失效
      </div>
    </div>
    <div
      v-else-if="isDead"
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
            class="flex items-center justify-center bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full mr-3"
            :disabled="isDisabled"
            @click="onClickAccept"
          >
            <loading-circle-icon
              v-if="isLoadAccept"
              class="h-6 w-6 animate-spin"
            />
            <span v-else>
              接受
            </span>
          </button>
          <button
            class="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            :disabled="isDisabled"
            @click="onClickReject"
          >
            <loading-circle-icon
              v-if="isLoadReject"
              class="h-6 w-6 animate-spin"
            />
            <span v-else>
              拒絕
            </span>
          </button>
        </div>
      </div>
    </div>
    <toast-modal v-model="statusMessage" />
  </div>
</template>

<script setup>
import {ref, reactive, computed, onMounted} from "vue";

import LoadingCircleIcon from "../components/LoadingCircleIcon.vue";
import ToastModal from "../components/ToastModal.vue";

import {useRoute, useRouter} from "vue-router";
import {useClient} from "../clients/freya.js";

const route = useRoute();
const router = useRouter();
const client = useClient();

const {
  invitationCode,
} = route.params;

const isLoad = ref(false);
const isDead = ref(false);
const isNotFound = ref(false);

const isLoadAccept = ref(false);
const isLoadReject = ref(false);

const statusMessage = ref("");

const roomData = reactive({
  label: "",
  description: "",
  backgroundImage: "",
  pageUrl: "",
});

const invitationData = reactive({
  email: "",
  roomCode: "",
  invitationCode: "",
});

const isDisabled = computed(() => {
  return isLoadAccept.value || isLoadReject.value;
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

const onClickAccept = async () => {
  isLoadAccept.value = true;
  try {
    await client.patch(`rooms/invitations/${invitationCode}`);
    statusMessage.value = "接受成功";
    setTimeout(() => {
      router.push(`/rooms/${invitationData.roomCode}`);
    }, 1500);
  } catch (error) {
    statusMessage.value = "接受失敗";
    isLoadAccept.value = false;
    console.error(error);
  }
};

const onClickReject = async () => {
  isLoadReject.value = true;
  try {
    await client.delete(`rooms/invitations/${invitationCode}`);
    statusMessage.value = "拒絕成功";
    setTimeout(() => {
      router.push("/");
    }, 1500);
  } catch (error) {
    statusMessage.value = "拒絕失敗";
    isLoadReject.value = false;
    console.error(error);
  }
};

onMounted(async () => {
  isLoad.value = true;
  try {
    const result = await client.get(`rooms/invitations/${invitationCode}`).json();
    Object.assign(roomData, result.room);
    Object.assign(invitationData, result.invitation);
  } catch (error) {
    isNotFound.value = error.response?.status === 404;
    isDead.value = true;
    console.error(error);
  }
  isLoad.value = false;
});
</script>
