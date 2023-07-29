<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <span>
        <v-icon @click="deleteDialog" color="pink-darken-4">
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
</template>

<script setup lang="ts">
import { ref } from "vue";
import { watch } from "vue";
import apiData from "../../plugins/apiData.ts";
import { useRoute } from "vue-router";
const route = useRoute();
const data = ref([]);
const fetchData = async () => {
  await apiData
    .get(`/team/${route.params.id}`)
    .then((res) => (data.value = res.data));
};

const emit = defineEmits(["closeDialog"]);
watch(route, () => {
  if (route.params.id) return fetchData();
  return {};
});
const dialog = ref(false);
const deleteDialog = () => {
  emit("closeDialog", dialog.value);
};
</script>
