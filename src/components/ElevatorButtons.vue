<template>
  <div class="buttons">
    <ElevatorButton v-for="i in arrayOfFloors" :key="i" :floor="i" />
  </div>
</template>

<script>
import ElevatorButton from "./ElevatorButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "ElevatorButtons",
  components: {
    ElevatorButton,
  },
  computed: {
    ...mapGetters(["floorsAmount"]),
    arrayOfFloors() {
      // making arry and than reversing it
      const arr = [...Array(this.floorsAmount).keys()].map(
        (i) => this.floorsAmount - i
      );
      return arr;
    },
  },
};
</script>

<style scoped>
div.buttons {
  height: 98vh;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
