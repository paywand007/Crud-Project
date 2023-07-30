<template>
  <v-row class="mt-5">
    <v-col cols="12" sm="3" md="3"
      ><p class="text-h3 font-weight-bold">{{ t("team") }}</p>
    </v-col>
    <v-col cols="12" sm="4" md="4">
      <v-text-field
        v-model="searchRes"
        :label="t('search')"
        class="bg-white"
        clearable
        style="background: white"
        @click:clear="refreshData"
        @keyup.enter="performSearch"
      >
      </v-text-field>
    </v-col>

    <v-col cols="12" sm="5" md="5" class="align-content-center text-center">
      <v-btn
        color="pink-darken-4"
        variant="elevated"
        size="large"
        @click="dialogAddOpen"
      >
        <p class="text-decoration-none text-white">
          {{ t("addTeam") }} <v-icon> mdi-account-plus</v-icon>
        </p>
        <v-dialog v-model="openAddDialig" :persistent="true">
          <AddEditTeam @closeDialog="close" />
        </v-dialog>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import AddEditTeam from "./AddEditTeam.vue";
import { useRouter } from "vue-router";
import apiData from "../../plugins/apiData.ts";
const router = useRouter();
const emit = defineEmits(["search", "refresh", "dialogDelete", "add"]);
const { t } = useI18n();
const searchRes = ref("");
const openAddDialig = ref(false);
const dialogAddOpen = () => {
  openAddDialig.value = true;
};

const data = ref([]);
const refreshData = () => {
  searchRes.value = "";
  emit("refresh", searchRes.value);
};
const addRes = ref(true);
const close = () => {
  openAddDialig.value = false;
  emit("add", addRes.value);
  router.push("/team");
  addRes.value = false;
};
const performSearch = () => {
  emit("search", searchRes);
};
const fetchD = async () => [
  await apiData.get("/team").then((res) => {
    data.value = res.data;
  }),
];
onMounted(() => {
  fetchD();
});
</script>
