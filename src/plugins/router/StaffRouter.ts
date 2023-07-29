// src/router/StaffRoute.ts
import { RouteRecordRaw } from "vue-router";
import MainStaff from "../../view/staff/MainStaff.vue";
import AddEdit from "../../view/staff/AddEditStaff.vue";

import StaffsView from "../../view/staff/StaffsView.vue";

const staffRoutes: RouteRecordRaw[] = [
  { path: "/:id?", component: MainStaff, name: "MainStaff" },
  {
    path: "/addEdit/:id?",
    name: "edit",
    component: AddEdit,
  },

  {
    path: "/preview/:id",
    name: "preview",
    component: StaffsView,
  },
];

export default staffRoutes;
