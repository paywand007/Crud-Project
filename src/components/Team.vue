<template>
  <v-toolbar class="bg-white my-5">
    <v-toolbar-title><h1>Team</h1></v-toolbar-title>

    <v-text-field
      v-model="search"
      label="Search here"
      class="mt-5 border-b-sm bg-white"
      clearable
      style="background: white"
      @keyup.enter="performSearch"
    >
    </v-text-field>

    <v-spacer></v-spacer>

    <v-btn color="primary" dark class="mb-2" @click="dialogVisible = true">
      Add New Team
    </v-btn>
  </v-toolbar>
  <v-data-iterator :items="data">
    <template v-slot:default="props">
      <v-row width="400px">
        <v-col cols="12" md="3" v-for="item in data" :key="item.title">
          <v-card role="button">
            <v-card-text class="text-center"> </v-card-text>
            <v-img
              :src="item.img"
              height="300px"
              class="align-content-center"
            ></v-img>

            <v-card-actions class="ma-5">
              <h4>{{ item.type }}</h4>
              <v-spacer></v-spacer>
              <span>
                <v-icon @click="updateData(item.id)"> mdi-pencil </v-icon>
                <v-icon @click="viewDialog(item.id)">
                  mdi-eye
                  <span>
                    <v-dialog v-model="openDialog"> hi </v-dialog>
                  </span>
                </v-icon>
                <v-icon @click="deleteFn(item.id)"> mdi-delete </v-icon>
                <v-form>
                  <v-container>
                    <v-dialog v-model="dialogVisible" persistent>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">edit </span>
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
  </v-data-iterator>
  <!--  <v-pagination v-model="page" :length="pageCount"></v-pagination>-->
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import apiData from "./apiData.ts";

import { useField, useForm } from "vee-validate";
import { useRoute, useRouter } from "vue-router";

const { handleSubmit } = useForm();
const route = useRoute();
const router = useRouter();
const search = ref("");
const fetchData = async () => {
  await apiData.get("/team").then((res) => {
    data.value = res.data;
  });
};
const data = ref([]);

const { value: img, errorMessage: errImg } = useField<string>(
  "img",
  "required",
);
const { value: typeData, errorMessage: ereMsgType } = useField<string>(
  "typeData",
  "required",
);

const submit = handleSubmit(() => {
  console.log(route);

  if (!parseInt(route.params.id)) {
    addData();
  } else {
    patchData();
  }
});

onMounted(() => {
  fetchData();
  const storedDialogVisible = localStorage.getItem("dialogVisible");
  if (storedDialogVisible === "true") {
    dialogVisible.value = true;
  }
});
const dialogVisible = ref(false);
watch(dialogVisible, (newVal) => {
  localStorage.setItem("dialogVisible", newVal.toString());
});

const closeDialog = () => {
  dialogVisible.value = false;
  localStorage.removeItem("dialogVisible");
  // localStorage.removeItem("inputValue");
  router.push("/team");
};
const searchRes = ref("");
//const dataUpdate = ref([]);

const updateData = async (id) => {
  dialogVisible.value = true;
  router.push(`/team/${id}`);
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
  await apiData.delete(`/team/${parseInt(ItemId)}`).then(() => {
    console.log(`Deleted post with ID ${ItemId}`);
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
// watch(search, () => {
//   if (!search) return data.value;
// else if(
//   [data].filter((val) => {
//     val.type.toLowerCase().includes(search.toLocaleLowerCase())){
//     return val
//     }
//   });

// const searchFn = () => {
//   searchTerm.value = searchRes.value;
//   router.push({ path: "/staff", query: { search: searchRes.value } });
// };
const openDialog = ref(false);
const viewDialog = () => {
  openDialog.value = true;
};
</script>

<style>
/* Add any custom styles here */
</style>
