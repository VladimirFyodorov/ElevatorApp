<template>
  <div>
    <ElevatorElem />
  </div>
</template>

<script>
import ElevatorElem from "./Elevator.vue";

export default {
  name: "ElevatorShaft",
  components: {
    ElevatorElem,
  },
};
</script>

<style scoped>
div {
  position: absolute;
  top: 0px;
  left: 1px;
  width: 120px;
  height: 99vh;

  border: 1px black solid;
}
</style>
