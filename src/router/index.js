import Router from 'vue-router';
import AppLogin from '../components/AppLogin';
import AppHome from '../components/AppHome';
import Team from '../components/Team';
import Meeting from '../components/Meeting';

const router = new Router({
    mode: 'history', 
    routes: [
        {
            name: 'home',
            path: '/',
            component: AppHome
        },
        {
            name: 'login',
            path: '/login',
            component: AppLogin
        },
        {
            name: 'meeting',
            path: '/meeting',
            component: Meeting
        },
        {
            name: 'team',
            path: '/team',
            component: Team
        }
    ]
});

export default router;