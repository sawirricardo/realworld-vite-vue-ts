<script setup lang="ts">
defineProps<{ article: App.Models.Article }>();
</script>

<template>
  <div class="article-preview">
    <div class="article-meta">
      <router-link
        :to="{
          name: 'users.show',
          params: { username: article.author.username },
        }"
        ><img v-if="article.author.image" :src="article.author.image" />
      </router-link>
      <div class="info">
        <router-link
          :to="{
            name: 'users.show',
            params: { username: article.author.username },
          }"
          class="author"
          v-text="article.author.username"
        ></router-link>
        <span
          class="date"
          v-text="new Date(article.createdAt).toDateString()"
        ></span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <router-link
      :to="{ name: 'articles.show', params: { slug: article.slug } }"
      class="preview-link"
    >
      <h1 v-text="article.title"></h1>
      <p v-text="article.description"></p>
      <span>Read more...</span>
      <ul v-if="article.tagList.length > 0" class="tag-list">
        <li
          v-for="tag in article.tagList"
          :key="tag"
          v-text="tag"
          class="tag-default tag-pill tag-outline"
        ></li>
      </ul>
    </router-link>
  </div>
</template>
