import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/rooms/create",
    component: () => import("../views/RoomCreateView.vue"),
  },
  {
    path: "/rooms",
    component: () => import("../views/RoomListView.vue"),
  },
  {
    path: "/rooms/:roomCode",
    component: () => import("../views/RoomManageView.vue"),
  },
  {
    path: "/submissions/:roomCode",
    component: () => import("../views/SubmissionView.vue"),
  },
  {
    path: "/terms",
    component: () => import("../views/TermsView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/NotFoundView.vue"),
  },
];

const router = createRouter({
  scrollBehavior: () => ({top: 0}),
  history: createWebHashHistory(),
  routes,
});

export default router;
