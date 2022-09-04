<template>
  <div class="wrapper">
    <ElevatorShaft />
    <ElevatorButtons />
  </div>
</template>

<script>
import ElevatorShaft from "../components/ElevatorShaft.vue";
import ElevatorButtons from "../components/ElevatorButtons.vue";
import { makeBackup } from "../utils";
import { mapActions } from "vuex";

export default {
  name: "ThePage",
  components: {
    ElevatorShaft,
    ElevatorButtons,
  },
  methods: {
    ...mapActions(["start"]),
  },
  created() {
    document.addEventListener("DOMContentLoaded", () => {
      this.start();
    });
    window.addEventListener("beforeunload", () => {
      makeBackup(this.$store.state);
    });
  },
};
</script>

<style>
div.wrapper {
  display: flex;
  justify-content: flex-start;
}
</style>
