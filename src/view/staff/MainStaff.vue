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
import { onMounted, provide, ref } from "vue";
import apiData from "../../plugins/apiData.ts";

const searchQuery = ref([]);

const fetchDta = async () => {
  await apiData.get("/posts").then((res) => (searchQuery.value = res.data));
};
onMounted(() => {
  fetchDta();
});
const handleSearch = async (query: string) => {
  try {
    await apiData
      .get(`/posts?q=${query}`)
      .then((res) => (searchQuery.value = res.data));
  } catch (error) {
    console.error(error);
  }
};
const deleteData = async (id: number) => {
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
</script>
