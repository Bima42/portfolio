<template>
  <h1>{{ article.title }}</h1>
  <section class="article">
    <section class="left-card card">
      <ArticleDescription v-if="(n % 2 === 0) || isPhone()" :article='article' :n="n" type="left" />
      <ArticlePicturesCarousel v-else :pictures='article.pictures' type="left" />
    </section>
    <section class="card">
      <ArticlePicturesCarousel v-if="(n % 2 === 0) || isPhone()" :pictures='article.pictures' type="right" />
      <ArticleDescription v-else :article='article' :n="n" type="right" />
    </section>
  </section>
  <div class="githubLink">
    <a :href="article.githubLink">
      <svg width="64" height="64" aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" fill="#fff">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
      </svg>
    </a>
  </div>
  <hr>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import ArticlePicturesCarousel from '@/components/ArticlePicturesCarousel.vue'
import ArticleDescription from '@/components/ArticleDescription.vue'

function isPhone () {
  return window.matchMedia('(orientation: portrait)').matches
}

const props = defineProps({ article: { }, n: Number })
</script>

<style lang="scss" scoped>
h1 {
  margin: 10px 10px 50px 10px;
  font-size: 40px;
}

.article {
  display: flex;
  min-height: 550px;

  .card {
    width: 50%;
  }
}

hr {
  margin-top: 30px;
  width: 70%;
  border: 1px solid #f9dd94;
}

@media (orientation: portrait) {
  .githubLink {
    margin-top: 30px;
  }
  .article {
    flex-direction: column;
    .card {
      padding: 0 0 0 0;
      width: 100%;
    }
  }
}

</style>
