<template>
  <v-row class="mt-5">
    <v-col cols="12" sm="3" md="3">
      <p class="text-h3 font-weight-bold">
        {{ $t("staff") }}
      </p>
    </v-col>
    <v-col cols="12" sm="4" md="4">
      <v-text-field
        v-model="searchRes"
        :label="t('search')"
        class="bg-white"
        clearable
        @click:clear="refreshData"
        @keydown.enter="performSearch"
      >
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="5" md="5" class="align-content-center text-center">
      <v-btn
        color="pink-darken-4"
        variant="elevated"
        min-width="100px"
        size="large"
        class=""
      >
        <RouterLink to="/addEdit" class="text-decoration-none text-white">
          {{ $t("addStaff") }}
          <v-icon> mdi-account-plus</v-icon>
        </RouterLink>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";
const emit = defineEmits(["search", "refresh"]);
const { t } = useI18n();
const searchRes = ref("");

const refreshData = () => {
  searchRes.value = "";
  // Trigger fetchDta() from the StaffList component using props and emit an event or call a function to perform the refresh
  emit("refresh", searchRes.value);
};

const performSearch = () => {
  emit("search", searchRes.value);
};
</script>

<style scoped></style>
