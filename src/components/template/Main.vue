<template lang="pug">
.container-node
  template(v-for="(key, index) in technologies.length" :key="key")
    div.tree-node(v-if="technologies[index].isVisible" @click="chooseMain(technologies[index])") {{ technologies[index].name }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Technology } from 'src/models/TechnologyModel'
import { mapState, mapMutations, mapActions } from 'vuex'

export default defineComponent({
  name: 'Main',
  computed: {
    ...mapState(['isMainActived', 'pagination', 'technologies']),
  }, 
  methods: {
    ...mapMutations(['changeStateMainActived', 'changeStateMainSelected']),
    ...mapActions(['getArticles', 'getTechnologies']),
    verifyRoute (): boolean {
      if (this.$route.name === 'article-detail') {
        return true
      } else {
        return false
      }
    },
    chooseMain (tech: Technology) {
      if (this.verifyRoute()) {
        this.$router.push({ name: 'Home' })
      }

      this.changeStateMainActived(true)
      this.changeStateMainSelected(tech)

      this.pagination.id = tech.id
      this.pagination.hasParam = true
      this.pagination.onlyQuery = true

      this.getArticles(this.pagination)
    }
  },
  async created () {
    await this.getTechnologies()
  }
})
</script>

<style lang="scss" scoped>
.tree-node {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.2rem;
  padding-left: 15px;
  margin-left: 5px;
  margin-top: 10px;
  line-height: 40px;
  color: white;
}

.tree-node:hover {
  cursor: pointer;
  margin: 11px 0 0 0;
  background: rgb(255, 253, 253);
  color: rgb(20, 61, 194);
  font-weight: bold;
}

.container-node {
  background: $night;
  height: 100%;
  width: 200px;
  overflow: auto;
}
</style>