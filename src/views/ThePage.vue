<template>
  <div class="wrapper">
    <TheShafts />
    <ElevatorButtons />
  </div>
</template>

<script>
import TheShafts from "../components/TheShafts.vue";
import ElevatorButtons from "../components/ElevatorButtons.vue";
import { makeBackup } from "../utils";
import { mapActions } from "vuex";

export default {
  name: "ThePage",
  components: {
    TheShafts,
    ElevatorButtons,
  },
  methods: {
    ...mapActions(["startAll"]),
  },
  created() {
    document.addEventListener("DOMContentLoaded", () => {
      this.startAll();
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
