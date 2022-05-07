<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import CommentCard from "../../components/CommentCard.vue";
import { useRealworldFetch } from "../../composables/useRealworldFetch";
import ArticleShowMeta from "../../components/ArticleShowMeta.vue";
import { useAuth } from "../../composables/useAuth";

const comments = ref<App.Models.Comment[]>([]);
const { check, guest } = useAuth();
const route = useRoute();
const article = ref<App.Models.Article | null>(null);
const {
  data: articleJson,
  isFetching: isFetchingArticle,
  isFinished: isFinishedFetchingArticle,
} = useRealworldFetch(`/articles/${route.params.slug}`).get().json();
watch(articleJson, () => {
  article.value = articleJson.value?.article ?? null;
});

const {
  data: commentsJson,
  isFetching: isFetchingComments,
  isFinished: isFinishedFetchingComments,
} = useRealworldFetch(`/articles/${route.params.slug}/comments`).get().json();
watch(commentsJson, () => {
  comments.value = commentsJson.value?.comments ?? [];
});
</script>

<template>
  <div class="article-page" v-if="isFetchingArticle">Loading...</div>
  <div
    class="article-page"
    v-if="article !== null || isFinishedFetchingArticle"
  >
    <div class="banner">
      <div class="container">
        <h1 v-text="article?.title"></h1>

        <ArticleShowMeta :article="article!" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article?.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleShowMeta :article="article!" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <div class="text-center" style="padding: 3rem; text-align: center">
            <router-link :to="{ name: 'login' }">Login</router-link> to comment
          </div>
          <form v-if="check" class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img
                src="http://i.imgur.com/Qr71crq.jpg"
                class="comment-author-img"
              />
              <button class="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>

          <div v-if="isFetchingComments">Loading Comments...</div>

          <div v-if="isFinishedFetchingComments">
            <div v-if="comments.length === 0">No comments</div>
            <CommentCard
              v-for="comment in comments"
              :comment="comment"
              :can-update-comment="check"
              :key="comment.id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
