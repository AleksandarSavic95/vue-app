<template>
  <div class="items">
    <h1>TODO list</h1>
    <div class="list" v-if="IS_LOGGED_IN">
      <div v-if="!!itemEventDescription" class="row">
        <div v-if="!error" role="alert" class="alert alert-success col-md-4 offset-md-4">
          {{ itemEventDescription }}
          <button type="button" class="close" @click="itemEventDescription=''"
            data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div v-else>
          Error! {{ itemEventDescription }} <br/> {{ error }}
        </div>
      </div>
      <ul v-if="ITEMS && ITEMS.length" class="items">
        <li v-for="(item, index) in ITEMS" :key="index" :class="{ checked: item.is_done }">
          <input type="checkbox" :checked="item.is_done" name="done"
            @click="toggleDone(item)">
          <router-link :to="{ name: 'ViewItem', params: { id: item.id } }">
            {{ item.title }}
          </router-link>
          <span class="priority badge badge-pill"
            :class="['priority-' + item.priority]">
            &nbsp;
          </span>
        </li>
      </ul>
      <p class="no-items" v-if="ITEMS && ITEMS.length == 0">
        You don't have any todos! Why don't you
        <router-link :to="{ name: 'CreateItem' }">create one?</router-link>
      </p>
      <div class="spinner" v-if="STATUS === 'loading'"></div>
    </div>
    <div v-if="!IS_LOGGED_IN" class="unknown-user">
      We don't know who you are :/ Please
      <router-link :to="{ name: 'AppLogin' }" exact>login</router-link> or
      <router-link :to="{ name: 'AppRegister' }" exact>register</router-link>,
      so we can create and show you some todos.
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_ITEMS, UPDATE_ITEM, STATUS, IS_LOGGED_IN } from '../constants'

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
    },
    toggleDone (item) {
      const toggledItem = { ...item, is_done: Number(!item.is_done) }
      console.log('item, pa toggledItem')
      console.log(item)
      console.log(toggledItem)
      this.$store.dispatch(UPDATE_ITEM, toggledItem)
    }
  },
  mounted () {
    if (this[IS_LOGGED_IN]) {
      this.getItems()
    }
  }
}
</script>

<style>
.items ul {
    padding: 50px;
}

.no-items a {
  padding: 0px !important;
}
.list a {
  color: #000000;
  padding: 0 35%;
}
.items a:hover {
  color: #d8d8d8;
}

/* Style the list items */
ul.items li {
  position: relative;
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

button {
  border: none;
}

img.check {
  float: left;
  /* display: inline-block; */
}

/* done items have gray background and striked-out text */
ul.items li.checked {
  background: #888;
  color: #fff !important;
  text-decoration: line-through;
}

/* Style the items container */
.items {
  background-color: #369;
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
  text-align: center !important;
  padding: 5px 20px 5px 10px;
  float: right;
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

input[type=checkbox] {
  float: left;
  width: 30px; /*Desired width*/
  height: 30px; /*Desired height*/
  cursor: pointer;
}
</style>
