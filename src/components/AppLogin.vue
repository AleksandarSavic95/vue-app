<template>
  <form @submit.prevent="login()">
    <input type="text" placeholder="email" v-model="email">
    <input type="password" placeholder="password" v-model="password">
    <button type="submit">Login</button>
    <div class="spinner" v-if="status === 'loading'"></div>
  </form>
</template>

<script>
import { STATUS, START_REQUEST } from '../constants'

export default {
  name: 'AppLogin',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    status () {
      return this.$store.getters[STATUS]
    }
  },
  methods: {
    login () {
      this.$store.dispatch(START_REQUEST, {
        email: this.email,
        password: this.password
      }).then(res => {
        this.$router.push({ name: 'TodoList' })
      })
    }
  }
}
</script>

<style scoped>
</style>
