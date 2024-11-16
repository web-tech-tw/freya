<template>
  <app-header-normal-menu-item
    v-if="profile === null"
    name="登入"
    @click="onClick"
  />
  <app-header-normal-menu-item
    v-else
    :name="nickname"
    @click="onClick"
  >
    <template #prepend>
      <img
        :src="avatarUrl"
        :alt="nickname"
        class="rounded-full w-8 h-8 mr-2"
      >
    </template>
  </app-header-normal-menu-item>
</template>

<script setup>
import {computed} from "vue";

import AppHeaderNormalMenuItem from "./AppHeaderNormalMenuItem.vue";

import {onClickSara} from "./AppHeaderMenuData.js";

import {useProfile} from "../plugins/profile.js";

const profile = useProfile();

const nickname = computed(() => {
  const {nickname} = profile;
  return nickname;
});

const avatarUrl = computed(() => {
  const {avatarUrl} = profile;
  return avatarUrl;
});

const onClick = () => {
  onClickSara(profile);
};
</script>
