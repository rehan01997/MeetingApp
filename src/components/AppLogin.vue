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
                            :class="{
                                'is-invalid': shouldAppendErrorClass(form.email),
                                'is-valid': shouldAppendValidClass(form.email)
                            }"
                        />
                        <div v-if="form.email.$error">
                            <div v-if="!form.email.required" class="error-message">
                                <small>The email field is required</small>
                            </div>
                            <div v-if="!form.email.email" class="error-message">
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
                            :class="{
                                'is-invalid': shouldAppendErrorClass(form.password),
                                'is-valid': shouldAppendValidClass(form.password)
                            }"
                        /> 
                        <div v-if="form.password.$error">
                            <div v-if="!form.password.required" class="error-message">
                                <small>The password is required</small>
                            </div>
                            <div v-if="!form.password.minLength" class="error-message">
                                <small>Password MUST have at least 8 characters</small>
                            </div>
                        </div>
                    </div>
                     <div class="form-group">
                        <button class="btn btn-primary" :disabled="form.$invalid">Login</button>
                        <app-spinner v-if="processing" />
                    </div> 
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { email, required, minLength } from 'vuelidate/lib/validators'
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
        }
        ,
        validations: {
            form: {
                email: {
                    email,
                    required
                },
                password: {
                    required,
                    minLength: minLength( 8 )
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
                // mark the inputs as touched (revalidating for safety)
                // this.form.$touch();

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