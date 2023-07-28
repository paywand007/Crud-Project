<template>
  <TeamSearchBar @search="handleSearch" @refresh="refreshData" />
  <TeamList :searchQuery="searchQuery" @dialogDelete="deleteData" />
</template>
<script setup lang="ts">
import TeamList from "./TeamList.vue";
import apiData from "../../plugins/apiData.ts";
import { onMounted, ref } from "vue";
import TeamSearchBar from "./TeamSearchBar.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const searchQuery = ref([]);

const fetchDta = async () => {
  await apiData.get("/team").then((res) => (searchQuery.value = res.data));
};
onMounted(() => {
  fetchDta();
});
const handleSearch = async (query: string) => {
  try {
    await apiData
      .get(`/team?q=${query}`)
      .then((res) => (searchQuery.value = res.data));
  } catch (error) {
    console.error(error);
  }
};
const deleteData = async (id: number) => {
  await apiData
    .delete(`/team/${id}`)
    .then(() => {
      fetchDta();
    })
    .catch((error) => {
 
    
      console.error(error);
    });
};
const refreshData = () => {
  searchQuery.value = [];
  fetchData();
};
</script>
