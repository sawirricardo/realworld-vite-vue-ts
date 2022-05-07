import { RouteRecordRaw } from "vue-router";
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Feed from "./pages/Feed.vue";
import UserShow from "./pages/User/Show.vue";
import UserCreate from "./pages/User/Create.vue";
import UserEdit from "./pages/User/Edit.vue";
import ArticleShow from "./pages/Article/Show.vue";
import ArticleCreate from "./pages/Article/Create.vue";
import ArticleEdit from "./pages/Article/Edit.vue";
import ArticleIndex from "./pages/Article/Index.vue";

export const routes: RouteRecordRaw[] = [
  <RouteRecordRaw>{ path: "/", component: Home, name: "home" },
  <RouteRecordRaw>{ path: "/login", component: Login, name: "login" },
  <RouteRecordRaw>{
    path: "/register",
    component: UserCreate,
    name: "users.create",
  },
  <RouteRecordRaw>{ path: "/feed", component: Feed, name: "feed" },
  <RouteRecordRaw>{
    path: "/profiles/:username",
    component: UserShow,
    name: "users.show",
  },
  <RouteRecordRaw>{
    path: "/settings",
    component: UserEdit,
    name: "users.edit",
  },
  <RouteRecordRaw>{
    path: "/articles",
    component: ArticleIndex,
    name: "articles.index",
  },
  <RouteRecordRaw>{
    path: "/articles/create",
    component: ArticleCreate,
    name: "articles.create",
  },
  <RouteRecordRaw>{
    path: "/articles/:slug/edit",
    component: ArticleEdit,
    name: "articles.edit",
  },
  <RouteRecordRaw>{
    path: "/articles/:slug",
    component: ArticleShow,
    name: "articles.show",
  },
];
