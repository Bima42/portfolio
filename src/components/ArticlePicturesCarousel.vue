<template>
  <section class="carousel">
    <div class="pictures">
      <img class="hidden" v-for="(picture, n) in pictures" v-bind:key="n" ref="pictureElements"
           :src="getImgSrc(picture)"
           :alt="n"
      />
    </div>
    <div class="controls" v-if="pictures.length > 1">
      <button class="left" @click='changePicture(-1)'>&lt;</button>
      <button class="right" @click='changePicture(1)'>&gt;</button>
    </div>
  </section>
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
  pictureElements[i].classList.add('hidden')
  pictureElements[i].classList.remove('shown')
}

function displayPicture (i: number) {
  pictureElements[i].classList.add('shown')
  pictureElements[i].classList.remove('hidden')
}

function changePicture (by: number) {
  pictureElements[currentPicture.value].classList.remove('anim1')
  pictureElements[currentPicture.value].classList.remove('anim2')
  hidePicture(currentPicture.value)
  currentPicture.value += by
  if (currentPicture.value < 0) {
    currentPicture.value = props.pictures.length - 1
  }
  if (currentPicture.value >= props.pictures.length) {
    currentPicture.value = 0
  }
  displayPicture(currentPicture.value)
  if (by < 0) {
    pictureElements[currentPicture.value].classList.add('anim1')
  } else {
    pictureElements[currentPicture.value].classList.add('anim2')
  }
}

onMounted(() => {
  displayPicture(0)
})
</script>

<style lang="scss" scoped>
$controls-width: 80px;

.carousel {
  height: 100%;
  position: relative;

  .controls {
    width: 100%;
    position: absolute;
    top: 0;

    height: 100%;
    align-items: center;
    display: flex;
    justify-content: space-between;

    button {
      margin-left: 10px;
      margin-right: 10px;
      height: $controls-width;
      width: $controls-width;

      opacity: 20%;
      font-weight: bolder;
      font-size: 50px;
      color: white;
      transition: opacity 500ms;

      background: none;
      border: none;
      box-shadow: none;

      &:hover {
        cursor: pointer;
        display: initial;
        opacity: 100%;
      }

      &.left {
        left: 0;
      }

      &.right {
        right: 0;
      }
    }
  }
  .pictures {
    align-items: center;
    height: 100%;
    width: auto;
    margin: 0 $controls-width;
    position: relative;
    display: flex;
    justify-content: center;
    overflow: hidden;

    img {
      @keyframes entering-right {
        0% {
          right: 100%;
          opacity: 0%;
        }
        100% {
          right: 0;
          opacity: 100%;
        }
      }

      @keyframes entering-left {
        0% {
          left: 100%;
          opacity: 0%;
        }
        100% {
          left: 0;
          opacity: 100%;
        }
      }
      max-width: 100%;
      max-height: 100%;

      &.anim1 {
        animation-name: entering-left;
      }

      &.anim2 {
        animation-name: entering-right;
      }

      &.shown {
        display: block;
        position: relative;
        animation-duration: 0.5s;
        animation-timing-function: ease-in-out;
      }

      &.hidden {
        display: none;
      }
    }
  }
}

@media (orientation: portrait) {
  .carousel {
    margin-top: 40px;
    .controls {
      margin: 0;
      button:hover {
        opacity: 75%;
      }
    }
    .pictures {
      max-width: 100%;
      max-height: 100%;
      margin: 0;
    }
  }
}
</style>
