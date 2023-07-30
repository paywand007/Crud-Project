import { RouteRecordRaw } from "vue-router";
import MainStaff from "../MainStaff.vue";
import AddEdit from "../AddEditStaff.vue";

import StaffsView from "../StaffsView.vue";

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
