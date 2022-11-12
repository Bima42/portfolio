<template>
  <h1>{{ article.title }}</h1>
  <section class="article">
    <section class="left-card card">
      <ArticleDescription v-if="(n % 2 === 0)" :article='article' type="left" />
      <ArticlePicturesCarousel v-else :pictures='article.pictures' type="left" />
    </section>
    <section class="card">
      <ArticlePicturesCarousel v-if="(n % 2 === 0)" :pictures='article.pictures' type="right" />
      <ArticleDescription v-else :article='article' type="right" />
    </section>
  </section>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import ArticlePicturesCarousel from '@/components/ArticlePicturesCarousel.vue'
import ArticleDescription from '@/components/ArticleDescription.vue'

const props = defineProps({ article: { }, n: Number })
</script>

<style lang="scss" scoped>
h1 {
  margin: 20px;
  font-size: 40px;
}
.article {
  display: flex;
  min-height: 550px;

  .card {
    padding: 20px;
    width: 50%;
  }
}
</style>
