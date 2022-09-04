import { createStore } from "vuex";
import Service from "../service";
import { getBackup } from "../utils";
import config from "../../config.js";

const service = new Service();

export default createStore({
  state() {
    let elevators = [];
    for (let i = 1; i <= config.elevatorsAmount; i++) {
      elevators.push({
        id: i,
        position: 1 - 1 / config.floorsAmount,
        currentFloor: 1,
        destinationFloor: "",
        doorsWidth: 1,
        moving: false,
        waiting: false,
        imgUrl: "",
        tickets: [],
      });
    }
    return {
      elevators,
      maxTicketId: 0,
      // { id: 1, floor: 4, isMoving: false, isWaiting: false, done: false },
      // { "id": 1, "floor": 4, "isMoving": "false", "isWaiting": "false", "done": "false" }
      // { id: 2, floor: 5, isMoving: false, isWaiting: false, done: false },
      ...getBackup(),
      ...config, //should be after backup to change floors/elevators on reload
    };
  },
  getters: {
    floorsAmount(state) {
      return state.floorsAmount;
    },
    elevatorsAmount(state) {
      return state.elevatorsAmount;
    },
    elevators(state) {
      return state.elevators;
    },
    freeElevators(state) {
      const arr = state.elevators.filter(
        (elem) => !elem.moving && !elem.waiting
      );
      return arr;
    },

    elevatorsLoad(state) {
      const res = state.elevators.map((elevator) => {
        const countTickets = elevator.tickets.reduce((acc, ticket) => {
          if (!ticket.done) {
            return acc + 1;
          }
          return acc;
        }, 0);
        return { ...elevator, countTickets };
      });
      return res;
    },

    btnColor: (state) => (floor) => {
      const hasTickets =
        state.elevators.filter(
          (elevator) =>
            elevator.tickets.filter(
              (ticket) =>
                ticket.floor == floor && !ticket.done && !ticket.isWaiting
            ).length > 0
        ).length > 0;

      const hasMovingElevator =
        state.elevators.filter((elevator) => elevator.destinationFloor == floor)
          .length > 0;
      const color = hasMovingElevator
        ? "green"
        : hasTickets
        ? "yellow"
        : "gray";
      return color;
    },
  },
  mutations: {
    createTicket(state, { floor, elevator }) {
      state.maxTicketId = state.maxTicketId + 1;
      const id = state.maxTicketId;
      const ticket = {
        id,
        floor,
        isMoving: false,
        isWaiting: false,
        done: false,
      };

      const elevators = state.elevators.map((elev) => {
        if (elev.id != elevator.id) {
          return elev;
        }
        const tickets = [...elev.tickets, ticket];
        return { ...elev, tickets };
      });

      state.elevators = elevators;
    },

    updateTicket(state, { ticket, elevator }) {
      state.elevators.map((elev) => {
        if (elev.id != elevator.id) {
          return elev;
        }
        return elev.tickets.map((elem) =>
          elem.id == ticket.id ? ticket : elem
        );
      });
    },

    deleteCompletedTickets(state) {
      console.log(state);
    },

    updateRndCatImg(state, { elevator, url }) {
      const imgUrl =
        url ||
        "https://www.pngkit.com/png/detail/212-2123465_404-404-error-images-png.png";
      elevator.imgUrl = imgUrl;
      this.commit("updateElevator", { elevator, feilds: ["imgUrl"] });
    },

    updateElevator(state, { elevator, feilds }) {
      const elevators = state.elevators.map((elem) => {
        if (elem.id != elevator.id) {
          return elem;
        }

        const upd = Object.fromEntries(
          Object.entries(elevator).filter(([key]) => feilds.includes(key))
        );
        return { ...elem, ...upd };
      });
      state.elevators = elevators;
    },
  },

  actions: {
    startAll({ state, dispatch }) {
      for (const elevator of state.elevators) {
        if (!elevator.moving && !elevator.waiting) {
          dispatch("startOne", elevator);
        }
      }
    },

    async startOne({ dispatch }, elevator) {
      for (const ticket of elevator.tickets) {
        if (!ticket.done) {
          await dispatch("completeTicket", {
            ticket,
            elevator: elevator,
          });
        }
      }
    },

    async completeTicket({ state, dispatch, commit }, { ticket, elevator }) {
      dispatch("updateRndCatImg", elevator);
      const neededPosition = 1 - ticket.floor / state.floorsAmount;
      const isGoingDown = elevator.position < neededPosition;
      ticket.isMoving = true;
      commit("updateTicket", { ticket, elevator });
      elevator.moving = true;
      elevator.destinationFloor = ticket.floor;
      commit("updateElevator", {
        elevator,
        feilds: ["destinationFloor", "moving"],
      });
      while (
        ((!isGoingDown && elevator.position > neededPosition) ||
          (isGoingDown && elevator.position < neededPosition)) &&
        ticket.isMoving
      ) {
        await new Promise((resolve) => setTimeout(resolve, state.floorsAmount));
        if (ticket.isMoving) {
          elevator.position += isGoingDown ? 0.001 : -0.001;
          const floatFloor = (1 - elevator.position) * state.floorsAmount;
          elevator.currentFloor = isGoingDown
            ? Math.ceil(floatFloor)
            : Math.floor(floatFloor);
          commit("updateElevator", {
            elevator,
            feilds: ["position", "currentFloor"],
          });
        }
      }
      ticket.isMoving = false;
      ticket.isWaiting = true;
      commit("updateTicket", { ticket, elevator });

      elevator.moving = false;
      elevator.waiting = true;
      elevator.currentFloor = ticket.floor;
      elevator.destinationFloor = "";
      commit("updateElevator", {
        elevator,
        feilds: ["moving", "waiting", "currentFloor", "destinationFloor"],
      });

      // open doors
      while (elevator.doorsWidth > 0 && ticket.isWaiting) {
        await new Promise((resolve) => setTimeout(resolve, 10));
        if (ticket.isWaiting) {
          elevator.doorsWidth -= 0.01;
          commit("updateElevator", { elevator, feilds: ["doorsWidth"] });
        }
      }
      // waiting
      elevator.doorsWidth = 0;
      commit("updateElevator", { elevator, feilds: ["doorsWidth"] });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // close doors
      while (elevator.doorsWidth < 1 && ticket.isWaiting) {
        await new Promise((resolve) => setTimeout(resolve, 10));
        if (ticket.isWaiting) {
          elevator.doorsWidth += 0.01;
          commit("updateElevator", { elevator, feilds: ["doorsWidth"] });
        }
      }
      elevator.doorsWidth = 1;
      elevator.waiting = false;
      commit("updateElevator", { elevator, feilds: ["waiting", "doorsWidth"] });

      ticket.isWaiting = false;
      ticket.done = true;
      commit("updateTicket", { ticket, elevator });
      // dispatch("startOne", elevator);
      dispatch("startAll");
    },

    createTicket({ commit, getters, dispatch }, floor) {
      const elevator = alocateTicket(floor);
      const tickets = elevator.tickets;
      const noTickets =
        tickets.filter((ticket) => ticket.floor == floor && !ticket.done)
          .length == 0;
      const queueIsEmpty = tickets.filter((ticket) => !ticket.done).length == 0;
      const sameFloor = elevator.currentFloor == floor;
      if ((noTickets && !queueIsEmpty) || (queueIsEmpty && !sameFloor)) {
        commit("createTicket", { floor, elevator });
        dispatch("startAll");
      }

      function alocateTicket(floor) {
        const freeElev = getters.freeElevators;
        if (freeElev.length > 0) {
          const nearestElev = freeElev.sort(
            (a, b) =>
              Math.abs(a.currentFloor - floor) -
              Math.abs(b.currentFloor - floor)
          )[0];
          return nearestElev;
        }

        const elevatorWithSmollestLoad = getters.elevatorsLoad.sort(
          (a, b) => a.countTickets - b.countTickets
        )[0];
        return elevatorWithSmollestLoad;
      }
    },

    updateRndCatImg({ commit }, elevator) {
      service
        .fetchRndCatImg()
        .then((res) => res.json())
        .then((json) =>
          commit("updateRndCatImg", { elevator, url: json[0].url })
        );
    },
  },
  modules: {},
});
