<template>
    <div class="container my-4">
        <div class="row">
            <div class="offset-0 offset-md-3 col-12 col-md-6">
                <h1>Login</h1>
                <hr />
                <form name="form" @submit.prevent="login">
                    <div class="form-group text-left">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            class="form-control"
                            name="email"
                            id="email"
                            placeholder="john.doe@example.com"
                            v-model="form.email"
                            @blur="$v.form.email.$touch()"
                            :class="{
                                'is-invalid': shouldAppendErrorClass($v.form.email),
                                'is-valid': shouldAppendValidClass($v.form.email)
                            }"
                        />
                        <div v-if="$v.form.email.$error">
                            <div v-if="!$v.form.email.required" class="error-message">
                                <small>The email field is required</small>
                            </div>
                            <div v-if="!$v.form.email.email" class="error-message">
                                <small>Invalid email address</small>
                            </div>
                        </div>
                    </div> 
                    <div class="form-group text-left">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            autocomplete="off"
                            class="form-control"
                            name="password"
                            id="password"
                            v-model="form.password"
                            @blur="$v.form.password.$touch()"
                            :class="{
                                'is-invalid': shouldAppendErrorClass($v.form.password),
                                'is-valid': shouldAppendValidClass($v.form.password)
                            }"
                        /> 
                        <div v-if="$v.form.password.$error">
                            <div v-if="!$v.form.password.required" class="error-message">
                                <small>The password field is required</small>
                            </div>
                            <div v-if="!$v.form.password.minLength" class="error-message">
                                <small>The password must have at least 8 characters</small>
                            </div>
                            <div v-if="!$v.form.password.containsUppercase" class="error-message">
                                <small>The password must have at least 1 uppercase character</small>
                            </div>
                            <div v-if="!$v.form.password.containsLowercase" class="error-message">
                                <small>The password must have at least 1 lowercase character</small>
                            </div>
                            <div v-if="!$v.form.password.containsNumber" class="error-message">
                                <small>The password must have at least 1 digit</small>
                            </div>
                            <div v-if="!$v.form.password.containsSpecial" class="error-message">
                                <small>The password must have at least 1 special character</small>
                            </div>
                        </div>
                    </div>
                     <div class="form-group">
                        <button class="btn btn-primary" :disabled="$v.form.$invalid">Login</button>
                        <app-spinner v-if="processing" />
                    </div> 
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { required, minLength, email} from 'vuelidate/lib/validators';
    import { login } from '@/services/auth';

    export default {
        name: 'AppLogin',
        data() {
            return {
                processing: false,
                form: {
                    email: '',
                    password: ''
                }
            };
        },
        validations: {
            form: {
                email: {
                    email,
                    required
                },
                password: {
                    required,
                    minLength: minLength( 8 ),
                        containsUppercase: function(value) {
                        return /[A-Z]/.test(value)
                    },
                    containsLowercase: function(value) {
                        return /[a-z]/.test(value)
                    },
                    containsNumber: function(value) {
                        return /[0-9]/.test(value)
                    },
                    containsSpecial: function(value) {
                        return /[#?!@$%^&*-]/.test(value)
                    }
                }
            }
        },
        methods: {
            shouldAppendErrorClass( field ) {
                return field.$error; // field.$invalid && field.$dirty
            },
            shouldAppendValidClass( field ) {
                return !field.$invalid && field.$model && field.$dirty;
            },
            login() {
                if( !this.form.$invalid ) {
                    login( this.form )
                        .then( () => this.$router.push( { name: 'home' } ) )
                        .catch( error => {
                            Vue.$toast.open({
                                message: error.response.data.message,
                                duration: 5000,
                                type: 'error'
                            });
                        });
                } else {
                    console.log( 'invalid input values' );
                }
            },
        }
    }
</script>

<style scoped>

</style>