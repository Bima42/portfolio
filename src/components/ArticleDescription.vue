<template>
  <div class="description-wrapper" :class="type">
    <div class="header" v-html="article.header"></div>
    <div class="flip" >
      <div class="front">
        <div class="description" v-html="article.description"></div>
      </div>
      <div class="back">
        <div class="resume" v-html="article.resume"></div>
        <div class="tags">
          <div v-for="tag in article.tags" v-bind:key="tag"
               class="tag"
          >
            {{tag}}
          </div>
        </div>
      </div>
    </div>
    <div class="githubLink">
      <a :href="article.githubLink">
        <svg width="64" height="64" aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" fill="#fff">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({ article: { }, type: String })

</script>

<style lang="scss" scoped>
.description-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  &.left {
    margin-left: 20%;
  }
  &.right {
    margin-right: 20%;
  }
}
.githubLink {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;

}
.header {
  text-align: left;

  ::after {
    content: "";
    display: block;
    width: 30%;
    padding-top: 8px;
    border-bottom: 2px solid #f9dd94;
  }
}

.flip {
  position: relative;

  > .front,
  > .back {
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition-timing-function: cubic-bezier(.175, .885, .32, 1.275);
    transition-duration: .5s;
    transition-property: transform, opacity;
  }

  > .front {
    transform: rotateY(0deg);
  }

  > .back {
    position: absolute;
    opacity: 0;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    transform: rotateY(-180deg);
  }

  &:hover {
    > .front {
      transform: rotateY(180deg);
      opacity: 0;
    }

    > .back {
      opacity: 1;
      transform: rotateY(0deg);
    }
  }
}

.resume {
  $image-size: 3em;
  ::v-deep {
    h2,h3 {
      margin-top: 30px;
    }
    img {
      max-width: $image-size;
      max-height: $image-size;
      margin: 10px;
    }
    a {
      color: white;

      &:visited {
        color: white;
      }
    }
  }
}

.tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
}

.tag {
  background: #aaa;
  border-radius: 30px;
  width: fit-content;
  padding: 5px 1em;
}

.description {
  text-align: left;
  line-height: 30px;
}

</style>
