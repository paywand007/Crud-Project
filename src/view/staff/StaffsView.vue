<script setup lang="ts">
import { useRoute } from "vue-router";
import apiData from "../../plugins/apiData.ts";
import { onMounted, ref } from "vue";

const route = useRoute();
const { id } = route.params;
const data = ref([]);
onMounted(async () => {
  await apiData.get(`/posts/${id}`).then((res) => (data.value = res.data));
});
</script>

<template>
  <v-container>
    <v-toolbar class="bg-white ma-5"
      ><h1 class="text-h3 ml-5">staff</h1>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-switch
        v-model="data.status"
        :readonly="true"
        label="Active"
      ></v-switch>
    </v-toolbar>
  </v-container>
  <v-container class="pa-8 mt-10">
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          label="First name"
          v-model="data.firstName"
          :readonly="true"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          label="Last name"
          v-model="data.lastName"
          :readonly="true"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          v-model="data.type"
          :readonly="true"
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
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          label=" Date"
          :readonly="true"
          v-model="data.date"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-textarea
          v-model="data.description"
          :readonly="true"
          label="Description"
        ></v-textarea
      ></v-col>
    </v-row>
  </v-container>
</template>
