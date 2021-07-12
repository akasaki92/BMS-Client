import Vue from "vue";
import VueRouter from "vue-router";
// import store from "../store";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		// meta: { auth: true },
	},
	{
		path: "/profile",
		name: "Profile",
		component: () =>
			import(
				/* webpackChunkName: "profile" */

				"../views/Profile.vue"
			),
		meta: { auth: true },
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	{
		path: "/register",
		name: "Register",
		component: Register,
	},
	{
		path: "/about",
		name: "About",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/About.vue"),
	},
];

const router = new VueRouter({
	routes,
});

// router.beforeEach((to, from, next) => {
	// if (to.matched.some((record) => record.meta.auth)) {
	// 	if (store.getters["auth/guest"]) {
	// 		store.dispatch("alert/set", {
	// 			status: true,
	// 			text: "Login first",
	// 			color: "error",
	// 		});
	// 		store.dispatch("setPrevUrl", to.path);
	// 		store.dispatch("dialog/setComponent", "login");
	// 		store.dispatch("dialog/setStatus", true);
	// 	} else {
	// 		next();
	// 	}
	// } else {
	// 	next();
	// }
// });
export default router;
