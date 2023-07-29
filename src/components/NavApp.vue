<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed } from "vue";

const { locale, t } = useI18n();
const storedLanguage = localStorage.getItem("selectedLanguage") ?? "en";
locale.value = storedLanguage;

const items = computed(() => [
  {
    id: 1,
    value: t("langE"),
    click: () => {
      locale.value = "en";
      localStorage.setItem("selectedLanguage", "en");
    },
  },
  {
    id: 1,
    value: t("langK"),
    click: () => {
      locale.value = "ckb";
      localStorage.setItem("selectedLanguage", "ckb");
    },
  },
]);
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn color="black" v-bind="props">
        <v-icon size="45">mdi-web </v-icon></v-btn
      >
    </template>

    <v-list>
      <v-list-item v-for="(item, index) in items" :key="index + item.id">
        <v-list-item-title @click="item.click()" style="cursor: pointer">{{
          item.value
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
