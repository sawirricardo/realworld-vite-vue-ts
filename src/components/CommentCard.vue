<script setup lang="ts">
defineProps<{ comment: App.Models.Comment; canUpdateComment: boolean }>();
</script>

<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text" v-text="comment.body"></p>
    </div>
    <div class="card-footer">
      <router-link
        :to="{
          name: 'users.show',
          params: { username: comment.author.username },
        }"
        class="comment-author"
      >
        <img
          v-if="comment.author.image"
          :src="comment.author.image"
          class="comment-author-img"
        />
      </router-link>
      &nbsp;
      <router-link
        :to="{
          name: 'users.show',
          params: { username: comment.author.username },
        }"
        class="comment-author"
        v-text="comment.author.username"
      ></router-link>
      <span
        class="date-posted"
        v-text="new Date(comment.createdAt).toDateString()"
      ></span>
      <span class="mod-options" v-if="canUpdateComment">
        <i class="ion-edit"></i>
        <i class="ion-trash-a"></i>
      </span>
    </div>
  </div>
</template>
