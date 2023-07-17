<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    :footer-props="$t('dataFooter')"
  >
    <template v-slot:top>
      <v-toolbar>
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          dark
          class="mb-2"
          @click="() => console.log('click')"
        >
          Add New Staff
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.selectable.id }}</td>
        <td>{{ item.selectable.title }}</td>
        <!--        <t{{ item.selectable.author }}d></td>-->

        <td>
          <div class="text-center">
            <v-btn color="primary" @click="dialog = true"> Opens Dialog </v-btn>

            <v-dialog v-model="dialog" width="auto">
              <v-card>
                <v-card-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" block @click="dialog = false"
                    >Close Dialog</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </td>
      </tr></template
    >
    <template v-slot:no-data>
      <v-btn color="red" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script setup>
import { ref, computed, watch, onMounted, nextTick } from "vue";
import apiData from "./apiData.ts";
import { useI18n } from "vue-i18n";

const search = ref("");
const { locale, t } = useI18n();
const itemsPerPage = ref(10);

const dialog = ref(false);
const dialogDelete = ref(false);
const headers = [
  { title: "Full Name", align: "start", sortable: false, key: "name" },
  { title: "Team type", key: "calories", sortable: false },
  { title: "Description", key: "fat", sortable: false },
  { title: "Join Date", key: "carbs", sortable: false },
  { title: "Status", key: "protein", sortable: false },
  { title: "Actions", key: "actions", sortable: false },
];
const desserts = ref([]);
const editedIndex = ref(-1);
const editedItem = ref({
  name: "",
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
});
const defaultItem = {
  name: "",
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
};

const formTitle = computed(() => {
  return editedIndex.value === -1 ? "New Item" : "Edit Item";
});

const editItem = (item) => {
  editedIndex.value = desserts.value.indexOf(item);
  editedItem.value = { ...item };
  dialogVisible.value = true;
};

const deleteItem = (item) => {
  editedIndex.value = desserts.value.indexOf(item);
  editedItem.value = { ...item };
  dialogDelete.value = true;
};

const deleteItemConfirm = () => {
  desserts.value.splice(editedIndex.value, 1);
  closeDelete();
};

const close = () => {
  dialogVisible.value = false;
  nextTick(() => {
    editedItem.value = { ...defaultItem };
    editedIndex.value = -1;
  });
};

const closeDelete = () => {
  dialogDelete.value = false;
  nextTick(() => {
    editedItem.value = { ...defaultItem };
    editedIndex.value = -1;
  });
};

const save = async () => {
  await apiData.post(
    "/posts",
    {
      id: 3,
      title: "s",
      author: "code",
    }.then((res) => (desserts.value = res.data)),
  );
  //desserts.value.push(editedItem.value);
  console.log("add items");

  close();
};

// Watch dialog and dialogDelete properties
watch(dialog, (val) => {
  if (!val) {
    close();
  }
});

watch(dialogDelete, (val) => {
  if (!val) {
    closeDelete();
  }
});
const e = ref([]);
const add = async () => {
  await apiData
    .post("/posts", {
      id: 44,
      title: "Aaagw",
      author: "paaaaaaaaw",
    })
    .then((res) => (e.value = res.data));
  console.log(e);
};
// Initialize the data on component creation
onMounted(async () => {
  // await apiData.post('/posts',{
  //   id: 3,
  //   title: "mson",
  //   author: "code"
  // }).then(res=> desserts.value= res.data)
  await apiData.get("/posts").then((res) => (desserts.value = res.data));
  console.log("++++", editedItem);
});
</script>
