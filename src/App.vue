<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <v-sheet color=" " class="pa-4 d-flex justify-center" style="gap: 10px">
        <v-avatar
          class="align-center"
          color="grey-darken-1"
          title="Rteach"
          size="65"
          image="data:image/png;base64,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"
        ></v-avatar>
        <p
          class="text-h5 text-center align-content-center font-weight-bold text-pink-darken-4"
        >
          TECH
        </p>
      </v-sheet>

      <v-divider></v-divider>

      <v-list
        density="compact"
        :nav="true"
        v-for="list in store.data"
        :key="list.id"
      >
        <v-list-item
          :prepend-icon="list.icon"
          :to="list.route"
          color="pink-darken-4"
        >
          <h2>
            {{ t(list.name) }}
          </h2></v-list-item
        >
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="black" v-bind="props">
            <v-icon size="45">mdi-web</v-icon></v-btn
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
    </v-app-bar>

    <v-main>
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { RouterView } from "vue-router";
import { useI18n } from "vue-i18n";
import { useDataStore } from "./store/index.ts";

const { locale, t } = useI18n();

const drawer = ref(null);
const store = useDataStore();

const items = computed(() => [
  {
    id: 1,
    value: t("langE"),
    click: () => (locale.value = "en"),
  },
  {
    id: 1,
    value: t("langK"),
    click: () => (locale.value = "ckb"),
  },
]);
</script>

<style scoped></style>
