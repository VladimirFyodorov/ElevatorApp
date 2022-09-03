import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      position: 0.8,
      doorsWidth: 1,
      moving: false,
      imgUrl: "https://cdn2.thecatapi.com/images/nO1TpfQ9f.jpg",
      tickets: [
        // { id: 1, floor: 4, isMoving: false, isWaiting: false, done: false },
        // { id: 2, floor: 5, isMoving: false, isWaiting: false, done: false },
      ],
    };
  },
  getters: {},
  mutations: {
    createTicket(state, payload) {
      const floor = payload.floor;
      const tickets = state.tickets;
      const maxId = tickets.reduce(
        (acc, ticket) => Math.max(acc, ticket.id),
        0
      );
      const id = maxId + 1;
      state.tickets.push({
        id,
        floor,
        isMoving: false,
        isWaiting: false,
        done: false,
      });
    },
  },
  actions: {
    async start({ state, dispatch }) {
      state.moving = true;
      for (const ticket of state.tickets) {
        if (!ticket.done) {
          await dispatch("completeTicket", ticket);
        }
      }
      state.moving = false;
    },

    async completeTicket({ state, dispatch }, ticket) {
      // cat
      dispatch("fetchRndCatImg");
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

      ticket.isWaiting = true;
      // open doors
      while (state.doorsWidth > 0 && ticket.isWaiting) {
        await new Promise((resolve) => setTimeout(resolve, 10));
        if (ticket.isWaiting) {
          state.doorsWidth -= 0.01;
        }
      }
      // waiting
      state.doorsWidth = 0;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // close doors
      while (state.doorsWidth < 1 && ticket.isWaiting) {
        await new Promise((resolve) => setTimeout(resolve, 10));
        if (ticket.isWaiting) {
          state.doorsWidth += 0.01;
        }
      }
      ticket.isWaiting = false;
      state.doorsWidth = 1;

      ticket.done = true;
      state.tickets.map((elem) => (elem.id == ticket.id ? ticket : elem));
    },

    addTicket({ state, commit, dispatch }, floor) {
      const isValid =
        state.tickets.filter((ticket) => ticket.floor == floor && !ticket.done)
          .length == 0;
      if (isValid) {
        commit({ type: "createTicket", floor });
      }

      if (isValid && !state.moving) {
        dispatch("start");
      }
    },

    fetchRndCatImg({ state }) {
      fetch("https://api.thecatapi.com/v1/images/search")
        .then((res) => res.json())
        .then((json) => (state.imgUrl = json[0].url))
        .catch((err) => console.log(err));
    },
  },
  modules: {},
});
