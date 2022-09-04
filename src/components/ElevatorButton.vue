<template>
  <div class="button">
    <p class="button-number">{{ floor }}</p>
    <button @click="onClick" :style="btnColor" class="btn-circle"></button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ElevatorButton",
  props: ["floor"],
  methods: {
    ...mapActions(["createTicket"]),
    onClick() {
      this.createTicket(parseInt(this.floor));
    },
  },
  computed: {
    btnColor() {
      const colorRaw = this.$store.getters.btnColor(this.floor);
      const color =
        colorRaw == "green"
          ? "green"
          : colorRaw == "yellow"
          ? "#FFFF99"
          : "#D3D3D3";
      return `background-color: ${color};`;
    },
  },
};
</script>

<style scoped>
div.button {
  display: flex;
  flex-direction: column;
  align-items: center;
}

p.button-number {
  margin-top: 0px;
  margin-bottom: 3px;
}

.btn-circle {
  width: 20px;
  height: 20px;
  padding: 4px 0px;
  border-radius: 10px;
  font-size: 6px;
  text-align: center;
  cursor: pointer;
}
</style>
