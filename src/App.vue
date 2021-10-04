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
		<v-card v-else-if="isRegister"></v-card>

		<v-app-bar app color="primary" dark flat absolute elevate-on-scroll v-else>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title to="/">{{ appName }}</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon>
				<v-btn icon dark>
					<v-icon>mdi-bell</v-icon>
				</v-btn>
			</v-btn>
		</v-app-bar>
		<!-- Left Side Menu start here -->
		<v-navigation-drawer app v-model="drawer">
			<v-list>
				<v-list-item>
					<v-list-item-avatar>
						<v-img src="https://randomuser.me/api/portraits/med/women/85.jpg"></v-img>
					</v-list-item-avatar>
				</v-list-item>
			</v-list>
			<v-list-item>
				<v-list-item-content>
					<v-list-item-title class="text-h6">Profile Name</v-list-item-title>
					<v-list-item-subtitle>Bergabung sejak {{ new Date().getFullYear() }}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-divider></v-divider>
			<v-list dense nav>
				<v-list-item-group color="primary">
					<template v-for="(item, index) in menus">
						<v-list-item
							:key="`menu-` + index"
							:to="item.route"
							v-if="!item.auth || (item.auth && !guest)"
							link
						>
							<v-list-item-content>
								<v-list-item-title>{{ item.title }}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</template>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
		<!-- Left Side Menu end here -->

		<keep-alive></keep-alive>
		<v-main>
			<v-container fluid>
				<v-dialog-bottom-transition>
					<router-view />
				</v-dialog-bottom-transition>
			</v-container>
		</v-main>
		<v-footer absolute app>
			<v-card-text>
				<div class="d-flex flex-column">
					<v-card-text class="pa-2" outlined tile>About</v-card-text>
					<v-card-text class="pa-2" outlined tile>Contact us</v-card-text>
				</div>
			</v-card-text>
			<v-card-text class="text-center">&copy; BMS Teams {{ new Date().getFullYear() }}</v-card-text>
		</v-footer>
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
			{ title: "Dashboard", route: "/" },
			{ title: "Data Langganan", route: "/langganan" },
			{ title: "Profile", route: "/profile" },
			{ title: "Logout", route: "/logout" }
		]
	}),
	computed: {
		isHome() {
			return this.$route.path === "/";
		},
		isLogin() {
			return this.$route.path === "/login";
		},
		isRegister() {
			return this.$route.path === "/register";
		}
	}
};
</script>
