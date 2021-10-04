<template>
	<div>
		<div class="ma-2 pa-0">
			<h3>Register</h3>
		</div>
		<v-container grid-list-sm fluid>
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-text-field label="Username" v-model="username" :rules="usernameRules" required outlined></v-text-field>
				<v-text-field label="Name" v-model="name" :rules="nameRules" required outlined></v-text-field>
				<v-text-field label="Email" v-model="email" :rules="emailRules" required outlined></v-text-field>
				<v-text-field
					label="Password"
					v-model="password"
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					:rules="passwordRules"
					:type="showPassword ? 'text':'password'"
					hint="At least 6 characters"
					@click:append="showPassword = !showPassword"
					outlined
				></v-text-field>
				<div>
					<v-btn block color="primary" elevation="2" :disabled="!valid" x-large @click="submit">Register</v-btn>
				</div>
				<div class="ma-0 pa-0 mt-2 pt-1 text-center">
					Sudah punya akun?
					<v-btn small text to="/login" class="blue--text">Login disini</v-btn>
				</div>
			</v-form>
		</v-container>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	name: "Register",
	data() {
		return {
			valid: true,
			showPassword: false,
			username: "",
			usernameRules: [v => !!v || "Username is required"],
			name: "",
			nameRules: [
				v => !!v || "Name is required",
				v =>
					(v && v.length <= 255) ||
					"Name must be less than 255 characters"
			],
			email: "",
			emailRules: [
				v => !!v || "Email is required",
				v =>
					/([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(
						v
					) || "E-mail must be valid"
			],
			password: "",
			passwordRules: [
				v => !!v || "Password is required",
				v => (v && v.length >= 6) || "Min 6 characters"
			]
		};
	},
	computed: {
		...mapGetters({
			user: "auth/user"
		})
	},
	methods: {
		...mapActions({
			setAlert: "alert/set",
			setAuth: "auth/set"
		}),
		submit() {
			if (this.$refs.form.validate()) {
				let formData = new FormData();
				formData.set("username", this.username);
				formData.set("name", this.name);
				formData.set("email", this.email);
				formData.set("password", this.password);
				this.axios
					.post("/register", formData)
					.then(response => {
						let { data } = response.data;
						this.setAuth(data);
						this.setAlert({
							status: true,
							color: "success",
							text: "Register Success"
						});
						this.close();
					})
					.catch(error => {
						let { data } = error.response.data;
						this.setAlert({
							status: true,
							color: "error",
							text: data.message
						});
					});
			}
		}
	}
};
</script>

<style>
</style>