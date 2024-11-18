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
      <div class="max-w-md lg:w-1/3 py-4 px-8 bg-white shadow-lg rounded-lg my-20">
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
        </div>
        <p class="mt-4 text-gray-600">
          傳送管理員邀請函：
        </p>
        <div class="w-full mb-4 text-gray-600 flex rounded bg-white shadow-md">
          <input
            v-model="email"
            placeholder="freya@web-tech.tw"
            class="w-full border-none bg-transparent px-4 py-3 text-gray-900 outline-none focus:outline-none text-gray-500"
            type="text"
          >
          <button
            title="複製"
            class="m-2 rounded px-4 py-2 font-semibold"
            :disabled="isSent"
            @click="onClickSend"
          >
            <check-icon
              v-if="isSent"
              class="h-6 w-6"
            />
            <paper-airplane-icon
              v-else
              class="h-6 w-6"
            />
          </button>
        </div>
        <p class="mt-6 text-gray-600">
          現有管理員：
        </p>
        <ul class="mt-4 mb-6">
          <li
            v-for="i in roomData.administrators"
            :key="i.id"
            :class="{
              'cursor-pointer': !i.isCreator,
              'hover:bg-gray-300': !i.isCreator
            }"
            class="rounded-md flex flex-1 items-center px-4 py-2 my-1 justify-between"
            @click="onClickRemove(i.id, i.isCreator)"
          >
            <img
              :alt="i.nickname"
              :src="i.avatarUrl"
              class="h-8 w-8 rounded-full object-cover"
            >
            <div class="mx-4">
              <span>{{ i.nickname }}</span>
              <span
                v-if="i.isSelf"
                class="text-gray-500"
              >
                (您)
              </span>
            </div>
            <div
              v-if="i.isCreator"
              title="主管理員"
            >
              <scale-icon class="h-6 w-6" />
            </div>
            <div
              v-else
              title="共同管理員"
            >
              <user-icon class="h-6 w-6" />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <toast-modal v-model="statusMessage" />
  </div>
</template>

<script setup>
import {ref, reactive, computed, onMounted} from "vue";

import {
  useRoute,
  useRouter,
} from "vue-router";
import {
  useClient,
} from "../clients/freya";
import {
  useClient as useSaraClient,
  getUserProfile,
} from "../clients/sara";
import {useProfile} from "../plugins/profile";

import {
  CheckIcon,
  PaperAirplaneIcon,
  ScaleIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";

import ToastModal from "../components/ToastModal.vue";
import LoadingCircleIcon from "../components/LoadingCircleIcon.vue";

const route = useRoute();
const router = useRouter();
const client = useClient();
const saraClient = useSaraClient();
const profile = useProfile();

const {
  roomCode,
} = route.params;

const isLoad = ref(false);
const isDead = ref(false);
const isSent = ref(false);

const statusMessage = ref("");
const email = ref("");

const roomData = reactive({
  code: "",
  label: "",
  backgroundImage: "",
  creator: {},
  administrators: [],
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

const onClickSend = async () => {
  if (!email.value) {
    statusMessage.value = "請輸入電子郵件";
    return;
  }

  isSent.value = true;
  try {
    await client.post(`rooms/${roomCode}/administrators`, {
      json: {
        email: email.value,
      },
    });
    statusMessage.value = "已發送邀請函";
    email.value = "";
  } catch (error) {
    statusMessage.value = "發送邀請函失敗";
    console.error(error);
  }
  isSent.value = false;
};

const onClickRemove = async (userId, isCreator) => {
  if (isCreator) {
    return;
  }

  if (!confirm("確定要移除該管理員？")) {
    return;
  }

  try {
    await client.delete(`rooms/${roomCode}/administrators/${userId}`);
    if (userId === profile._id) {
      statusMessage.value = "已將您移除出管理員";
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } else {
      statusMessage.value = "已移除該管理員";
      roomData.administrators = roomData.administrators.filter(
        (i) => i.id !== userId,
      );
    }
  } catch (error) {
    statusMessage.value = "移除管理員失敗";
    console.error(error);
  }
};

onMounted(async () => {
  isLoad.value = true;
  try {
    const result = await client.get(`rooms/${roomCode}`).json();
    Object.assign(roomData, result);

    const {creator, administrators} = result;
    roomData.administrators = await Promise.all(
      administrators.map(
        async (userId) => {
          const userProfile = await getUserProfile(saraClient, userId);
          userProfile.isSelf = userId === profile._id;
          userProfile.isCreator = userId === creator;
          return userProfile;
        },
      ),
    );
  } catch (error) {
    isDead.value = true;
    console.error(error);
  }
  isLoad.value = false;
});
</script>
