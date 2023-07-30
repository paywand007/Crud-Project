<template>
  <TeamSearchBar @search="handleSearch" @add="handl" @refresh="refreshData" />
  <TeamList :data="data" :bolData="bolData" />
</template>
<script setup lang="ts">
import TeamList from "./TeamList.vue";
import TeamSearchBar from "./TeamSearchBar.vue";
import { ref } from "vue";

const data = ref("");
const bolData = ref("");
const handleSearch = (search: string) => {
  data.value = search;
};
const handl = (val) => {
  console.log(bolData.value, val);
  bolData.value = val;
  console.log(bolData.value, val);
};
const refreshData = () => {
  data.value = "";
};
</script>
