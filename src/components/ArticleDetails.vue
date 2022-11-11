<template>
  <h1>{{ article.title }}</h1>
  <section class="article">
    <section class="left-card card">
      <ArticleDescription v-if="(n % 2 === 0)" :article='article' />
      <ArticlePicturesCarousel v-else :pictures='article.pictures'/>
    </section>
    <section class="right-card card">
      <ArticlePicturesCarousel v-if="(n % 2 === 0)" :pictures='article.pictures'/>
      <ArticleDescription v-else :article='article' />
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
  margin: 10px;
  font-size: 50px;
}
.article {
  display: flex;
  min-height: 500px;

  .card {
    padding: 20px;
    width: 50%;
    height: 100%;
  }

  .left-card {
  }
  .right-card {
    overflow: auto; // TODO: remove me
  }
}
</style>
