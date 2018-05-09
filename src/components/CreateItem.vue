<template>
  <div id="item-display">
    <div class="row">
      <label class="col-md-4" for="title">Title:</label>
      <input type="text" id="title" v-model="item.title">
    </div>
    <div class="row">
      <label class="col-md-4" for="content">Content:</label>
      <textarea class="col-md-5" id="content" v-model="item.content">
      </textarea>
    </div>
    <div class="row">
      <label class="col-md-4" for="priority">Priority:</label>
      <select class="col-md-1" id="priority" v-model="item.priority">
        <option value="0">Low</option>
        <option value="1">Middle</option>
        <option value="2">High</option>
      </select>
    </div>
    <div class="row">
      <label class="col-md-4" for="is_done">Done:</label>
      <input type="checkbox" id="is_done" v-model="item.is_done">
    </div>
    <div class="row">
      <div class="col-md-7 offset-md-3 form-group">
        <button @click="createItem()" class="btn btn-success btn-block">
          Create
        </button>
      </div>
    </div>
    <div class="spinner" v-if="STATUS === 'loading'"></div>
  </div>
</template>

<script>
import { CREATE_ITEM, STATUS } from '../constants'
import { mapGetters } from 'vuex'

export default {
  name: 'CreateItem',
  computed: {
    ...mapGetters([STATUS])
  },
  data () {
    return {
      item: {
        title: '',
        content: '',
        priority: '0',
        is_done: false
      }
    }
  },
  methods: {
    createItem () {
      this.$store.dispatch(CREATE_ITEM, this.item)
        .then(() => {
          this.$router.push({
            name: 'TodoList',
            params: { itemEvent: 'created' }
          })
        })
        .catch(error => {
          this.$router.push({
            name: 'TodoList',
            params: { from: 'not created', error }
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
input[type=checkbox] {
  margin: 6px 0px 0px 2px;
  width: 15px;
  height: 15px;
}
/* make padding equal for all inputs */
input, textarea, select {
  padding-left: 10px;
  margin: 2px 2px 2px 0px;
}
</style>
