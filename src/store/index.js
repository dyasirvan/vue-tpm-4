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
    updateTodoItem: ({ commit }, { index, todoItem }) => {
      commit('updateTodoItem', { index, todoItem })
    }
  },
  modules: {
  }
})
