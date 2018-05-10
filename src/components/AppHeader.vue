<template>
  <nav>
    <ul>
      <li>
        <router-link :to="{ name: 'TodoList' }" exact>Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'CreateItem' }" v-if="IS_LOGGED_IN" exact>Create a TODO</router-link>
      </li>
    </ul>
    <ul id="auth">
      <li>
        <router-link :to="{ name: 'AppLogin' }" v-if="!IS_LOGGED_IN" exact>Login</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'AppRegister' }" v-if="!IS_LOGGED_IN" exact>Register</router-link>
      </li>
      <li>
        <a href="#" v-if="IS_LOGGED_IN" @click="logout">Logout</a>
      </li>
    </ul>

  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { AUTH_LOGOUT, IS_LOGGED_IN } from '../constants'

export default {
  methods: {
    logout () {
      this.$store.dispatch(AUTH_LOGOUT)
        .then(() => {
          this.$router.push({ name: 'AppLogin' })
        })
    }
  },
  computed: {
    ...mapGetters([IS_LOGGED_IN])
  }
}
</script>

<style scoped>
nav {
    background: #444;
    padding: 14px 0;
    height: 60px;
    margin-bottom: 30px;
}
nav a {
  color: #fff;
  padding: 6px 8px;
  border-radius: 10px;
}
nav a:hover {
  color: rgb(216, 216, 216);
}
nav .router-link-active {
    background: #eee;
    color: #444;
}
nav .router-link-active:hover {
    background: #eee;
    color: #5c5c5c;
}
nav > ul {
    list-style-type: none;
    text-align: center;
    float: left;
}
nav > ul > li {
    display: inline-block;
    margin: 0 10px;
}

#auth {
  float: right;
}
</style>
