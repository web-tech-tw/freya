<template>
  <app-header-mobile-menu-item
    v-if="profile === null"
    name="登入"
    icon="ArrowRightOnRectangleIcon"
    @click="onClick"
  />
  <app-header-mobile-menu-item
    v-else
    :name="nickname"
    @click="onClick"
  >
    <template #prepend>
      <img
        :src="avatarUrl"
        :alt="nickname"
        class="rounded-full w-6 h-6 mr-4"
      >
    </template>
  </app-header-mobile-menu-item>
</template>

<script setup>
import {computed} from "vue";

import AppHeaderMobileMenuItem from "./AppHeaderMobileMenuItem.vue";

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
