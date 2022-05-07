<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useRealworldFetch } from "../../composables/useRealworldFetch";
import ArticlePreview from "../../components/ArticlePreview.vue";

const route = useRoute();

const user = ref<App.Models.User | null>(null);
const { data: userJson } = useRealworldFetch(
  `/profiles/${route.params.username}`
)
  .get()
  .json();
watch(userJson, () => {
  user.value = userJson.value?.profile ?? null;
});

const articles = ref<App.Models.Article[]>([]);
const {
  data: articlesJson,
  isFetching: isFetchingArticles,
  isFinished: isFinishedFetchingArticles,
} = useRealworldFetch(`/articles?author=${route.params.username}`).get().json();

watch(articlesJson, () => {
  articles.value = articlesJson.value?.articles ?? [];
});
</script>

<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img v-if="user?.image" :src="user?.image" class="user-img" />
            <h4 v-text="user?.username"></h4>
            <p v-text="user?.bio"></p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-minus-round" v-if="user?.following"></i>
              <i class="ion-plus-round" v-if="!user?.following"></i>
              &nbsp; Follow {{ user?.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active" href="">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Favorited Articles</a>
              </li>
            </ul>
          </div>

          <div v-if="isFetchingArticles">Loading articles</div>
          <div v-if="isFinishedFetchingArticles">
            <div v-if="articles.length === 0">
              <p>No articles yet</p>
            </div>
            <ArticlePreview
              v-for="article in articles"
              :key="article.slug"
              :article="article"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
