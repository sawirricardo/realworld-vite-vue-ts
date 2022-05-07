<script setup lang="ts">
import { ref, watch } from "vue";
import { useRealworldFetch } from "../composables/useRealworldFetch";
import ArticlePreview from "../components/ArticlePreview.vue";
import { useAuth } from "../composables/useAuth";
const tags = ref<String[]>([]);
const {
  data: tagsJson,
  isFetching: isFetchingTags,
  isFinished: isFinishedFetchingTags,
} = useRealworldFetch("/tags").get().json();
watch(tagsJson, () => {
  tags.value = tagsJson.value?.tags ?? [];
});

const articles = ref<App.Models.Article[]>([]);
const {
  data: articlesJson,
  isFetching: isFetchingArticles,
  isFinished: isFinishedFetchingArticles,
} = useRealworldFetch("/articles").get().json();
watch(articlesJson, () => {
  articles.value = articlesJson.value?.articles ?? [];
});

const { check, guest } = useAuth();
</script>

<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link disabled"
                  :to="{ name: guest ? 'home' : 'feed' }"
                  :exact-active-class="guest ? '' : 'active'"
                  v-bind:disabled="guest"
                  >Your Feed</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'home' }"
                  exact-active-class="active"
                  >Global Feed</router-link
                >
              </li>
            </ul>
          </div>

          <div v-if="isFetchingArticles">Loading Articles...</div>
          <div v-if="isFinishedFetchingArticles">
            <div v-if="articles.length === 0"></div>
            <ArticlePreview
              v-for="article in articles"
              :key="article.slug"
              :article="article"
            />
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list" v-if="tags.length > 0">
              <router-link
                v-for="tag in tags"
                :key="tag"
                :to="{ name: 'articles.index', query: { tag: tag } }"
                class="tag-pill tag-default"
                v-text="tag"
              ></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
