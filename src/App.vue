<template>
  <div class="wrapper">
    <ElevatorShaft />
    <ElevatorButtons />
    <div id="image-box"><img id="cat-image" /><br /></div>
  </div>
</template>

<script>
import ElevatorShaft from "./components/ElevatorShaft.vue";
import ElevatorButtons from "./components/ElevatorButtons.vue";

export default {
  name: "App",
  components: {
    ElevatorShaft,
    ElevatorButtons,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

div.wrapper {
  display: flex;
  justify-content: flex-start;
}
</style>
