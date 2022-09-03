<template>
  <div @click="onClick" :style="elevatorCSS" class="elevator">
    <div :style="doorsWidth" class="door left"></div>
    <div :style="doorsWidth" class="door right"></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ElevatorElem",
  computed: {
    elevatorCSS() {
      const postition = `top: ${this.$store.state.position * this.vh}px; `;
      const img = `background-image: url("${this.$store.state.imgUrl}"); `;
      return postition + img;
    },

    doorsWidth() {
      return `width: ${this.$store.state.doorsWidth * this.maxDoorsWidth}px`;
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
      maxDoorsWidth: 59,
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
  /* background-color: aqua; */
  background-size: cover;

  display: flex;
  justify-content: space-between;
}

div.door {
  width: 59px;
  height: 20vh;
  background-color: gray;
}

div.left {
  border-right: black solid 1px;
}

div.right {
  border-left: black solid 1px;
}
</style>
