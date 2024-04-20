<template>
  <div class="container">
    <div class="content">
      <h1>Todo List</h1>
      <ol>
        <li v-for="(item, index) in todoItems" :key="item" class="list-item">
          <div class="col-8">
            <span>{{ index + 1 }}. </span>
            <span v-if="!isEdit[index]">{{ item }}</span>
            <input type="text" v-if="isEdit[index]" :style="halfWidth" :value="item" @input="editedValue = $event.target.value"
                   @keyup.enter="handleUpdate(index, editedValue)"/>
            <br/>
            <span :style="{color: danger}" v-if="isErrorUpdate"> {{ messageError }}</span>
          </div>
          <div class="col-4 button-group">
            <MyButton :bg-color="danger" label-button="Hapus" @on-click="deleteTodo(index)"/>
            <MyButton :bg-color="warning" label-button="Ubah" @on-click="updateTodo(index)" class="ml-10"/>
          </div>
        </li>
      </ol>
      <div class="row">
        <div class="col-8">
          <input :style="{width: maxWidth}" type="text" v-model="todoValue" @keyup.enter="addTodo"/>
          <br/>
          <span :style="{color: danger}" v-if="isErrorInsert"> {{ messageError }}</span>
        </div>
        <div class="col-4">
          <MyButton :bgColor="primary" @on-click="addTodo" label-button="Tambahkan" class="my-button"/>
        </div>
      </div>
      <span>{{ messageGreat }}</span>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/Button.vue";
import {danger, primary, warning} from "@/utils/color";

export default {
  name: "TodoList",
  components: {MyButton},
  data() {
    return {
      todoItems: [],
      todoValue: "",
      message: "",
      isErrorInsert: false,
      isErrorUpdate: false,
      messageError: "Tidak boleh kosong!",
      danger: danger,
      primary: primary,
      warning: warning,
      isEdit: {},
      maxWidth: "100%",
      halfWidth: "50%",
      editedValue: ""
    };
  },
  methods: {
    addTodo() {
      console.log("add")
      if (this.todoValue === "") {
        this.isErrorInsert = true;
        return;
      }
      this.todoItems.push(this.todoValue);
      this.todoValue = "";
    },
    deleteTodo(index) {
      this.todoItems.splice(index, 1);
    },
    updateTodo(index) {
      this.$set(this.isEdit, index, true)
    },
    handleUpdate(index, value) {
      if(value === "") {
        this.isErrorUpdate = true
        return
      }
      this.todoItems[index] = value
      this.$set(this.isEdit, index, false)
    }
  },
  computed: {
    messageGreat() {
      return this.todoItems.length > 3 ? "Hebat!" : "";
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  height: 100vh;
}

.content {
  width: 50%;
  margin: 0 auto;
  text-align: left;
}

input {
  padding: 8px;
  border: 1px solid #455a64;
  border-radius: 5px;
  height: fit-content;
}

ol {
  padding: 0;
}

li {
  text-align: left;
  margin-bottom: 8px;
}

.row {
  display: flex;
  justify-content: center;
  align-self: center;
}

.col-8 {
  width: 70%;
}

.col-4 {
  width: 30%;
}

.my-button {
  display: flex;
  justify-content: center;
  width: 100%;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.button-group {
  display: flex;
  justify-content: flex-end;
}

.ml-10 {
  margin-left: 10px;
}
</style>