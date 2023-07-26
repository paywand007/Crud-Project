<template>
  <v-data-iterator :items="[data]">
    <template v-slot:default="items">
      <v-row width="400px">
        <v-col cols="12" md="3" sm="12" v-for="item in data" :key="item.title">
          <v-card role="button">
            <v-card-text class="text-center"> </v-card-text>
            <v-img
              :src="item.img"
              height="300px"
              class="align-content-center"
            ></v-img>

            <v-card-actions class="ma-5 pa-3 w-auto">
              <h3>{{ item.type }}</h3>
              <v-spacer></v-spacer>

              <span @click="openEditDialog(item.id)">
                <v-icon> mdi-pencil </v-icon>

                <v-dialog v-model="editDialog" :persistent="true">
                  <AddEditTeam @closeDialog="close" @updateData="updateFn" />
                </v-dialog>
              </span>
              <span @click="openPreview(item.id)"
                ><v-icon> mdi-eye </v-icon>
                <v-dialog v-model="previewDialog">
                  <TeamPreview @closeDialog="closePreview" />
                </v-dialog>
              </span>
              <span @click="dialogDeleteOpen(item.id)">
                <v-icon density="compact" style="cursor: pointer" color="red">
                  mdi-delete
                </v-icon>

                <v-dialog v-model="dialog" max-width="500px" :persistent="true">
                  <v-card>
                    <v-card-title class="text-h5">{{
                      t("sueDelete")
                    }}</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="pink-darken-4"
                        variant="text"
                        @click="dialog = false"
                        >{{ t("no") }}</v-btn
                      >
                      <v-btn
                        color="green-darken-4"
                        variant="text"
                        @click="deleteFn"
                        >{{ t("yes") }}</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </span>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

import AddEditTeam from "./AddEditTeam.vue";
import TeamPreview from "./TeamPreview.vue";
import apiData from "../apiData.ts";
const { t } = useI18n();
const data = ref([]);

const router = useRouter();
const route = useRoute();
const { id } = route.params.id;
const dialog = ref(false);
const editDialog = ref(false);
const previewDialog = ref(false);
const openEditDialog = (id) => {
  editDialog.value = true;
  router.push(`/team/${id}`);
};
const emit = defineEmits(["dialogDelete", "updateFn"]);
const dialogDeleteOpen = (idItem) => {
  console.log("click");
  dialog.value = true;
  router.push(`/team/${idItem}`);
};
const updateFn = () => {
  emit("updateFn");
};
const openPreview = (id) => {
  previewDialog.value = true;
  router.push(`/team/${id}`);
};
const close = () => {
  editDialog.value = false;
  router.push("/team");
};
const closePreview = () => {
  previewDialog.value = false;
  router.push("/team");
};
const deleteFn = () => {
  dialog.value = false;
  emit("dialogDelete", route.params.id);
  router.push("/team");
};
const fetchData = async () => {
  await apiData.get(`/team`).then((res) => (data.value = res.data));
};
onMounted(() => {
  fetchData();
});
</script>
