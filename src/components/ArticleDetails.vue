<template>
  <h1>{{article.title}}</h1>
  <p>{{article.description}}</p>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({ article: {} })
</script>

<style lang="scss" scoped>

</style>
