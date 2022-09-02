<template>
  <div class="buttons">
    <ElevatorButton floor="5" />
    <ElevatorButton floor="4" />
    <ElevatorButton floor="3" />
    <ElevatorButton floor="2" />
    <ElevatorButton floor="1" />
  </div>
</template>

<script>
import ElevatorButton from "./ElevatorButton.vue";

export default {
  name: "ElevatorButtons",
  components: {
    ElevatorButton,
  },
};
</script>

<style scoped>
div.buttons {
  height: 100vh;
  margin-left: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
