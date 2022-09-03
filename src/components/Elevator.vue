<template>
  <div @click="onClick" :style="elevatorCSS" class="elevator">
    <div class="elevatorHeader">
      <div :class="headerArrow"></div>
      {{ headerTxt }}
    </div>
    <div class="doors">
      <div :style="doorsWidth" class="door left"></div>
      <div :style="doorsWidth" class="door right"></div>
    </div>
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

    headerTxt() {
      const dest = this.$store.state.destinationFloor;

      return dest ? `${dest}` : "";
    },

    headerArrow() {
      const cur = this.$store.state.currentFloor;
      const dest = this.$store.state.destinationFloor;
      if (!dest) {
        return "";
      }
      return cur > dest ? "arrow-down" : "arrow-up";
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
      vh: window.innerHeight * 0.99 - 2,
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
  background-size: cover;
}

div.elevatorHeader {
  height: 2vh;
  border-bottom: 1px black solid;
  background-color: gray;

  display: flex;
  align-items: center;
  justify-content: center;
}

div.doors {
  display: flex;
  justify-content: space-between;
}

div.door {
  width: 59px;
  height: 18vh;
  background-color: gray;
}

div.left {
  border-right: black solid 1px;
}

div.right {
  border-left: black solid 1px;
}

.arrow-up {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid green;
}

.arrow-down {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #f00;
}
</style>
