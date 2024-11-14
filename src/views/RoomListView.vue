<template>
  <div class="my-9">
    <div class="my-3 text-xl text-center">
      管理社群驗證申請
    </div>
    <div v-if="isDead">
      <div class="text-center text-red-500">
        發生錯誤
      </div>
    </div>
    <div v-else-if="isLoad">
      <div class="flex justify-center my-16">
        <loading-circle-icon class="h-8 w-8 animate-spin text-lime-600" />
      </div>
    </div>
    <div v-else-if="isEmpty">
      <div class="text-center text-gray-500">
        無資料
      </div>
    </div>
    <div
      v-else
      class="container mb-2 flex mx-auto w-full items-center justify-center"
    >
      <ul class="flex flex-col p-4">
        <li
          v-for="(i, j) in data"
          :key="j"
          class="border-gray-400 flex flex-row mb-2"
        >
          <div class="rounded-md flex flex-1 items-center p-4 border-2 mt-3 border-lime-400">
            <img
              :alt="i.label"
              :src="i.backgroundImage"
              class="h-12 w-12 rounded-full object-cover"
            >
            <div class="mx-4">
              <div class="font-medium">
                {{ i.label }}
              </div>
              <div class="font-normal truncate text-gray-700 hidden md:block md:max-w-xs lg:max-w-md">
                {{ i.description }}
              </div>
            </div>
            <router-link
              :to="`/rooms/${i.code}`"
              class="text-white rounded-md bg-green-700 hover:bg-green-800 p-2"
            >
              查看
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, reactive, onMounted} from "vue";
import {useClient} from "../clients/freya.js";

import LoadingCircleIcon from "../components/LoadingCircleIcon.vue";

const client = useClient();

const data = reactive([]);

const isLoad = ref(false);
const isDead = ref(false);
const isEmpty = computed(
  () => data.length === 0,
);

onMounted(async () => {
  isLoad.value = true;
  try {
    const result = await client.get("rooms").json();
    data.push(...result);
  } catch (error) {
    isDead.value = true;
    console.error(error);
  }
  isLoad.value = false;
});
</script>
