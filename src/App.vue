<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { useHead } from "@vueuse/head";
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css",
    },
    {
      rel: "stylesheet",
      href: "//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic",
    },
    {
      rel: "stylesheet",
      href: "//demo.productionready.io/main.css",
    },
  ],
});
</script>

<template>
  <Navbar />
  <router-view></router-view>
  <Footer />
</template>
