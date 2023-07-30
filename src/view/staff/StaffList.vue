<!-- StaffList.vue -->
<template>
  <v-data-table :headers="headers" :items="props.searchQuery">
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
          <span @click="dialogDeleteOpen(item.selectable.id)">
            <v-icon density="compact" style="cursor: pointer" color="red">
              mdi-delete
            </v-icon>

            <v-dialog v-model="dialog" max-width="500px" :persistent="true">
              <v-card>
                <v-card-title class="text-h5">{{
                  t("sueDelete")
                }}</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="pink-darken-4"
                    variant="text"
                    @click="cancele"
                    >{{ t("no") }}</v-btn
                  >
                  <v-btn
                    color="green-darken-4"
                    variant="text"
                    @click="deleteFn"
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

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const headers = ref([
  { title: t("firstName"), align: "start", sortable: true, key: "title" },
  { title: t("teamType"), key: "type", sortable: false },
  { title: t("description"), key: "description", sortable: false },
  { title: t("date"), key: "date", sortable: false },
  { title: t("status"), key: "status", sortable: false },
  { title: t("actions"), key: "actions", sortable: false },
]);

// Set the props type using the 'Props' interface

const props = defineProps(["searchQuery", "data"]);

const emit = defineEmits(["dialogDelete"]);
const dialog = ref(false);
const cancele = (): void => {
  dialog.value = false;
  router.push("/");
};
const dialogDeleteOpen = (idItem: number): void => {
  dialog.value = true;
  router.push(`/${idItem}`);
};
watch(dialog, (newVal): void => {
  localStorage.setItem("dialog", newVal.toString());
});
const deleteFn = (): void => {
  emit("dialogDelete", route.params.id);
  dialog.value = false;
};

onMounted(() => {
  const storedDialogVisible = localStorage.getItem("dialog");
  if (storedDialogVisible === "true") dialog.value = true;
});
</script>
