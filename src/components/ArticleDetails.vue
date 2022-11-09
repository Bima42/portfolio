<template>
  <h1>{{article.title}}</h1>
  <p>{{article.description}}</p>
  <ArticlePicturesCarousel :pictures='article.pictures'/>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import ArticlePicturesCarousel from '@/components/ArticlePicturesCarousel.vue'

const props = defineProps({ article: {} })
</script>

<style lang="scss" scoped>

</style>
