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
      <div class="w-full flex justify-center">
        <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg mt-20 mb-8">
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
          <p class="mt-6 text-gray-600">
            社群加入申請管理系統
          </p>
          <p class="mt-6 text-gray-600">
            請輸入對方提供的驗證碼：
          </p>
          <div class="w-full mb-4 text-gray-600 flex rounded bg-white shadow-md">
            <input
              v-model="submissionCode"
              placeholder="pmShBo2Bg"
              class="w-full border-none bg-transparent px-4 py-3 text-gray-900 outline-none focus:outline-none text-gray-500"
              type="text"
            >
            <button
              class="m-2 rounded px-4 py-2 font-semibold"
              @click="onClickAction"
              :disabled="isLoadAction"
            >
              <loading-circle-icon
                v-if="isLoadAction"
                class="h-6 w-6 animate-spin"
              />
              <x-mark-icon
                v-else-if="isQuery"
                class="h-6 w-6"
              />
              <magnifying-glass-icon
                v-else
                class="h-6 w-6"
              />
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="isQuery"
        class="w-full flex justify-center"
      >
        <div
          v-if="isLoadAction"
          class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg mb-20"
        >
          <loading-circle-icon
            class="w-14 h-14 animate-spin"
          />
        </div>
        <div
          v-else-if="isValid"
          class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg mb-20"
        >
          <div class="flex justify-center my-2">
            <check-circle-icon
              class="w-14 h-14 rounded-full bg-white border-2 border-white-500"
            />
          </div>
          <h3 class="text-gray-800 text-xl font-semibold">
            驗證碼有效
          </h3>
          <p class="my-4 text-gray-600">
            驗證碼：
            <span class="font-normal">
              {{ submissionData.code }}
            </span>
          </p>
          <p
            v-if="isValid"
            class="my-4 text-gray-600"
          >
            申請時間：{{ new Date(submissionData.createdAt).toLocaleString() }}
          </p>
        </div>
        <div
          v-else
          class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg mb-20"
        >
          <div class="flex justify-center my-2">
            <x-circle-icon
              class="w-14 h-14 rounded-full bg-white border-2 border-white-500"
            />
          </div>
          <h3 class="text-gray-800 text-xl font-semibold">
            驗證碼無效
          </h3>
          <p class="my-4 text-gray-600">
            驗證碼：
            <span class="font-normal">
              {{ submissionData.code }}
            </span>
          </p>
        </div>
      </div>
    </div>
    <toast-modal v-model="statusMessage" />
  </div>
</template>

<script setup>
import {ref, reactive, computed, watch, onMounted} from "vue";

import {
  CheckCircleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  XCircleIcon,
} from "@heroicons/vue/24/outline";

import LoadingCircleIcon from "../components/LoadingCircleIcon.vue";
import ToastModal from "../components/ToastModal.vue";

import {useRoute} from "vue-router";
import {useClient} from "../clients/freya.js";

const route = useRoute();
const client = useClient();

const {
  roomCode,
} = route.params;

const isLoad = ref(false);
const isDead = ref(false);

const isLoadAction = ref(false);
const isQuery = ref(false);

const statusMessage = ref("");
const submissionCode = ref("");

const roomData = reactive({
  label: "",
  description: "",
  backgroundImage: "",
});

const submissionData = reactive({
  code: "",
  roomCode: "",
  createdAt: "",
  updatedAt: "",
});

const isValid = computed(() => {
  return isQuery.value &&
    submissionData.roomCode === roomCode;
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

watch(submissionCode, (v) => {
  if (v !== submissionData.code) {
    isQuery.value = false;
    submissionData.code = "";
    submissionData.roomCode = "";
  }
});

const onClickAction = async () => {
  if (!submissionCode.value) {
    statusMessage.value = "請輸入驗證碼";
    return;
  }

  if (isQuery.value) {
    submissionCode.value = "";
    return;
  }

  submissionData.code = submissionCode.value;
  isLoadAction.value = true;
  isQuery.value = true;
  try {
    const submission = await client.get(
      `rooms/${roomCode}/submissions/${submissionData.code}`,
    ).json();
    Object.assign(submissionData, submission);
  } catch (error) {
    console.error(error);
  }
  isLoadAction.value = false;
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
