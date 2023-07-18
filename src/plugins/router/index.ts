import { createRouter, createWebHashHistory } from "vue-router";
import ShowData from "../../components/ShowData.vue";
import AddEdit from "../../components/AddEdit.vue";
import Team from "../../components/Team.vue";
import StaffsView from "../../components/StaffsView.vue";

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
