<template>
  <div class="button">
    <p>{{ floor }}</p>
    <button @click="onClick" class="btn-circle"></button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ElevatorButton",
  props: ["floor"],
  methods: {
    ...mapActions(["addTicket", "start"]),
    onClick() {
      this.addTicket(parseInt(this.floor));
    },
  },
};
</script>

<style scoped>
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
