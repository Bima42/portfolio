<template>
    <section v-for="(article, n) in articlesData" v-bind:key="n">
      <section class="main-card">
        <ArticleDetails :article="article" :n="parseFloat(n)"/>
      </section>
    </section>
</template>

<script lang="ts" setup>
import ArticleDetails from '@/components/ArticleDetails.vue'
import articlesData from '@/assets/articles.json'
</script>

<style lang="scss" scoped>
section {
  .main-card {
    margin: 0 20px 150px 20px;
  }
}

</style>
