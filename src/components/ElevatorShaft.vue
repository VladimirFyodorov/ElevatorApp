<template>
  <div>
    <TheElevator />
  </div>
</template>

<script>
import TheElevator from "./TheElevator.vue";

export default {
  name: "ElevatorShaft",
  components: {
    TheElevator,
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
