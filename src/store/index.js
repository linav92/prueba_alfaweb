
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { listData } from "../firebase/firebase.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    courses: [],
    loading: true,
    email: "",
  },

  getters: {
    // filterCourse: (state) => (id) => {
    //   return state.courses[id]
    // },
    filterCourse: (state) => (id) => {
      return state.courses.filter((course)=>course.id === id)[0]
    },

    // filterCourse: (state) => (id) => {
    //   filter(() => { return state.courses.id === id });
    // }
  },
  
  mutations: {
    getCourses(state, data) {
      state.courses = data;
    },

    setEmail(state, data) {
      state.email = data;
    },

    eraseEmail(state) {
      state.email = "";
    },

    upadateCourse(state, data) {
      state.courses[data.index] = data.course;
    }
  },
  actions: {
    getData(context) {
      let saveCourses = ( data ) => {
        context.commit("getCourses", data);
      }
      // context.commit("getCourses", data) 
      listData(saveCourses);
    }
  },
  
   
 
});

export default store;