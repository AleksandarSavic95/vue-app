<template>
  <div class="hello">
    <div id="item-display" v-if="STATUS != 'loading' && !!item">
      <div class="row">
        <label class="col-md-4" for="title">Title:</label>
        <input type="text" ref="title" id="title" :value="item.title"
          :disabled="!isEditing" :class="{view: !isEditing}">
      </div>
      <div class="row">
        <label class="col-md-4" for="content">Content:</label>
        <textarea  class="col-md-5" ref="content" id="content" :value="item.content"
          :disabled="!isEditing" :class="{view: !isEditing}"></textarea>
      </div>
      <div class="row">
        <label class="col-md-4" for="priority">Priority:</label>
        <select class="col-md-1" ref="priority" id="priority" :value="item.priority"
          :disabled="!isEditing" :class="{view: !isEditing}">
          <option value="0">Low</option>
          <option value="1">Middle</option>
          <option value="2">High</option>
        </select>
      </div>
      <div class="row">
        <label class="col-md-4" for="is_done">Done:</label>
        <input type="checkbox" ref="is_done" id="is_done" :checked="item.is_done"
          :disabled="!isEditing" :class="{view: !isEditing}">
      </div>
      <div class="row">
        <div class="col-md-3 offset-md-3 form-group">
          <span class="col-md-1">
            <button @click="isEditing = true" v-if="!isEditing" class="btn btn-primary">
              Edit
            </button>
          </span>
          <span class="col-md-1">
            <button @click="saveItem()" v-if="isEditing" class="btn btn-success">
              Save
            </button>
          </span>

          <button v-if="isEditing" @click="isEditing = false" class="btn btn-default">
            Cancel
          </button>
        </div>
        <div class="col-md-2 form-group">
          <button @click="deleteItem()" v-if="!isEditing" class="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
    <div class="spinner" v-if="STATUS === 'loading'"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_ITEM, UPDATE_ITEM, DELETE_ITEM, STATUS, ITEM_DELETED, ITEM_NOT_DELETED } from '../constants'

export default {
  name: 'ViewItem',
  props: {
    id: Number
  },
  computed: {
    item () {
      return this.$store.getters[GET_ITEM](this.$route.params.id)
    },
    ...mapGetters([STATUS])
  },
  data () {
    return {
      isEditing: false
    }
  },
  methods: {
    edit () {
      this.isEditing = true
    },
    itemChanged (updatedItem) {
      return updatedItem.title !== this.item.title ||
        updatedItem.content !== this.item.content ||
        updatedItem.priority !== this.item.priority ||
        updatedItem.is_done !== this.item.is_done
    },
    saveItem () {
      const updatedItem = {
        id: this.item.id,
        title: this.$refs.title.value,
        content: this.$refs.content.value,
        priority: Number(this.$refs.priority.value),
        is_done: Number(this.$refs.is_done.checked)
      }
      if (this.itemChanged(updatedItem)) {
        this.$store.dispatch(UPDATE_ITEM, updatedItem)
      }
      this.isEditing = false
    },
    deleteItem () {
      this.$store.dispatch(DELETE_ITEM, this.item.id)
        .then(() => {
          this.$router.push({
            name: 'TodoList',
            params: { itemEvent: ITEM_DELETED }
          })
        })
        .catch(error => {
          this.$router.push({
            name: 'TodoList',
            params: { itemEvent: ITEM_NOT_DELETED, error }
          })
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // access to component instance via `vm`
      vm.$store.dispatch(GET_ITEM, to.params.id)
        .then(() => {
          vm.loaded = true
        })
    })
  }
}
</script>

<style scoped>
.view {
  border-color: transparent;
  background-color: initial;
  color: initial
}
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
