<template>
  <div class="my-9">
    <div class="my-3 text-xl text-center">
      社群列表
    </div>
    <div class="container mb-2 flex mx-auto w-full items-center justify-center">
      <ul class="flex flex-col p-4 w-full md:w-2/3 lg:w-1/2">
        <li
          v-for="(i, j) in data"
          :key="j"
          class="border-gray-400 flex flex-row mb-2"
        >
          <div class="rounded-md flex flex-1 items-center p-4 border-2 mt-3 border-lime-400">
            <div class="flex-1 pl-1 mr-16">
              <div class="font-medium">
                {{ i.label }}
              </div>
              <div class="font-normal inline">
                {{ i.description }}
              </div>
            </div>
            <router-link
              :to="`/rooms/${i.code}`"
              class="w-1/4 text-wrap text-center flex flex-col text-white text-bold rounded-md bg-lime-500 hover:bg-lime-700 justify-center items-center mr-10 p-2"
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
import {reactive, onMounted} from "vue";
import {useClient} from "../clients/freya.js";

const data = reactive([]);

onMounted(async () => {
  const client = useClient();
  const result = await client.get("rooms").json();
  data.push(...result);
});
</script>
