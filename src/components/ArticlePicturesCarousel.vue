<template>
  <section class="carousel">
    <div class="pictures">
      <img class="shown" v-bind:key="n" ref="pictureElements"
           :src="getImgSrc(pictures)"
           :alt="n"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({ pictures: String })
const pictureElements = []

function getImgSrc (url: string) {
  return require('../assets/' + url)
}

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
