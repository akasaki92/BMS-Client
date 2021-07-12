<template>
	<v-app v-if="$isMobile()">
		<v-app-bar app color="primary" dark flat absolute elevate-on-scroll v-if="isHome">
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title to="/">{{ appName }}</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon>
				<v-btn icon dark>
					<v-icon>mdi-bell</v-icon>
				</v-btn>
			</v-btn>
		</v-app-bar>

		<v-card v-else-if="isLogin"></v-card>

		<v-app-bar app color="primary" dark flat absolute elevate-on-scroll v-else>
			<v-btn icon @click.stop="$router.go(-1)">
				<v-icon>mdi-arrow-left</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer app v-model="drawer">
			<v-list>Side menu</v-list>
		</v-navigation-drawer>
		<keep-alive></keep-alive>
		<v-sheet id="scrolling-techniques" class="overflow-y-auto"> 
			<v-main>
				<v-container fluid>
					<v-slide-y-transition>
						<router-view />
					</v-slide-y-transition>
				</v-container>
			</v-main>
			<v-footer absolute app>
				<v-card-text class="text-center">
					&copy; {{ new Date().getFullYear() }} -
					<strong>Hikiko Teams</strong>
				</v-card-text>
			</v-footer>
		</v-sheet>
	</v-app>
	<v-app v-else>Please open in smartphone</v-app>
</template>

<script>
// import { mapActions, mapGetters } from "vuex";
export default {
	name: "App",
	data: () => ({
		drawer: false,
		menus: [
			{ title: "Home", icon: "mdi-home", route: "/" },
			{ title: "Profile", icon: "mdi-account", route: "/profile" }
		]
	}),
	computed: {
		isHome() {
			return this.$route.path === "/";
		},
		isLogin() {
			return this.$route.path === "/login";
		}
	}
};
</script>
