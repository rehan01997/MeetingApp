<template>
        <nav class="navbar navbar-expand navbar-light bg-light">
        <div class="container px-2">
            <template v-if="isAuthenticated">
                <ul class="nav navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="link[0]">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="link[1]">Meeting</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="link[2]">Team</router-link>
                    </li>
                </ul>
                <ul class="nav navbar-nav" v-if="isAuthenticated">
                    <li class="nav-item">
                        <span class="nav-link">Hi <span class="text-primary">{{email}}</span></span>
                    </li>
                    <li class="nav-item">
                        <span class="nav-link cursor-pointer" @click="logout()">Logout</span>
                    </li>
                </ul>
            </template>
            <ul class="nav navbar-nav" v-else>
                <li class="nav-item">
                    <router-link class="nav-link" active-class="active" to="/login">Login</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { isAuthenticated$, email$, logout } from '../services/auth';
export default {
  name: 'AppNavbar',
  data() {
        return {
            link: [
                { name : 'home' },
                { name : 'meeting' },
                { name : 'team' }
            ],
            isAuthenticated: true,
            email: ''
        };
    },
    methods: {
        logout() {
            logout();
            this.$router.push( { name: 'login' } );
        }
    },
    created() {
        isAuthenticated$.subscribe(
            isAuthenticatedUpdated => this.isAuthenticated = isAuthenticatedUpdated
        );
        email$.subscribe(
            emailUpdated => this.email = emailUpdated
        );
    }
}
</script>

<style scoped>

</style>