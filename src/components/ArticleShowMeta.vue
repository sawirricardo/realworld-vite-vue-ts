<script setup lang="ts">
defineProps<{ article: App.Models.Article }>();
</script>

<template>
  <div class="article-meta">
    <router-link
      :to="{
        name: 'users.show',
        params: { username: article?.author.username },
      }"
      ><img v-if="article?.author.image" :src="article?.author.image"
    /></router-link>
    <div class="info">
      <router-link
        :to="{
          name: 'users.show',
          params: { username: article?.author.username },
        }"
        class="author"
        v-text="article?.author.username"
      ></router-link>
      <span
        class="date"
        v-text="new Date(article?.createdAt).toDateString()"
      ></span>
    </div>
    <button class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round" v-if="!article?.author.following"></i>
      <i class="ion-minus-round" v-if="article?.author.following"></i>
      &nbsp; Follow {{ article?.author.username }}
      <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary">
      <i class="ion-heart" v-if="!article?.favorited"></i>
      &nbsp; Favorite Post
      <span class="counter">({{ article?.favoritesCount }})</span>
    </button>
  </div>
</template>
