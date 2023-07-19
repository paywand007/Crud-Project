<template>
  <v-row class="mt-5">
    <v-col cols="12" sm="3" md="3"
      ><p class="text-h3 font-weight-bold">{{ t("team") }}</p>
    </v-col>
    <v-col cols="12" sm="4" md="4">
      <v-text-field
        v-model="search"
        :label="t('search')"
        class="bg-white"
        clearable
        @click:clear="refreshData"
        style="background: white"
        @keyup.enter="performSearch"
      >
      </v-text-field>
    </v-col>

    <v-col cols="12" sm="5" md="5" class="align-content-center text-center">
      <v-btn
        color="pink-darken-4"
        variant="elevated"
        size="large"
        @click="dialogVisible = true"
      >
        <p class="ma-4">{{ t("addTeam") }}</p>
        <v-icon> mdi-account-plus</v-icon>
      </v-btn>
    </v-col>
  </v-row>
  <v-data-iterator :items="[data]" :items-per-page="itemsPerPage" :page="page">
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

              <v-dialog v-model="openDialog" :persistent="true" width="auto">
                <v-card>
                  <v-card-title>
                    <v-spacer></v-spacer>
                    <span>
                      <v-icon @click="closeViewDialog" color="pink-darken-4">
                        mdi-window-close</v-icon
                      ></span
                    >
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row class="h-50">
                        <v-col cols="12" md="12" sm="4">
                          <v-img
                            :src="data.img"
                            width="auto"
                            max-height="700px"
                            class="mb-5"
                          ></v-img>
                        </v-col>
                        <v-col>
                          <p>{{ data.type }}</p>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>

              <span class="d-flex">
                <span>
                  <v-icon @click="updateData(item.id)">
                    mdi-pencil
                  </v-icon></span
                >
                <span
                  ><v-icon @click="viewDialog(item.id)"> mdi-eye </v-icon></span
                >
                <span @click="dialogDelete">
                  <v-dialog
                    v-model="openDelete"
                    :persistent="true"
                    width="auto"
                  >
                    <v-card>
                      <v-card-title class="text-h5"> Delete Item </v-card-title>
                      <v-card-text>
                        The item will be deleted permanently, sre you sure you
                        want delete this item .</v-card-text
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="pink-darken-4"
                          variant="text"
                          @click="
                            () => {
                              openDelete = false;
                              router.push('/team');
                            }
                          "
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          color="green-darken-4"
                          variant="text"
                          @click="deleteFn"
                        >
                          Yes
                        </v-btn>
                      </v-card-actions>
                    </v-card> </v-dialog
                  ><v-icon @click="dialogDelete(item.id)">
                    mdi-delete
                  </v-icon></span
                >
                <v-form>
                  <v-container>
                    <v-dialog
                      v-model="dialogVisible"
                      width="auto"
                      :persistent="true"
                    >
                      <v-card>
                        <v-card-title>
                          <span class="text-h5" v-if="route.params.id">
                            Edit
                          </span>
                          <span class="text-h5" v-else> Add </span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12">
                                <v-text-field
                                  label="img String"
                                  v-model="img"
                                  :error-messages="errImg"
                                ></v-text-field>
                              </v-col>
                              <v-col>
                                <v-select
                                  label="Select"
                                  v-model="typeData"
                                  :error-messages="ereMsgType"
                                  :items="[
                                    'Frontend',
                                    'Backend',
                                    'Android',
                                    'QA ',
                                    'Scrum Master',
                                    'UX UI ',
                                  ]"
                                ></v-select>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue-darken-1"
                            variant="text"
                            @click="closeDialog"
                          >
                            Cancel
                          </v-btn>

                          <v-btn
                            color="blue-darken-1"
                            variant="text"
                            @click="submit"
                          >
                            {{ route.params.id ? "Update" : "Add" }}
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-container>
                </v-form>
              </span>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template v-slot:footer>
      <div class="d-flex align-center justify-space-around pa-4">
        <v-menu open-on-hover>
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
import apiData from "./apiData.ts";

import { useField, useForm } from "vee-validate";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { handleSubmit, setValues } = useForm();
const { locale, t } = useI18n();
const route = useRoute();
const router = useRouter();
const search = ref("");

const data = ref([]);
const itemsPerPageOptions = [3, 6, 9];
const itemsPerPage = ref(itemsPerPageOptions[0]);
const page = ref(1);

const items = ref([
  {
    id: 1,
    value: 4,
    changeItemsPerPage: (option) => {
      page.value = 1;
      limit.value = option;
      fetchData();
    },
  },
  {
    id: 1,
    value: 8,
    changeItemsPerPage: (option) => {
      page.value = 1;
      limit.value = option;
      fetchData();
    },
  },
  {
    id: 1,
    value: 12,
    changeItemsPerPage: (option) => {
      page.value = 1;
      limit.value = option;
      fetchData();
    },
  },
]);

const numberOfPages = computed(() => {
  return Math.ceil(data.value.length / itemsPerPage.value);
});

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
    fetchData();
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    fetchData();
  }
};

const { value: img, errorMessage: errImg } = useField<string>(
  "img",
  "required",
);

const { value: typeData, errorMessage: ereMsgType } = useField<string>(
  "typeData",
  "required",
);
const limit = ref(10);
const totalPages = ref(0);
const fetchData = async () => {
  await apiData
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
      setValues({
        img: data.value.img,
        type: data.value.type,
      });
    });
};

const submit = handleSubmit(() => {
  if (!parseInt(route.params.id)) {
    addData();
  } else {
    patchData();
  }
});

onMounted(async () => {
  fetchData();

  const storedDialogVisible = localStorage.getItem("dialogVisible");
  const storedOpenDialog = localStorage.getItem("openDialog");
  const storedOpenDelete = localStorage.getItem("openDelete");
  if (storedDialogVisible === "true") {
    dialogVisible.value = true;
  } else if (storedOpenDialog === "true") {
    openDialog.value = true;
  } else if (storedOpenDelete === "true") {
    openDelete.value = true;
  }
});
const dialogVisible = ref(false);
watch(dialogVisible, (newVal) => {
  localStorage.setItem("dialogVisible", newVal.toString());
});
const openDialog = ref(false);
watch(openDialog, (newVal) => {
  localStorage.setItem("openDialog", newVal.toString());
});
const openDelete = ref(false);
const dialogDelete = (idItem) => {
  openDelete.value = true;
  router.push(`/team/${idItem}`);
};
watch(openDelete, (newVal) => {
  localStorage.setItem("openDelete", newVal.toString());
});
const closeDialog = () => {
  dialogVisible.value = false;
  localStorage.removeItem("dialogVisible");
  // localStorage.removeItem("inputValue");
  fetchData();
  router.push("/team");
};

const updateData = async (id) => {
  dialogVisible.value = true;
  router.push(`/team/${id}`);
  await apiData.get(`/team/${id}`).then((res) => {
    data.value = res.data;
    setValues({
      img: data.value.img,
      typeData: data.value.type,
    });
  });
};
const patchData = async () => {
  await apiData
    .patch(`/team/${route.params.id}`, {
      img: img.value,
      type: typeData.value,
    })
    .then((res) => {
      data.value = res.data;
      dialogVisible.value = false;
      fetchData();
      router.push("/team");
      img.value = "";
      typeData.value = "";
    });
};
const deleteFn = async (ItemId) => {
  await apiData.delete(`/team/${parseInt(route.params.id)}`).then(() => {
    openDelete.value = false;
    router.push("/team");
    fetchData();
  });
};
const addData = async () => {
  await apiData
    .post("/team", {
      id: Math.floor(Math.random() * 101),
      img: img.value,
      type: typeData.value,
    })
    .then(() => {
      dialogVisible.value = false;
      fetchData();
      img.value = "";
      typeData.value = "";
    });
};

const performSearch = () => {
  if (!search.value) {
    return data.value;
  } else {
    data.value = data.value.filter((item) =>
      item.type.toLowerCase().includes(search.value.toLowerCase()),
    );
  }
};

const viewDialog = async (id) => {
  openDialog.value = true;
  router.push(`/team/${id}`);
  await apiData.get(`/team/${id}`).then((res) => (data.value = res.data));
};
const closeViewDialog = () => {
  openDialog.value = false;
  router.push("/team");
  fetchData();
};
const refreshData = () => {
  search.value = "";
  fetchData();
};
</script>

<style>
/* Add any custom styles here */
</style>
