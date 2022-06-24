<template lang="pug">
q-carousel.carousel-image(v-model="slide")
  q-carousel-slide(name="first" img-src="../../assets/image-background.jpg")
    .absolute-bottom.custom-caption
      .text-h2.font-text Aprendendo da melhor maneira
      .row.justify-center.items-center
        .text-subtitle1.font-text Blog do Dev
        .q-ml-sm
          q-img.text-white(src="../../assets/developer.png" height="45px" width="45px")
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Logo-Blog',
  data () {
    return {
      slide: 'first'
    }
  },
})
</script>


<style lang="scss" scoped>
.font-text {
  font-family: 'Roboto Condensed', sans-serif;
}

.carousel-image {
  height: 250px;
}

.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, .6);
}
</style>