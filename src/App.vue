<template lang="pug">
div#app
  q-layout
    Header
    q-page-container
      LogoBlog(v-if="!loginRouter")
      q-page
        router-view
        Main.border-node(v-if="mainVisible && !loginRouter")
    Footer(v-if="!loginRouter")
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import Header from './components/template/Header.vue'
import Main from './components/template/Main.vue'
import Footer from './components/template/Footer.vue'
import LogoBlog from './components/template/LogoBlog.vue'

export default defineComponent({
  name: 'App',
  components: { Header, Main, LogoBlog, Footer },
  data () {
    return {
      slide: 'first'
    }
  },
  computed: {
    ...mapState(['mainVisible']),
    loginRouter () {
      const router = this.$route.name
      return Boolean(router === 'login')
    }
  }
})
</script>

<style lang="scss" scoped>
.font-text {
  font-family: 'Roboto Condensed', sans-serif;
}

.border-node {
  display: flex;
  flex-direction: column;
  position: absolute;
  border-right: 1px solid rgb(110, 107, 107);
  top: 0;
  left: 0;
  overflow: auto;
}

@media only screen and (max-width: 1090px) {
  .border-node {
    position: relative;
    width: 100%;
    border-left: 0;
  }
}
</style>