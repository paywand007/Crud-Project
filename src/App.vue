<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <NavBar />
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <NavApp />
    </v-app-bar>

    <v-main>
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { RouterView } from "vue-router";
import { useI18n } from "vue-i18n";

import NavBar from "./components/NavBar.vue";
import NavApp from "./components/NavApp.vue";

const { locale, t } = useI18n();
const storedLanguage = localStorage.getItem("selectedLanguage") ?? "en";
locale.value = storedLanguage;
const drawer = ref(true);
</script>
