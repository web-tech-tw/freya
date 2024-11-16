import {createRouter, createWebHashHistory} from "vue-router";
import {useProfile, redirectLogin} from "../plugins/profile.js";

const routes = [
  {
    path: "/",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/profile",
    component: () => import("../views/ProfileView.vue"),
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
    path: "/rooms/:roomCode/submissions",
    component: () => import("../views/RoomSubmissionView.vue"),
  },
  {
    path: "/rooms/:roomCode/administrators",
    component: () => import("../views/RoomAdminView.vue"),
  },
  {
    path: "/ti/g2/:roomCode",
    component: () => import("../views/TicketRoomView.vue"),
  },
  {
    path: "/ti/g2a/:invitationCode",
    component: () => import("../views/TicketAdminView.vue"),
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

router.beforeEach((to, _, next) => {
  if (
    to.path === "/" ||
    to.path === "/terms" ||
    to.path.startsWith("/ti/g2/")
  ) {
    next();
    return;
  }

  const profile = useProfile();
  if (!profile) {
    redirectLogin(true);
    return;
  }

  next();
});

export default router;
