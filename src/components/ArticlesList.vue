<template>
  <ArticleHeader/>
  <section v-for="(article, n) in articlesData" v-bind:key="n">
    <section class="main-card">
      <ArticleDetails :article="article" :n="parseFloat(n)"/>
    </section>
  </section>
</template>

<script lang="ts" setup>
import ArticleHeader from '@/components/SiteHeader.vue'
import ArticleDetails from '@/components/ArticleDetails.vue'
import articlesData from '@/assets/articles.json'
</script>

<style lang="scss" scoped>
section {
  .main-card {
    margin: 0 25px 75px 20px;
  }
}

</style>
