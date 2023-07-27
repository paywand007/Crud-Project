<template>
  <TeamSearchBar @search="performSearch" @refresh="refreshData" />
  <TeamList :data="data" @dialogDelete="deleteData" />
</template>
<script setup lang="ts">
import TeamList from "./TeamList.vue";
import apiData from "../../plugins/apiData.ts";
import { onMounted, ref } from "vue";
import TeamSearchBar from "./TeamSearchBar.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const data = ref([]);
const fetchData = async () => {
  await apiData.get(`/team`).then((res) => (data.value = res.data));
};
onMounted(() => {
  fetchData();
});
const deleteData = async (id: number) => {
  await apiData
    .delete(`/team/${id}`)
    .then(() => {
      fetchData();
    })
    .catch((error) => {
      fetchData();
      router.push("/team");
      console.error(error);
    });
};
const performSearch = async (search) => {
  console.log("click", search);
  try {
    await apiData
      .get(`/team?q=${search as string}`)
      .then((res) => (data.value = res.data));
  } catch (error) {
    console.error(error);
  }
};
const refreshData = () => {
  data.value = [];
  fetchData();
};
</script>
