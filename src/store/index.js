import { createStore } from "vuex";
import Service from "../service";
import { getBackup } from "../utils";

const service = new Service();

export default createStore({
  state() {
    return {
      position: 0.8,
      currentFloor: 1,
      destinationFloor: "",
      doorsWidth: 1,
      moving: false,
      imgUrl: "",
      tickets: [
        // { id: 1, floor: 4, isMoving: false, isWaiting: false, done: false },
        // { id: 2, floor: 5, isMoving: false, isWaiting: false, done: false },
      ],
      ...getBackup(),
    };
  },
  getters: {
    position(state) {
      return state.position;
    },
    currentFloor(state) {
      return state.currentFloor;
    },
    destinationFloor(state) {
      return state.destinationFloor;
    },
    doorsWidth(state) {
      return state.doorsWidth;
    },
    moving(state) {
      return state.moving;
    },
    imgUrl(state) {
      return state.imgUrl;
    },
  },
  mutations: {
    createTicket(state, floor) {
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
      // makeBackup(state);
      // console.log(getBackup());
    },
    updateTicket(state, ticket) {
      state.tickets.map((elem) => (elem.id == ticket.id ? ticket : elem));
      // makeBackup(state);
    },
    deleteCompletedTickets(state) {
      console.log(state);
    },
    updateRndCatImg(state, payload) {
      const url =
        payload ||
        "https://www.pngkit.com/png/detail/212-2123465_404-404-error-images-png.png";
      state.imgUrl = url;
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

    async completeTicket({ state, dispatch, commit }, ticket) {
      dispatch("updateRndCatImg");
      const neededPosition = 1 - ticket.floor / 5;
      const isGoingDown = state.position < neededPosition;
      ticket.isMoving = true;
      commit("updateTicket", ticket);
      state.destinationFloor = ticket.floor;
      while (
        ((!isGoingDown && state.position > neededPosition) ||
          (isGoingDown && state.position < neededPosition)) &&
        ticket.isMoving
      ) {
        await new Promise((resolve) => setTimeout(resolve, 5));
        if (ticket.isMoving) {
          state.position += isGoingDown ? 0.001 : -0.001;
          const floatFloor = (1 - state.position) * 5;
          state.currentFloor = isGoingDown
            ? Math.ceil(floatFloor)
            : Math.floor(floatFloor);
        }
      }
      ticket.isMoving = false;
      commit("updateTicket", ticket);
      state.currentFloor = ticket.floor;
      state.destinationFloor = "";

      ticket.isWaiting = true;
      commit("updateTicket", ticket);
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
      commit("updateTicket", ticket);
      state.doorsWidth = 1;

      ticket.done = true;
      commit("updateTicket", ticket);
    },

    createTicket({ state, commit, dispatch }, floor) {
      const noTickets =
        state.tickets.filter((ticket) => ticket.floor == floor && !ticket.done)
          .length == 0;
      const queueIsEmpty =
        state.tickets.filter((ticket) => !ticket.done).length == 0;
      const sameFloor = state.currentFloor == floor;
      if ((noTickets && !queueIsEmpty) || (queueIsEmpty && !sameFloor)) {
        commit("createTicket", floor);

        if (!state.moving) {
          dispatch("start");
        }
      }
    },

    updateRndCatImg({ commit }) {
      service
        .fetchRndCatImg()
        .then((res) => res.json())
        .then((json) => commit("updateRndCatImg", json[0].url));
    },
  },
  modules: {},
});
