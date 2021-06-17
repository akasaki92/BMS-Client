<template>
	<v-app v-if="$isMobile()">
		<v-app-bar app color="primary" dark flat v-if="isHome">
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title to="/dashboard">{{ appName }}</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon>
				<v-btn icon dark>
					<v-icon>mdi-bell</v-icon>
				</v-btn>
			</v-btn>
		</v-app-bar>
		<keep-alive>
		
		</keep-alive>
		<v-main>
			<v-container fluid>
				<v-slide-y-transition>
					<router-view />
				</v-slide-y-transition>
			</v-container>
		</v-main>
		<v-card>
			<v-footer absolute app>
				<v-card-text class="text-center">
					&copy; {{ new Date().getFullYear() }} -
					<strong>Hikiko Teams</strong>
				</v-card-text>
			</v-footer>
		</v-card>
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
			{ title: "Home", icon: "mdi-home", route: "/dashboard" },
			{ title: "Profile", icon: "mdi-account", route: "/profile" }
		]
	}),
	computed: {
		isHome() {
			return this.$route.path === "/dashboard";
		}
	}
};
</script>
