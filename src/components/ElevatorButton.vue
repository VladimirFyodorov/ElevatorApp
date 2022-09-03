<template>
  <div class="button">
    <p>{{ floor }}</p>
    <button @click="onClick" :style="btnColor" class="btn-circle"></button>
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
  computed: {
    btnColor() {
      const hasTicket =
        this.$store.state.tickets.filter(
          (ticket) =>
            ticket.floor == this.floor && !ticket.done && !ticket.isWaiting
        ).length > 0;
      const hasCompletingTicket =
        this.$store.state.tickets.filter(
          (ticket) => ticket.floor == this.floor && ticket.isMoving
        ).length > 0;
      const color = hasCompletingTicket
        ? "green"
        : hasTicket
        ? "#FFFF99"
        : "#D3D3D3";
      return `background-color: ${color};`;
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
