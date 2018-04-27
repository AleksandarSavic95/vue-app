<template>
  <nav>
    <ul>
      <li>
        <router-link :to="{ name: 'TodoList' }" exact>Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'CreateItem' }" exact>Create a TODO</router-link>
      </li>
    </ul>
    <ul id="auth">
      <li>
        <router-link :to="{ name: 'AppLogin' }" exact>Login</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'AppRegister' }" exact>Register</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {}
</script>

<style scoped>
nav {
    background: #444;
    padding: 14px 0;
    height: 60px;
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
