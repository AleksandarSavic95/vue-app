<template>
  <div class="items">
    <h1>TODO list</h1>
    <div class="list" v-if="IS_LOGGED_IN">
      <div v-if="!!itemEventDescription" class="row">
        <div v-if="!error" role="alert" class="alert alert-success col-md-4 offset-md-4">
          {{ itemEventDescription }}!
          <button type="button" class="close" @click="itemEventDescription=''"
            data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div v-else>
          Error! {{ itemEventDescription }}! <br/> {{ error }}
        </div>
      </div>
      <ul v-if="ITEMS && ITEMS.length" class="items">
        <router-link v-for="(item, index) in ITEMS" :key="index"
          :to="{ name: 'ViewItem', params: { id: item.id } }">
          <li>
            {{ item.title }}
            <span class="priority badge badge-pill"
              :class="['priority-' + item.priority]">&nbsp;</span>
          </li>
        </router-link>
      </ul>
      <p class="pill" v-if="ITEMS && ITEMS.length == 0">
        You don't have any todos! Why don't you
        <router-link :to="{ name: 'CreateItem' }">create one?</router-link>
      </p>
    </div>
    <div v-if="!IS_LOGGED_IN">
      We don't know who you are :/ Please
      <router-link :to="{ name: 'AppLogin' }" exact>login</router-link> or
      <router-link :to="{ name: 'AppRegister' }" exact>register</router-link>,
      so we can create and show you some todos.
    </div>
    <div class="spinner" v-if="STATUS === 'loading'"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_ITEMS, STATUS, IS_LOGGED_IN } from '../constants'

export default {
  name: 'TodoList',
  props: {
    itemEvent: String,
    error: Object
  },
  data () {
    return {
      itemEventDescription: this.itemEvent || ''
    }
  },
  computed: {
    ...mapGetters([GET_ITEMS, STATUS, IS_LOGGED_IN])
  },
  methods: {
    getItems () {
      this.$store.dispatch(GET_ITEMS)
    }
  },
  mounted () {
    if (this[IS_LOGGED_IN]) {
      this.getItems()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.items ul {
    padding: 50px;
}

.items a {
  color: #b3b3b3;
}

.items a:hover {
  color: #d8d8d8;
}

/* Style the list items */
ul.items li {
  padding: 12px 8px 12px 40px;
  background: #eee;
  color: #000;
  font-size: 18px;
  transition: 0.2s;
}

/* Darker background-color on hover */
ul.items li:hover {
  background: rgb(168, 168, 168);
}

/* done items have gray background and striked-out text */
ul.items li.checked {
  background: #888;
  color: #fff;
  text-decoration: line-through;
}

/* Add a "checked" mark for done items */
ul.items li.checked::before {
  content: '';
  position: absolute;
  border-color: #fff;
  border-style: solid;
  border-width: 0 2px 2px 0;
  top: 10px;
  left: 16px;
  transform: rotate(45deg);
  height: 15px;
  width: 7px;
}

/* Style the items container */
.items {
  background-color: #369;
  padding: 30px 40px;
  color: #000;
  text-align: center;
}

/* Clear floats after the items container */
.items:after {
  content: "";
  display: table;
  clear: both;
}

/* priority styles: 0 - low, 1 - mid, 2 - high */

.priority {
  float: right;
  text-align: center !important;
  /* padding: 0px 5px; */
}

.badge.priority-0::after {
  content: "low";
}
.priority-0 {
  background-color: #20ff20;
}

.badge.priority-1::after {
  content: "mid";
}
.priority-1 {
  background-color: #2088ff;
}

.badge.priority-2::after {
  content: "high";
}
.priority-2 {
  background-color: #ff2020;
}
</style>
