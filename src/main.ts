import { createHead } from "@vueuse/head";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import { routes } from "./routes";

createApp(App)
  .use(createHead())
  .use(
    createRouter({
      history: createWebHistory(),
      routes: routes,
    })
  )
  .mount("#app");
