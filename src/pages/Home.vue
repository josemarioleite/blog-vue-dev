<template lang="pug">
.container-home
  .components-header.row.justify-center.items-center.col-12
    .name-main(v-if="isActived.actived")
      q-chip.col-sm-6.col-xs-12(removable @remove="resetPagination" v-model="isActived.actived" outline square color="white" text-color="dark" size="20px")
        div {{ isActived.tech.name }}

    q-input.col-sm-6.col-xs-12.input-component(v-if="lengthArticles > 0" @keypress="filterArticles" v-model="filter" 
      dark placeholder="O que deseja saber ?" label="Pesquisar artigos" color="white")
      template(v-slot:append)
        q-icon(name="search")

  .template-article
    template.template-article(v-for="(key, index) in lengthArticles" :key="key")
      .row.justify-center.col-12
        ArticleComponent.q-mb-md.q-mt-sm(:article="articles[index]")

  .pagination-component
    q-pagination.row.justify-center.q-pb-md(
      v-model="pagination.pageIndex"
      @update:model-value="getArticles"
      :max="pagesNumber"
      :max-pages="pagination.pageSize"
      :boundary-numbers="false"
      direction-links
      active-color="blue"
    )

  q-inner-loading(
    :showing="isLoading"
    label="Espere um momento"
    label-class="text-white"
    label-style="font-size: 1.7em"
  )
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { defineComponent } from 'vue'
import ArticleComponent from '../components/article/Article.vue'

export default defineComponent({
  name: 'Home',
  components: { ArticleComponent },
  data () {
    return {
      disableButtonSearch: true,
      filter: '',
    }
  },
  computed: {
    ...mapState(['articles', 'isLoading', 'totalRow', 'lengthArticles', 'pagination', 'isMainActived']),
    pagesNumber () {
      return Math.ceil(Number(this.totalRow) / this.pagination.pageSize)
    },
    lengthArticles () {
      return this.articles.length
    },
    isActived () {
      return {
        actived: this.isMainActived.isActived,
        tech: this.isMainActived.technologySelected
      }
    }
  },
  methods: {
    ...mapMutations(['changeStateMainActived', 'changeStateMainSelected', 'showMain']),
    async getArticles () {
      await this.$store.dispatch('getArticles', this.pagination)
    },
    filterArticles () {
      if (this.filter !== null || this.filter !== '' || this.filter !== undefined) {
        this.errorInput = false
        this.pagination.pageIndex = this.pagination.pageIndex
        this.pagination.filter = this.filter
        this.getArticles()
      }
    },
    async resetPagination () {
      this.changeStateMainActived(false)
      this.changeStateMainSelected(null)
      this.$store.dispatch('resetPagination')
      await this.getArticles()
    }
  },
  watch: {
    filter: function (val) {
      if (val !== '') {
        this.disableButtonSearch = false
      } else {
        this.disableButtonSearch = true
        this.pagination.filter = ''
        this.getArticles()
      }
    }
  },
  async created () {
    await this.getArticles()
    await this.showMain()
    await this.$store.dispatch('isLogin')
  }
})
</script>

<style lang="scss" scoped>
.container-home {
  background: $night;
  min-height: 1220px;
}

.name-main {
  margin-top: 15px;
}

.pagination-model {
  position: absolute;
  bottom: 0;
}

.input-component {
  width: 250px;
  position: absolute;
  top: 5px;
  right: 10px;
}

.pagination-component {
  width: 100%;
  position: absolute;
  bottom: -10px;
}

@media only screen and (max-width: 1090px) {
  .container-home {
    min-height: 0;
  }

  .pagination-component {
    position: relative;
  }

  .name-main {
    top: 0;
    position: absolute;
  }

  .components-header {
    justify-content: space-between;
    padding: 0 15px 0 15px;
    margin-bottom: 65px;
  }
}

@media only screen and (max-width: 599px) {
  .pagination-component {
    position: relative;
  }

  .components-header {
    justify-content: center;
    padding: 0;
    margin-bottom: 2px;
  }

  .input-component {
    position: relative;
    left: 0;
    width: 350px;
  }

  .name-main {
    position: relative;
  }
}
</style>