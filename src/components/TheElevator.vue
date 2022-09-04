<template>
  <div @click="onClick" :style="elevatorCSS" class="elevator">
    <div class="elevatorHeader">
      <div :class="headerArrowCSS"></div>
      {{ headerTxt }}
    </div>
    <div class="doors">
      <div :style="doorsWidthCSS" class="door left"></div>
      <div :style="doorsWidthCSS" class="door right"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "TheElevator",
  computed: {
    ...mapGetters([
      "position",
      "currentFloor",
      "destinationFloor",
      "doorsWidth",
      "imgUrl",
    ]),
    elevatorCSS() {
      const postition = `top: ${this.position * this.vh}px; `;
      const img = `background-image: url("${this.imgUrl}"); `;
      return postition + img;
    },

    headerTxt() {
      const dest = this.destinationFloor;
      return dest ? `${dest}` : "";
    },

    headerArrowCSS() {
      const cur = this.currentFloor;
      const dest = this.destinationFloor;
      if (!dest) {
        return "";
      }
      return cur > dest ? "arrow-down" : "arrow-up";
    },

    doorsWidthCSS() {
      return `width: ${this.doorsWidth * this.maxDoorsWidth}px`;
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
