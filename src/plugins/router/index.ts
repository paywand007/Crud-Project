import { createRouter, createWebHashHistory } from "vue-router";
import MainStaff from "../../view/staff/MainStaff.vue";
import AddEdit from "../../view/staff/AddEdit.vue";

import StaffsView from "../../view/staff/StaffsView.vue";
import MainTeam from "../../view/team/MainTeam.vue";

const routes = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_UR),
  routes: [
    { path: "/:id?", component: MainStaff, name: "showdata" },
    {
      path: "/addEdit/:id?",
      name: "edit",
      component: AddEdit,
    },
    {
      path: "/team/:id?",
      name: "team",
      component: MainTeam,
    },
    {
      path: "/preview/:id",
      name: "preview",
      component: StaffsView,
    },
  ],
});
export default routes;
