<template>
  <form @submit.prevent="register()">
    <div class="row form-group">
      <label class="col-md-4" for="name">Title:</label>
      <input type="text" id="name" v-model="name" required>
    </div>
    <div class="row form-group">
      <label class="col-md-4" for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>
    </div>
    <div class="row form-group">
      <label class="col-md-4" for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
    </div>
    <div class="row form-group">
      <label class="col-md-4" for="confirm">Confirm Password:</label>
      <input type="password" ref="confirm" id="confirm" v-model="confirmation"
        :class="{ invalid: !passwordOk }" required/>
    </div>
    <div class="row form-group">
      <div class="col-md-7 offset-md-3 form-group">
        <button type="submit" class="btn btn-success btn-block">
          Register
        </button>
      </div>
    </div>
    <div class="spinner" v-if="STATUS === 'loading'"></div>
  </form>
</template>

<script>
import { STATUS, REGISTER_USER, USER_REGISTERED, USER_NOT_REGISTERED } from '../constants'

export default {
  name: 'AppRegister',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      confirmation: '',
      passwordOk: true
    }
  },
  computed: {
    [STATUS] () {
      return this.$store.getters[STATUS]
    }
  },
  methods: {
    validatePassword () {
      this.passwordOk = this.password === this.confirmation
      if (!this.passwordOk) {
        this.$refs.confirm.setCustomValidity('Passwords Don\'t Match')
        setTimeout(() => {
          this.$refs.confirm.setCustomValidity('')
          this.passwordOk = true
        }, 2000)
      }
    },
    register () {
      this.validatePassword() // needed?
      if (!this.passwordOk) return

      this.$store.dispatch(REGISTER_USER, {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.confirmation // auto-validated on backend
      })
        .then(() => {
          this.$router.push({
            name: 'TodoList',
            params: { itemEvent: USER_REGISTERED }
          })
        })
        .catch(error => {
          this.$router.push({
            name: 'TodoList',
            params: { itemEvent: USER_NOT_REGISTERED, error }
          })
        })
    }
  }
}
</script>

<style scoped>
label {
  width: 20%;
  text-align: right;
}
input {
  padding-left: 10px;
  margin: 2px 2px 2px 0px;
}

.invalid {
  border: 1px solid #ff0000;
}
.valid {
  border: 1px solid #008000;
}
</style>
