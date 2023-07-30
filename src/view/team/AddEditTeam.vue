<template>
  <form>
    <v-card>
      <v-card-title>
        <span class="text-h5" v-if="route.params.id"> Edit </span>
        <span class="text-h5" v-else> Add </span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="img String"
                v-model="img"
                :error-messages="ereMsgName"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                label="Select"
                v-model="typeData"
                :error-messages="errtypeData"
                :items="[
                  'Frontend',
                  'Backend',
                  'Android',
                  'QA ',
                  'Scrum Master',
                  'UX UI ',
                ]"
              ></v-select
            ></v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="deleteDialog">
          {{ t("no") }}
        </v-btn>

        <v-btn color="blue-darken-1" variant="text" @click="submit">
          {{ route.params.id ? t("update") : t("add") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";

import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import i18n from "../../plugins/i18n.ts";
import apiData from "../../plugins/apiData.ts";
import { ref, watch } from "vue";

const { handleSubmit, setValues } = useForm({
  validationSchema: {
    img(value: string) {
      if (!value || !value.length) {
        return i18n.global.t("require");
      }
      return true;
    },
    typeData(value: string) {
      if (!value || !value.length) {
        return i18n.global.t("require");
      }
      return true;
    },
  },
});

const { value: img, errorMessage: ereMsgName } = useField<string>(
  "img",
  "required",
);

const { value: typeData, errorMessage: errtypeData } = useField<string>(
  "typeData",
  "required",
);
const data = ref([]);

const emit = defineEmits([
  "closeDialog",
  "updateData",
  "refreshData",
  "closeAddEdit",
]);
const dialog = ref(false);
const deleteDialog = () => {
  emit("closeDialog", dialog.value);
};

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const submit = handleSubmit(() => {
  if (!route?.params?.id) {
    addData();
  } else {
    patchData();
  }
});

const updateDataFetch = async () => {
  await apiData.get(`/team/${route.params.id}`).then((res) => {
    data.value = res.data;
    setValues({
      img: data.value.img,
      typeData: data.value.type,
    });
  });
};
const patchData = async () => {
  await apiData
    .patch(`/team/${route.params.id}`, {
      img: img.value,
      type: typeData.value,
    })
    .then(() => {
      deleteDialog();
      emit("refreshData", false);
      router.push("/team");
    });
};

watch(route, () => {
  if (route.params.id) return updateDataFetch();
  return {};
});
const f = ref(false);
const teamData = ref([]);
const addData = async () => {
  await apiData
    .post("/team", {
      id: Math.floor(Math.random() * 101),
      img: img.value,
      type: typeData.value,
    })
    .then((res) => {
      deleteDialog();
      emit("refreshData", f.value);
      teamData.value = res.data;
    });
};
</script>
