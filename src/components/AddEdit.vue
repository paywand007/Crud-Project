<script setup lang="ts">
import apiData from "./apiData.ts";
import { onMounted, ref } from "vue";
import { useForm, useField } from "vee-validate";
import { useRoute, useRouter } from "vue-router";
import { da } from "vuetify/locale";

const route = useRoute();
const { id } = route.params;
const { handleSubmit, setValues } = useForm();
const router = useRouter();
const data = ref({});
const { value: fName, errorMessage: ereMsgName } = useField<string>(
  "name",
  "required",
);
const { value: lName, errorMessage: ereMsglName } = useField<string>(
  "lname",
  "required",
);
const { value: typeData, errorMessage: ereMsgType } = useField<string>(
  "typeData",
  "required",
);

const { value: status, errorMessage: ereMsgActive } = useField<boolean>(
  "status",
  "required",
);

const { value: description, errorMessage: ereMsgDescription } =
  useField<string>("description");
// const { value: date, errorMessage: ereMsgDate } = useField<string>("date");
onMounted(async () => {
  await apiData.get(`/posts/${id}`).then((res) => {
    data.value = res.data;
    console.log(data.value);
    setValues(data.value);
    console.log(
      setValues({
        email: "example@gmail.com",
        password: "p@a$$W0rD",
      }),
    );
  });
});

const addData = async () => {
  await apiData
    .post("/posts", {
      id: Math.floor(Math.random() * 101),
      title: fName.value + " " + lName.value,
      date: new Date(),
      type: typeData.value,
      status: status.value,
      description: description.value,
    })
    .then(() => {
      router.back();
    });
};

const updateData = async () => {
  await apiData
    .patch(`/posts/${parseInt(id)}`, {
      title: fName.value + " " + lName.value,
      type: typeData.value,
      status: status.value,
      description: description.value,
    })
    .then((res) => {
      data.value = res.data;
      router.back();
    });
};
const submit = handleSubmit(() => {
  if (id) {
    updateData();
  } else {
    addData();
  }
});
</script>

<template>
  <v-form @submit.prevent="submit">
    {{ data }}
    <v-container>
      <v-toolbar class="bg-white ma-5"
        ><h1 class="text-h3 ml-5">staff</h1>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-switch
          v-model="status"
          :error-messages="ereMsgActive"
          label="Is Active"
        ></v-switch>
        {{ status }}</v-toolbar
      ></v-container
    >
    <v-container class="pa-8 mt-10">
      <h2 class="ma-4">
        Welecome Mrs or Mr
        <span class="text-blue-darken-2 text-h3">{{ data.title }}</span>

        please fill the text fileds to update your information
      </h2>
      <v-row>
        <v-col cols="12" md="4">
          {{ fName }}
          <v-text-field
            label="First name"
            v-model="fName"
            :error-messages="ereMsgName"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            label="Last name"
            v-model="lName"
            :error-messages="ereMsglName"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="typeData"
            :value="data.type"
            label="Select"
            :items="[
              'Frontend',
              'Backend',
              'Android',
              'QA ',
              'Scrum Master',
              'UX UI ',
            ]"
            :error-messages="ereMsgType"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field label=" Date" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-textarea v-model="description" label="Description"></v-textarea
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
          <v-btn block rounded="xl" size="x-large" color="pink">Cancel</v-btn>
        </v-col></v-row
      >
    </v-container>
  </v-form>
</template>

<style scoped></style>
