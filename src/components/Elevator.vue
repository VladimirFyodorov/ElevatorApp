<template>
  <div @click="onClick" :style="positionCSS" class="elevator"></div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ElevatorElem",
  computed: {
    positionCSS() {
      return `top: ${this.$store.state.position * this.vh}px`;
    },
  },
  methods: {
    ...mapActions(["start"]),
    onClick() {
      this.start();
    },
  },

  data() {
    return {
      vh: window.innerHeight,
    };
  },
};
</script>

<style scoped>
div.elevator {
  position: absolute;
  left: 0px;
  width: 118px;
  height: 20vh;
  background-color: aqua;
}
</style>
