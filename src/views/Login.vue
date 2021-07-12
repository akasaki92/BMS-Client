<template>
	<div>
		<div class="ma-2 pa-0">
			<h3>{{ appName }}</h3>
		</div>
		<v-container grid-list-sm fluid>
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-text-field label="Username" v-model="username" :rules="usernameRules" required outlined></v-text-field>
				<v-text-field
					label="Password"
					v-model="password"
					:append-icon="showPassword ? 'mdi-eye':'mdi-eye-off'"
					:rules="passwordRules"
					:type="showPassword ? 'text':'password'"
					hint="At least 6 characters"
					@click:append="showPassword = !showPassword"
					outlined
				></v-text-field>
				<div class="ma-0 pa-0 mb-2 text-right">
					<v-btn small text to="/password" class="blue--text">lupa passsword?</v-btn>
				</div>
				<div>
					<v-btn block color="primary" elevation="2" :disabled="!valid" x-large @click="submit">Login</v-btn>
				</div>
				<div class="ma-0 pa-0 mt-2 pt-1 text-center">
					Belum punya akun?
					<v-btn small text to="/register" class="blue--text">Register sekarang</v-btn>
				</div>
			</v-form>
		</v-container>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	name: "Login",
	data() {
		return {
			valid: true,
			showPassword: false,
			username: "",
			usernameRules: [v => !!v || "Username is required"],
			password: "",
			passwordRules: [
				v => !!v || "Password is required",
				v => (v && v.length >= 6) || "Min 6 characters"
			]
		};
	},
	computed: {
		...mapGetters({
			user: "auth/user",
			prevUrl: "prevUrl"
		})
	},
	methods: {
		...mapActions({
			setAlert: "alert/set",
			setAuth: "auth/set"
		}),
		submit() {
			if (this.$refs.form.validate()) {
				let formData = {
					username: this.username,
					password: this.password
				};
				this.axios
					.post("/login", formData)
					.then(response => {
						let { data } = response.data;
						this.setAuth(data);
						if (this.user.id > 0) {
							this.setAlert({
								status: true,
								color: "success",
								text: "Login success"
							});
							if (this.prevUrl.length > 0)
								this.$router.push(this.prevUrl);
						} else {
							this.setAlert({
								status: true,
								color: "error",
								text: "Login Failed"
							});
						}
					})
					.catch(error => {
						let { data } = error.response;
						this.setAlert({
							status: true,
							color: "error",
							text: data.message
						});
					});
			}
		},
		close() {
			this.$emit("closed", false);
		}
	}
};
</script>
<style>
h3 {
	font-family: Roboto;
	font-style: normal;
	font-weight: normal;
	font-size: 48px;
	line-height: 56px;
}
</style>