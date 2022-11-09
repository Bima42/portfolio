<template>
  <section v-for="(article, n) in articlesData" v-bind:key="n">
    <ArticleDetails :article="article"/>
  </section>
</template>

<script lang="ts" setup>
import ArticleDetails from '@/components/ArticleDetails.vue'
import articlesData from '@/assets/articles.json'
</script>

<style lang="scss" scoped>

</style>
