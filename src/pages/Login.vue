<template lang="pug">
.container.col-12
  .components.absolute-center.column.col-12.items-center.justify-center(style="margin-top: 30px;")
    .row
      .absolute-top.text-center.title-login(style="font-family: 'Roboto Condensed', sans-serif;") Blog do Dev
    q-input.input-component(outlined v-model="nickname" label="Nickname")
      template(v-slot:append)
        q-icon(name="close" @click="nickname = ''" class="cursor-pointer")
      template(v-slot:prepend)
        q-icon(name="email")

    q-input.input-component(@keypress="eventKey" outlined v-model="password" type="password" label="Senha")
      template(v-slot:append)
        q-icon(name="close" @click="password = ''" class="cursor-pointer")
      template(v-slot:prepend)
        q-icon(name="password")

    .row.justify-center.absolute(style="bottom: 10px;")
      q-btn(@click="authLogin" :loading="dataLoading" :disable="dataLoading" push color="green" label="Entrar")
</template>

<script>
import { UserAuth } from 'src/models/UserModel'
import { defineComponent } from 'vue'
import {  mapActions } from 'vuex'

export default defineComponent({
  name: 'Login',
  data () {
    return {
      nickname: '',
      password: '',
      userAuth: new UserAuth()
    }
  },
  computed: {
    dataLoading () {
      return this.$store.state.isLoading
    }
  },
  methods: {
    ...mapActions(['authenticateLogin']),
    cleanFields () {
      this.nickname = ''
      this.password = ''
    },
    async authLogin () {
      if (this.verifyValue(this.nickname) && this.verifyValue(this.password)) {
        this.userAuth.nickname = this.nickname
        this.userAuth.password = this.password
        var auth = await this.authenticateLogin(this.userAuth)
        if (auth) {
          this.$router.push({ name: 'Home' })
        }
        this.cleanFields()
      }
    },
    eventKey (event) {
      if (event.key === 'Enter') {
        this.authLogin()
      }
    },
    verifyValue (value) {
      if (value === '' || value === null || undefined) {
        return false
      } else {
        return true
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  min-height: 500px;
}

.title-login {
  font-size: 1.8rem;
  top: 20px;
  color: rgb(0, 0, 0);
}

.components {
  top: 45%;
  border: 1px solid rgb(153, 152, 152);
  border-radius: 10px;
  width: 550px;
  height: 330px;
}

.input-component {
  padding: 5px;
  width: 520px;
}

@media only screen and (max-width: 499px) {
  .input-component {
    width: 100%;
  }
}
</style>