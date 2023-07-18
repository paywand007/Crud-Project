<template>
  <v-data-table :headers="headers" :items="data" :search="searchTerm">
    <template v-slot:top>
      <v-toolbar class="bg-white my-5">
        <v-toolbar-title
          ><p class="text-h3 font-weight-bold">
            {{ $t("staff") }}
          </p></v-toolbar-title
        >

        <v-text-field
          v-model="searchRes"
          :label="t('search')"
          class="mt-5 bg-white"
          clearable
          @keyup.enter="searchFn"
        >
        </v-text-field>

        <v-spacer></v-spacer>
        <v-btn color="pink-darken-4" variant="elevated" size="large" class="">
          <RouterLink to="/addEdit" class="text-decoration-none text-white">
            {{ $t("addStaff") }}
            <v-icon> mdi-account-plus</v-icon>
          </RouterLink>
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.selectable.firstName }} {{ item.selectable.lastName }}</td>
        <td>{{ item.selectable.type }}</td>
        <td>{{ item.selectable.description }}</td>
        <td>{{ item.selectable.date }}</td>
        <td>
          <p v-if="item.selectable.status == true">active</p>
          <p v-else>In-Active</p>
        </td>

        <td>
          <v-icon
            @click="
              router.push({
                name: 'edit',
                params: {
                  id: item.selectable.id,
                },
              })
            "
            color="blue"
            >mdi-pencil</v-icon
          >
          <span @click="dialogDelete(item.selectable.id)">
            <v-icon density="compact" style="cursor: pointer" color="red">
              mdi-delete
            </v-icon>

            <v-dialog v-model="dialog" max-width="500px" persistent>
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
                    @click="deleteData()"
                    >{{ t("yes") }}</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </span>

          <v-icon
            @click="
              router.push({
                name: 'preview',
                params: {
                  id: item.selectable.id,
                },
              })
            "
            color="green"
            >mdi-eye</v-icon
          >
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
<script lang="ts" setup>
import apiData from "./apiData.ts";
import { RouterLink, useRouter, useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
const router = useRouter();

const route = useRoute();
const { locale, t } = useI18n();
const dialog = ref(false);
const { id } = route.params.id;
const searchTerm = ref("");

const searchRes = ref(" ");
watch(searchTerm, () => {
  if (searchTerm.value === searchRes.value) {
    return searchTerm.value;
  } else {
    return searchTerm.value;
  }
});
const searchFn = () => {
  searchTerm.value = searchRes.value;
  router.push({ path: "/ ", query: { search: searchRes.value } });
};

const dialogDelete = (idItem) => {
  dialog.value = true;
  router.push(`/${idItem}`);
};
const headers = ref([
  { title: t("firstName"), align: "start", sortable: true, key: "title" },
  { title: t("teamType"), key: "type", sortable: false },
  { title: t("description"), key: "description", sortable: false },
  { title: t("date"), key: "date", sortable: false },
  { title: t("status"), key: "status", sortable: false },
  { title: t("actions"), key: "actions", sortable: false },
]);
const data = ref([]);
const fetchDta = async () => {
  await apiData
    .get("/posts", {
      params: {
        search: searchRes.value,
      },
    })
    .then((res) => (data.value = res.data));
};
const deleteData = async () => {
  try {
    await apiData
      .delete(`/posts/${route.params.id}`)
      .then(() => {
        dialog.value = false;
        console.log(`Deleted post with ID ${route.params.id}`);
        router.push("/");
        fetchDta();
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    console.log(err);
  }

  // await apiData.delete(`/posts/${idD}`).then(() => {
  //   dialog.value = !dialog.value;
  //   console.log(`Deleted post with ID ${idD}`);
  //   fetchDta();
  // });
};
onMounted(() => {
  fetchDta();
});
</script>
