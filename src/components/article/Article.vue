<template lang="pug">
.container(v-if="isVisible")
  q-card.card-style.col-xs-12
    q-parallax(:height="155" src="../../assets/background-article.jpg")
      .column.absolute-top.custom-caption.q-mb-lg
        span.text-white.text-bold.to-mobile {{ title }}
        .language-container
          template(v-for="(key, index) in countTechs" :key="key")
            div(style="padding: 0 2px 0 2px")
              q-img.image-language(:src="urlImage[index]")

      div.text-subtitle1.text-bold.text-white Data: {{ datePublication }}
  
    .row.justify-center.absolute-bottom
      q-btn(@click="goToArticleDetail" flat size="14px" label="Ler mais...")
</template>

<script lang="ts">
import moment from 'moment'
import { defineComponent, PropType } from 'vue'
import { Article } from 'src/models/ArticleModel'

export default defineComponent({
  name: 'Card-Article',
  props: {
    article: { 
      required: true,
      type: Object as PropType<Article>
    }
  },
  computed: {
    isVisible (): boolean {
      return this.article.isVisible
    },
    notion_id (): string {
      return this.article.notion_id
    },
    datePublication (): string {
      return moment(this.article.datePublication).format('DD/MM/YYYY')
    },
    title (): string {
      return this.article.title
    },
    urlImage (): string[] {
      return this.article.technologies.map(obj => obj.url_image)
    },
    countTechs (): number {
      return this.article.technologies.length
    }
  },
  methods: {
    goToArticleDetail () {
      this.$router.push({ name: 'article-detail', params: { id: this.article.id, notion_id: this.notion_id } })
    }
  }
})
</script>

<style lang="scss" scoped>
.image-language {
  width: 48px;
  height: 48px;
}

.language-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
}

.card-style {
  height: 195px;
  width: 550px;
  border: 1px solid rgb(180, 172, 172);
}

.text-subtitle1 {
  position: absolute;
  right: 5px;
  bottom: 15px;
}

.to-mobile {
  font-size: 1.9rem;
}

.custom-caption {
  text-align: center;
  padding: 10px;
  top: 10%;
  background-color: #0b0b2999;
}

.container {
  font-family: 'Roboto Condensed', sans-serif;
}

.card-section {
  background-color: rgba(0, 0, 0, .4);
  background: #fff;
  height: 85px;
}

.botao-ler-mais:hover {
  color: #ccc;
}

@media only screen and (min-width: 1490px) {
  .card-style {
    height: 195px;
    width: 675px;
  }

  .image-language {
    width: 58px;
    height: 58px;
  }

  .custom-caption {
    padding: 5px;
    top: 10%;
  }
}

@media only screen and (max-width: 499px) {
  .image-language {
    width: 24px;
    height: 24px;
  }

  .hidenImage {
    display: none;
  }

  .card-style {
    height: 200px;
    width: 375px;
  }

  .language-container {
    // display: none;
    position: absolute;
    bottom: 5px;
    right: 5px;
  }

  .to-mobile {
    font-size: 1.6rem;
  }

  .subtitle {
    margin-top: 5px;
    line-height: 20px;
    font-size: 15px;
  }

  .custom-caption {
    height: 75%;
    top: 13%;
  }

  .text-subtitle1 {
    position: relative;
    display: flex;
    bottom: -32%;
  }
}
</style>
