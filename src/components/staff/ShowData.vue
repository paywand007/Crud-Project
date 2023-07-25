<template>
  <div>
    <!-- I  StaffSearchBar component  -->
    <StaffSearchBar @search="handleSearch" @refresh="refreshData" />

    <!--   StaffList component  -->
    <StaffList :search-query="searchQuery" @dialogDelete="deleteData" />
  </div>
</template>

<script setup lang="ts">
import StaffList from "./StaffList.vue";
import StaffSearchBar from "./StaffSearchBar.vue";
import { onMounted, ref } from "vue";
import apiData from "../apiData.ts";
const searchQuery = ref([]);

const fetchDta = async () => {
  await apiData.get("/posts").then((res) => (searchQuery.value = res.data));
};
onMounted(async () => {
  fetchDta();
  console.log(searchQuery.value);
});
const handleSearch = async (query) => {
  // update fetchDta search query
  console.log("QUERY", query);
  try {
    await apiData
      .get(`/posts?q=${query}`)
      .then((res) => (searchQuery.value = res.data));
  } catch (error) {
    console.error(error);
  }
};
const deleteData = async (id) => {
  await apiData
    .delete(`/posts/${id}`)
    .then(() => {
      fetchDta();
    })
    .catch((error) => {
      console.error(error);
    });
};
const refreshData = () => {
  searchQuery.value = "";
  fetchDta();
};
onMounted(() => {
  fetchDta();
});
</script>

<style scoped></style>
