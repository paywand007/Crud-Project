<template>
  <v-data-iterator :items="data">
    <template v-slot:default="{ items }">
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
                  <AddEditTeam @closeDialog="close" @refreshData="refDats" />
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
    <template v-slot:footer>
      <div class="d-flex align-center justify-space-around pa-4">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props"> {{ t("itemPerPage") }} </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index + item.id">
              <v-list-item-title
                @click="item.changeItemsPerPage(item.value)"
                style="cursor: pointer"
                >{{ item.value }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>

        <v-spacer></v-spacer>

        <span class="mr-4 grey--text">
          {{ t("pageof") }} {{ page }} {{ t("of") }} {{ numberOfPages }}
        </span>
        <v-btn icon size="small" @click="prevPage">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn icon size="small" class="ml-2" @click="nextPage">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </template>
  </v-data-iterator>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

import AddEditTeam from "./AddEditTeam.vue";
import TeamPreview from "./TeamPreview.vue";
import apiData from "../../plugins/apiData.ts";

const { t } = useI18n();
const prop = defineProps(["data"]);

const router = useRouter();
const route = useRoute();
const data = ref([]);

const openEditDialog = (id: number) => {
  editDialog.value = true;
  router.push(`/team/${id}`);
};
const itemsPerPageOptions = [3, 6, 9];
const itemsPerPage = ref(itemsPerPageOptions[0]);
const page = ref(1);
const limit = ref(10);
const totalPages = ref(0);
const items = ref([
  {
    id: 1,
    value: 4,
    changeItemsPerPage: (option: number) => {
      page.value = 1;
      limit.value = option;
      fetchD();
    },
  },
  {
    id: 1,
    value: 8,
    changeItemsPerPage: (option: number) => {
      page.value = 1;
      limit.value = option;
      fetchD();
    },
  },
  {
    id: 1,
    value: 12,
    changeItemsPerPage: (option: number) => {
      page.value = 1;
      limit.value = option;
      fetchD();
    },
  },
]);

const numberOfPages = computed(() => {
  return Math.ceil(data.value.length / itemsPerPage.value);
});

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
    fetchD();
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    fetchD();
  }
};

const dialog = ref(false);
const editDialog = ref(false);
const previewDialog = ref(false);
const dialogDeleteOpen = (idItem: number) => {
  dialog.value = true;
  router.push(`/team/${idItem}`);
};
watch(dialog, (newVal) => {
  localStorage.setItem("dialog", newVal.toString());
  fetchD();
});
watch(editDialog, (newVal) => {
  localStorage.setItem("editDialog", newVal.toString());
});

watch(previewDialog, (newVal) => {
  localStorage.setItem("previewDialog", newVal.toString());
});
const openPreview = (id: number): void => {
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
const deleteFn = async () => {
  dialog.value = false;
  await apiData.delete(`/team/${route.params.id}`).then(() => {
    fetchD();
    router.push("/team");
  });
};
const fetchData = async () => {
  return await apiData
    .get(`/team?q=${prop.data.value}`, {
      params: {
        _page: page.value,
        _limit: limit.value,
      },
    })
    .then((res) => {
      const totalCount = parseInt(res.headers["x-total-count"]);
      totalPages.value = Math.ceil(totalCount / limit.value);
      data.value = res.data;
    });
};
const fetchD = async () => {
  return await apiData
    .get(`/team`, {
      params: {
        _page: page.value,
        _limit: limit.value,
      },
    })
    .then((res) => {
      const totalCount = parseInt(res.headers["x-total-count"]);
      totalPages.value = Math.ceil(totalCount / limit.value);
      data.value = res.data;
    });
};
onMounted(() => {
  fetchD();

  const storedDialogVisible = localStorage.getItem("dialog");
  const storedEADialogVisible = localStorage.getItem("editDialog");
  const storePriview = localStorage.getItem("previewDialog");
  if (storedDialogVisible === "true") {
    dialog.value = true;
  } else if (storedEADialogVisible === "true") editDialog.value = true;
  else if (storePriview === "true") previewDialog.value = true;
});

watch(prop, () => {
  if (prop.data.value) return fetchData();
  else fetchD();
});
const refDats = (item) => {
  data.value = item;
};
</script>
