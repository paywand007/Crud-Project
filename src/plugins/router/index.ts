import { createRouter, createWebHashHistory } from "vue-router";
import ShowData from "../../view/staff/MainStaff.vue"
import AddEdit from "../../view/staff/AddEdit.vue"
import Team from '../../view/team/MainTeam.vue'
import StaffsView from '../../view/staff/StaffsView.vue'

const routes = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_UR),
  routes: [
    { path: "/:id?", component: ShowData, name: "showdata" },
    {
      path: "/addEdit/:id?",
      name: "edit",
      component: AddEdit,
    },
    {
      path: "/team/:id?",
      name: "team",
      component: Team,
    },
    {
      path: "/preview/:id",
      name: "preview",
      component: StaffsView,
    },
  ],
});
export default routes;
