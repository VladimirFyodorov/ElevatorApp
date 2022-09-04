<template>
  <div :style="shaftCSS" class="shaft">
    <TheElevator :data="data" />
  </div>
</template>

<script>
import TheElevator from "./TheElevator.vue";
import { mapGetters } from "vuex";

export default {
  name: "TheShaft",
  props: ["data"],
  components: {
    TheElevator,
  },
  computed: {
    ...mapGetters(["floorsAmount"]),
    shaftCSS() {
      const width = `width: ${70 / this.floorsAmount}vh; `;
      const margin = `margin-right: ${20 / this.floorsAmount}vh; `;
      return width + margin;
    },
  },
};
</script>

<style scoped>
div.shaft {
  /* position: absolute; */
  /* top: 0px;
  left: 1px; */
  height: 98vh;
  /* margin-right: 20px; */

  border: 1px black solid;
}
</style>
