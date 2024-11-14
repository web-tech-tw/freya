<template>
  <div>
    <div class="flex flex-wrap w-full justify-center bg-lime-600 py-20">
      <div class="max-w-md mx-3 my-5 py-4 px-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-gray-800 text-3xl font-semibold">
          {{ roomData.label }}
        </h2>
        <p
          class="mt-2 text-gray-600"
          v-html="descriptionHtml"
        />
        <div class="flex justify-end mt-4">
          <button
            class="flex items-center justify-center bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full"
            @click="onClickRefresh"
          >
            <loading-circle-icon
              v-if="isLoad"
              class="h-6 w-6 animate-spin"
            />
            <span v-else>更新資訊</span>
          </button>
        </div>
      </div>
    </div>
    <toast-modal v-model="statusMessage" />
  </div>
</template>

<script setup>
import {ref, reactive, computed, onMounted} from "vue";
import {useRoute} from "vue-router";
import {useClient} from "../clients/freya";

import ToastModal from "../components/ToastModal.vue";
import LoadingCircleIcon from "../components/LoadingCircleIcon.vue";

const route = useRoute();
const client = useClient();

const {
  roomCode,
} = route.params;

const isLoad = ref(false);
const statusMessage = ref("");

const roomData = reactive({
  label: "",
  description: "",
});

const descriptionHtml = computed(() => {
  const {description} = roomData;
  return description?.replaceAll("\n", "<br />");
});

const onClickRefresh = async () => {
  isLoad.value = true;
  const result = await client.patch(`rooms/${roomCode}`).json();
  Object.assign(roomData, result);
  isLoad.value = false;
};

onMounted(async () => {
  const result = await client.get(`rooms/${roomCode}`).json();
  Object.assign(roomData, result);
});
</script>
