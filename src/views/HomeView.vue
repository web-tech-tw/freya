<template>
  <div>
    <div class="mt-10 mx-auto py-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div class="sm:text-center lg:text-left">
        <h1 class="text-4xl tracking-tight font-extrabold text-gray-900">
          <span class="block xl:inline">Freya</span>
          <span class="block text-lime-600 xl:inline">芙蕾雅</span>
        </h1>
        <p class="mt-3 text-base text-gray-500">
          為 LINE OpenChat 社群打擊機器人、廣告、垃圾訊息的專業平台
        </p>
        <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div class="rounded-md shadow">
            <button
              class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-lime-600 hover:bg-lime-600 md:py-4 md:text-lg md:px-10"
              @click="onClickRoomCreate"
            >
              我的社群已經受夠垃圾訊息了！幫幫我！芙蕾雅女神！
            </button>
          </div>
          <div class="mt-3 sm:mt-0 sm:ml-3">
            <button
              class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-lime-600 bg-lime-100 hover:bg-lime-200 md:py-4 md:text-lg md:px-10"
              @click="onClickRoomManage"
            >
              我的社群已經受到女神庇護，我要進入社群管理中心
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10 mx-auto py-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div class="sm:text-center lg:text-right">
        <h1 class="text-4xl tracking-tight font-extrabold text-gray-900">
          <span class="block xl:inline">需要</span>
          <span class="block text-lime-600 xl:inline">獨立安裝版</span>
          <span class="block xl:inline">嗎？</span>
        </h1>
        <p class="mt-3 text-base text-gray-500">
          為了一些不可抗拒的原因，您需要自己架設 Freya 嗎？<br>
          我們提供了一個簡易版的系統，讓您可以快速部署您的社群專屬驗證系統。
        </p>
        <p class="mt-3 text-base text-gray-500">
          Freyja 是 Freya 的概念驗證版本，可以提供簡易的驗證功能。
        </p>
        <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-end">
          <div class="rounded-md shadow">
            <a
              href="https://github.com/web-tech-tw/freyja"
              class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-lime-600 hover:bg-lime-600 md:py-4 md:text-lg md:px-10"
            >
              取得 Freyja (Freya 簡易版)
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter();

const onClickRoomCreate = () => {
  router.push("/rooms/create");
};

const onClickRoomManage = () => {
  router.push("/rooms");
};
</script>
