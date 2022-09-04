<template>
  <TheShaft v-for="elevator in elevators" :key="elevator.id" :data="elevator" />
</template>

<script>
import TheShaft from "./TheShaft.vue";
import { mapGetters } from "vuex";

export default {
  name: "TheShafts",
  components: {
    TheShaft,
  },
  computed: {
    ...mapGetters(["elevators"]),
  },
};
</script>
