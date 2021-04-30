import * as remx from "remx";
import moment from "moment";

const initialState = {
  dateSelected: moment().unix(),
  machine: {
    machineId: "00f5eafd-89c5-4871-a982-26a8180774c7",
    machineName: "Line 1",
  },
  categoryId: null,
  troubleId: null,
  profile: {
    userId: "",
    name: "Budi Putra",
  },
};

const state = remx.state(initialState);

const setters = remx.setters({
  setDateSelected(date) {
    state.dateSelected = date;
  },
  setMachine(payload) {
    state.machine = { ...state.machine, ...payload };
  },
  setCategoryId(categoryId) {
    state.categoryId = categoryId;
  },
  setTroubleId(troubleId) {
    state.troubleId = troubleId;
  },
  setProfile(payload) {
    state.profile = { ...state.profile, ...payload };
  },
});

const getters = remx.getters({
  getDateSelected() {
    return state.dateSelected;
  },
  getMachine() {
    return state.machineId;
  },
  getCategoryId() {
    return state.categoryId;
  },
  getTroubleId() {
    return state.troubleId;
  },
  getProfile() {
    return state.profile;
  },
});

export const store = {
  ...setters,
  ...getters,
};
