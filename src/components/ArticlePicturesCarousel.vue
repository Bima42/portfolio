<template>
  <template v-for='(picture, n) in pictures' v-bind:key="n">
    <img :src="getImgSrc(picture)" alt="salut"/>
  </template>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({ pictures: [] })

function getImgSrc (image: string) {
  return require('../assets/' + image)
}
</script>

<style lang="scss" scoped>

</style>
