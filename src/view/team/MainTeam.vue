<template>
  <TeamSearchBar @search="handleSearch" />
  <TeamList :data="data" />
</template>
<script setup lang="ts">
import TeamList from "./TeamList.vue";

import TeamSearchBar from "./TeamSearchBar.vue";
import { ref } from "vue";

const data = ref("");
const handleSearch = (search: string) => {
  console.log("search", search);
  data.value = search;
  console.log("search", data.value.value);
};
</script>
