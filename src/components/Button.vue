<template>
  <div>
    <button :style="{backgroundColor: bgColor, color: textColor}" @click="handleClick">{{labelButton}}</button>
  </div>
</template>

<script>
import {primary} from "@/utils/color";

export default {
  name: "MyButton",
  props: {
    labelButton: {
      type: String,
      default: "Ok",
    },
    bgColor: {
      type: String,
      default: primary,
    },
    textColor: {
      type: String,
      default: "white",
    },
  },
  methods: {
    handleClick() {
      this.$emit("on-click");
    },
  }
};
</script>

<style scoped>

button {
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  display: block;
}
</style>