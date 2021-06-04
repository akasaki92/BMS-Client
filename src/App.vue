<template>
	<v-app>
		<div v-if="$isMobile()">
			<v-app-bar app color="primary" dark flat v-if="isHome">
				<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
				<v-toolbar-title to="/dashboard">{{ appName }}</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-btn icon>
					<v-btn icon dark @click="setDialogComponent('notification')">
						<v-icon>mdi-bell</v-icon>
					</v-btn>
				</v-btn>
			</v-app-bar>
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
		</div>
		<div v-else>Please access on Mobile/Smartphone Only</div>
	</v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	name: "App",
	data: () => ({
		drawer: false,
		menus: [
			{ title: "Home", icon: "mdi-home", route: "/dashboard" },
			{ title: "Profile", icon: "mdi-account", route: "/profile" }
		]
	}),
	methods: {
		...mapActions({
			setDialogStatus: "dialog/setStatus",
			setDialogComponent: "dialog/setComponent",
			setAuth: "auth/set",
			setAlert: "alert/set"
		})
	},
	computed: {
		isHome() {
			return this.$route.path === "/dashboard";
		},
		...mapGetters({
			guest: "auth/guest",
			user: "auth/user",
			setDialogStatus: "dialog/status",
			currentComponent: "dialog/component"
		}),
		dialog: {
			get() {
				return this.setDialogStatus;
			},
			set(value) {
				this.setDialogStatus(value);
			}
		}
	}
};
</script>
