<template>
  <div class="description-wrapper" :class="type">
    <div class="header" v-html="article.header"></div>
    <div class="flip is-flipped" @click="clicked" :id="n">
      <div class="front">
        <div class="description" v-html="article.description"></div>
        <p class="footer"><u>See less</u></p>
      </div>
      <div class="back">
        <div class="resume" v-html="article.resume"></div>
        <div class="tags">
          <div v-for="tag in article.tags" v-bind:key="tag"
               class="tag">
            {{tag}}
          </div>
        </div>
        <p class="footer"><u>See more</u></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, toRefs } from 'vue'

const props = defineProps({ article: { }, type: String, n: Number })

function clicked (e: Event) {
  var card = document.getElementById(props.n)
  card.classList.toggle('is-flipped')
}

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
@media (orientation: portrait) {
  .description-wrapper {
    margin: 0;
    &.left {
      margin-left: 0;
    }
    &.right {
      margin-right: 0;
    }
  }
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
  &.is-flipped {
    .front {
      transform: rotateY(180deg);
      opacity: 0;
    }
    .back {
      opacity: 1;
      transform: rotateY(0deg);
    }
  }
}

.resume {
  $image-size: 3em;
  ::v-deep {
    h2,h3 {
      margin-bottom: 40px;
      margin-top: 40px;
    }
    img {
      max-width: $image-size;
      max-height: $image-size;
      margin: 0 0 40px 10px;
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
  background: #8d8d8d;
  border-radius: 30px;
  width: fit-content;
  padding: 5px 1em;
}

.description {
  text-align: left;
  line-height: 30px;
}

.footer {
  margin-bottom: 15px;
  cursor: pointer;
}

</style>
