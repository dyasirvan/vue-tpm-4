<template>
  <div>
    <button @click="back">Kembali</button>
    <h1>{{ title }}</h1>
    <p v-if="!isEdit">{{ description }}</p>
    <form v-if="isEdit">
      <input v-model="description"/>
      <button @click="onSubmitTodo">Simpan</button>
      <br/>
      <span v-if="!description">Deskripsi tidak boleh kosong</span>
    </form>
    <br/>
    <button @click="onEdit">Ubah deskripsi</button>
  </div>
</template>

<script>

export default {
  data(){
    return {
      isEdit: false,
      title: this.$store.state.todoItems[this.$route.params.id].title,
      rawDescription: this.$store.state.todoItems[this.$route.params.id].description ?? "Belum ada deskripsi nih",
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    onEdit(){
      this.isEdit = !this.isEdit
    },
    onSubmitTodo(){
      let index = this.$route.params.id
      console.log(index)
      let todo = {
        title: this.title,
        description: this.description
      }
      this.$store.dispatch("updateTodoItem", {index: index, todoItem: todo})
      this.isEdit = !this.isEdit
    }
  },
  computed: {
    description: {
      get() {
        return this.rawDescription === "Belum ada deskripsi nih" ? null : this.rawDescription;
      },
      set(value) {
        this.rawDescription = value;
      }
    }
  },
}
</script>
