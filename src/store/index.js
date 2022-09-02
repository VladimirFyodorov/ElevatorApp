import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      position: 0,
      moving: false,
      tickets: [
        // { floor: 4, isMoving: false, done: false },
        // { floor: 5, isMoving: false, done: false },
      ],
    };
  },
  getters: {},
  mutations: {},
  actions: {
    async start({ state, dispatch }) {
      let i = 0;
      state.moving = true;
      for (const ticket of state.tickets) {
        // await dispatch("moveTo", ticket.floor);
        if (!ticket.done) {
          await dispatch("moveTo", ticket, i);
        }
        i++;
      }
      state.moving = false;
      console.log(state);
    },

    // async start({ state, dispatch }) {
    //   await dispatch("moveTo", state.tickets[0].floor);
    //   await dispatch("moveTo", state.tickets[1].floor);
    // },

    async moveTo({ state }, ticket, index) {
      const neededPosition = 1 - ticket.floor / 5;
      const isGoingDown = state.position < neededPosition;
      ticket.isMoving = true;
      while (
        ((!isGoingDown && state.position > neededPosition) ||
          (isGoingDown && state.position < neededPosition)) &&
        ticket.isMoving
      ) {
        await new Promise((resolve) => setTimeout(resolve, 5));
        if (ticket.isMoving) {
          state.position += isGoingDown ? 0.001 : -0.001;
        }
      }
      ticket.isMoving = false;
      ticket.done = true;
      state.tickets.map((elem, i) => (i == index ? ticket : elem));
    },

    addTicket({ state, dispatch }, floor) {
      const isValid =
        state.tickets.filter((ticket) => ticket.floor == floor && !ticket.done)
          .length == 0;
      if (isValid) {
        state.tickets.push({ floor, isMoving: false, done: false });
        console.log(state.tickets);
      }

      if (isValid && !state.moving) {
        dispatch("start");
      }
    },
  },
  modules: {},
});
