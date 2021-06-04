<template>
	<div>
		<h3>{{ appName }}</h3>
		<div class="ma-2 pa-0"></div>
		<v-container grid-list-sm fluid>
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-text-field label="Username" v-model="username" required autofocus outlined></v-text-field>
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
					<v-btn small text to="/password" class="blue--text">forgot passsword?</v-btn>
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

<style>
h3 {
	font-family: Roboto;
	font-style: normal;
	font-weight: normal;
	font-size: 48px;
	line-height: 56px;
}
</style>