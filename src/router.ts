import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import StaffRouter from "./view/staff/Router/StaffRouter.ts";
import TeamRouter from "./view/team/Router/TeamRouter.ts";
const routes: RouteRecordRaw[] = [...StaffRouter, ...TeamRouter];
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_UR),
  routes,
});
export default router;
