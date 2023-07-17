<template>
  <v-data-table :headers="headers" :items="data" :search="searchTerm">
    <template v-slot:top>
      <v-toolbar class="bg-white my-5">
        <v-toolbar-title><h1 class="pa-4">Staff</h1></v-toolbar-title>

        <v-text-field
          v-model="searchRes"
          label="Search here"
          class="mt-5 bg-white"
          clearable
          @keyup.enter="searchFn"
        >
        </v-text-field>

        <v-spacer></v-spacer>
        <RouterLink to="/addEdit">
          <v-btn
            color="primary"
            dark
            class="mx-2 ml-2 text-h5"
            @click="() => console.log('click')"
          >
            Add New Staff
          </v-btn></RouterLink
        >
      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.selectable.title }}</td>
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
            >mdi-pencil</v-icon
          >
          <span @click="() => (dialog = !dialog)">
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="() => (dialog = !dialog)"
                    >Cancel</v-btn
                  >
                  <v-btn
                    @click="deleteData(item.selectable.id)"
                    color="blue-darken-1"
                    variant="text"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card> </v-dialog
            ><v-icon density="compact" style="cursor: pointer">
              mdi-delete
            </v-icon></span
          >

          <v-btn
            @click="
              router.push({
                name: 'preview',
                params: {
                  id: item.selectable.id,
                },
              })
            "
            ><v-icon>mdi-eye</v-icon></v-btn
          >
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
<script lang="ts" setup>
import apiData from "./apiData.ts";
import { RouterLink, useRouter } from "vue-router";
const router = useRouter();
import { onMounted, ref, watch } from "vue";

const dialog = ref(false);

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
  router.push({ path: "/staff", query: { search: searchRes.value } });
};

const headers = ref([
  { title: "Full Name", align: "start", sortable: true, key: "title" },
  { title: "Team type", key: "type", sortable: false },
  { title: "Description", key: "description", sortable: false },
  { title: "Join Date", key: "date", sortable: false },
  { title: "Status", key: "status", sortable: false },
  { title: "Actions", key: "actions", sortable: false },
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
const deleteData = async (id) => {
  await apiData.delete(`/posts/${id}`).then(() => {
    fetchDta();
    dialog.value = !dialog.value;
    console.log(`Deleted post with ID ${id}`);
  });
};
onMounted(() => {
  fetchDta();
});
</script>
