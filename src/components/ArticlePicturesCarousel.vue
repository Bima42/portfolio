<template>
  <section>
    <img v-for='(picture, n) in pictures' v-bind:key="n" ref="pictureElements"
         :src="getImgSrc(picture)"
         :alt="n"
         style="display: none"
    />
  </section>
  {{ currentPicture + 1 }} / {{ pictures.length }}<br/>
  <button @click='changePicture(-1)'>&lt;</button>
  <button @click='changePicture(1)'>&gt;</button>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue'

const props = defineProps({ pictures: [] })
const pictureElements = []
const currentPicture = ref(0)

function getImgSrc (url: string) {
  return require('../assets/' + url)
}

function hidePicture (i: number) {
  pictureElements[i].style.display = 'none'
}

function displayPicture (i: number) {
  pictureElements[i].style.display = ''
}

function changePicture (by: number) {
  hidePicture(currentPicture.value)
  currentPicture.value += by
  if (currentPicture.value < 0) {
    currentPicture.value = props.pictures.length
  }
  if (currentPicture.value >= props.pictures.length) {
    currentPicture.value = 0
  }
  displayPicture(currentPicture.value)
}

onMounted(() => {
  displayPicture(0)
})
</script>

<style lang="scss" scoped>
section {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
