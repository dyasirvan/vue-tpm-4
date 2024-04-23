import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
      createPersistedState({storage: window.sessionStorage})
  ],
  state: {
    todoItems: []
  },
  getters: {
    getTodoItems: state => state.todoItems
  },
  mutations: {
    setTodoItems: (state, todoItems) => {
      state.todoItems = todoItems
    },
    addTodoItem: (state, todoItem) => {
      state.todoItems.push(todoItem)
    },
    deleteTodoItem: (state, index) => {
      state.todoItems.splice(index, 1)
    },
    updateTodoItem: (state, { index, todoItem }) => {
      state.todoItems[index] = todoItem
    }
  },
  actions: {
    setTodoItems: ({ commit }, todoItems) => {
      commit('setTodoItems', todoItems)
    },
    addTodoItem: ({ commit }, todoItem) => {
      commit('addTodoItem', todoItem)
    },
    deleteTodoItem: ({ commit }, index) => {
      commit('deleteTodoItem', index)
    },
    updateTodoItem: ({ commit , state}, { index, todoItem }) => {
      if (typeof todoItem === 'object' && Object.prototype.hasOwnProperty.call(todoItem, 'title') && Object.prototype.hasOwnProperty.call(todoItem, 'description')) {
        if (index >= 0 && index < state.todoItems.length) {
          commit('updateTodoItem', { index, todoItem })
        } else {
          console.error(`Cannot update todo item: index ${index} is out of bounds`)
        }
      } else {
        console.error('Cannot update todo item: todoItem must be an object with title and description')
      }
    }
  },
  modules: {
  }
})
