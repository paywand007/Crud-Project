<script setup lang="ts">
import apiData from "../../plugins/apiData.ts";
import { onMounted, ref } from "vue";
import { useForm, useField } from "vee-validate";
import { useRoute, useRouter } from "vue-router";

import { useI18n } from "vue-i18n";

const { t } = useI18n();
const route = useRoute();
const { id } = route.params;
const { handleSubmit, setValues, resetForm } = useForm({
  validationSchema: {
    fName(value) {
      if (!value || !value.length) {
        return "This field is required";
      }
      return true;
    },
    lName(value) {
      if (!value || !value.length) {
        return "This field is required";
      }
      return true;
    },
    typeData(value) {
      if (!value || !value.length > 0) {
        return "This field is required";
      }
      return true;
    },
    status(value) {
      if (!value || !value.length) return true;
      return true;
    },
    description(value) {
      if (!value || !value.length) return true;
      return true;
    },
    date(value) {
      if (!value || !value.length > 0) {
        return "This field is required";
      }
      return true;
    },
  },
});
const router = useRouter();
const data = ref({});
const fName = useField<string>("fName");
const lName = useField<string>("lName");
const typeData = useField<string>("typeData");
const status = useField<boolean>("status");
const description = useField<string>("description");
const date = useField<string>("date");

const fetchData = async () => {
  await apiData.get(`/posts/${id}`).then((res) => {
    data.value = res.data;

    setValues({
      status: data.value.status,
      fName: data.value.firstName,
      lName: data.value.lastName,
      typeData: data.value.type,
      description: data.value.description,
      date: data.value.date,
    });
  });
};
// const { value: date, errorMessage: ereMsgDate } = useField<string>("date");
onMounted(() => {
  id ? fetchData() : false;
});
const addData = async () => {
  await apiData
    .post("/posts", {
      id: Math.floor(Math.random() * 101),
      firstName: fName?.value.value,
      lastName: lName?.value.value,
      date: date.value.value,
      type: typeData.value.value,
      status: status.value.value,
      description: description.value.value,
    })
    .then((res) => {
      fetchData();
      data.value = res.data;
      console.log("added");
      router.back();
    });
};
const updateData = async () => {
  await apiData
    .patch(`/posts/${parseInt(id as string)}`, {
      firstName: fName?.value.value,
      lastName: lName?.value.value,
      type: typeData.value.value,
      status: status.value.value,
      date: date.value.value,
      description: description.value.value,
    })
    .then((res) => {
      fetchData();
      data.value = res.data;
      router.back();
      fetchData();
    });
};
const submit = handleSubmit(async () => {
  if (id) {
    await updateData();
  } else {
    await addData();
  }
});
const canceleFn = () => {
  resetForm({
    fName: "",
    lName: "",
    typeData: "",
    status: "",
    date: "",
    description: "",
  });
  router.back();
};
</script>

<template>
  <v-form @submit.prevent="submit">
    <v-container>
      <v-toolbar class="bg-white ma-5"
        ><h1 class="text-h3 ml-5">{{ $t("staff") }}</h1>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-switch
          v-model="status.value.value"
          color="pink-darken-4"
        ></v-switch> </v-toolbar
    ></v-container>
    <v-container class="pa-8 mt-10">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            label="First name"
            v-model="fName.value.value"
            :error-messages="fName.errorMessage.value"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            label="Last name"
            v-model="lName.value.value"
            :error-messages="lName.errorMessage.value"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="typeData.value.value"
            :error-messages="typeData.errorMessage.value"
            label="Select"
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
            v-model="date.value.value"
            label=" Date"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-textarea
            v-model="description.value.value"
            label="Description"
          ></v-textarea
        ></v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" md="2" class="d-flex" style="gap: 10px">
          <v-btn
            v-if="id"
            rounded="xl"
            size="x-large"
            color="primary"
            type="submit"
            >Update
          </v-btn>
          <v-btn
            v-else
            rounded="xl"
            size="x-large"
            color="primary"
            type="submit"
            class=""
            >Save
          </v-btn>
          <v-btn rounded="xl" size="x-large" color="pink" @click="canceleFn"
            >Cancel</v-btn
          >
        </v-col></v-row
      >
    </v-container>
  </v-form>
</template>
