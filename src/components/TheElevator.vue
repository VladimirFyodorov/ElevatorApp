<template>
  <div @click="onClick" :style="elevatorCSS" class="elevator">
    <div :style="headerCSS" class="elevatorHeader">
      <div :class="headerArrowCSS"></div>
      {{ headerTxt }}
    </div>
    <div class="doors">
      <div :style="doorsCSS" class="door left"></div>
      <div :style="doorsCSS" class="door right"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "TheElevator",
  props: ["data"],
  computed: {
    ...mapGetters(["floorsAmount"]),
    elevatorCSS() {
      const height = `height: ${100 / this.floorsAmount}vh; `;
      const width = `width: ${70 / this.floorsAmount}vh; `;
      const postition = `top: ${this.data.position * this.vh}px; `;
      const img = `background-image: url("${this.data.imgUrl}"); `;
      return width + height + postition + img;
    },

    headerCSS() {
      const height = `height: ${(100 * 0.2) / this.floorsAmount}vh; `;
      return height;
    },

    headerTxt() {
      const dest = this.data.destinationFloor;
      return dest ? `${dest}` : "";
    },

    headerArrowCSS() {
      const cur = this.data.currentFloor;
      const dest = this.data.destinationFloor;
      if (!dest) {
        return "";
      }
      return cur > dest ? "arrow-down" : "arrow-up";
    },

    doorsCSS() {
      const height = `height: ${(100 * 0.8) / this.floorsAmount}vh; `;
      const widthNum = (this.data.doorsWidth * 35) / this.floorsAmount;
      const width = `width: ${widthNum}vh; `;
      return height + width;
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
      vh: window.innerHeight * 0.98 - 2,
    };
  },
};
</script>

<style scoped>
div.elevator {
  /* position: absolute; */
  position: relative;
  width: 118px;
  background-size: cover;
}

div.elevatorHeader {
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
