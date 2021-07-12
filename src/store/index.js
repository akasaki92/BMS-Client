import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import alert from "./alert";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		prevUrl:"",
		payment:[]
	},
	mutations: {
		setPrevUrl: (state, value) => {
			state.prevUrl = value
		},
		setPayment: (state, value) => {
			state.payent = value
		}
	},
	actions: {
		setPrevUrl: ({commit}, value) => {
			commit('setPrevUrl', value)
		},
		setPayment: ({commit}, value) => {
			commit('setPayment', value)
		}
	},
	getters: {
		prevUrl: state => state.prevUrl,
		payment: state => state.payment
	},
	modules: {
		auth,
		alert
	},
});
