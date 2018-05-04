<template>
  <div class="header">
    <h1>TODO list</h1>
    <div class="list">
      <ul class="items">
        <router-link v-for="(item, index) in items" :key="index"
          :to="{path: '/todoitems/' + item.id}">
          <li>
            {{ item.title }}
            <span v-bind:class="['priority badge badge-pill priority-' + item.priority]">&nbsp;</span>
          </li>
        </router-link>
      </ul>
    </div>
    <button v-on:click="changePriorities(2)">Change priorities</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TodoList',
  computed: {
    items () {
      return this.$store.state.items
    },
    // hardItems () {
    //   return this.$store.getters.hardItems
    // }
    ...mapGetters([
      'hardItems' // , 'secondGetter'
    ])
  },
  data () {
    return {}
  },
  methods: {
    // changePriorities: function (increment) {
    //   this.$store.dispatch('changePriorities', increment)
    // }
    ...mapActions([
      'changePriorities'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.items ul {
    padding: 50px;
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

/* Style the header */
.header {
  background-color: #369;
  padding: 30px 40px;
  color: #fff;
  text-align: center;
}

/* Clear floats after the header */
.header:after {
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
