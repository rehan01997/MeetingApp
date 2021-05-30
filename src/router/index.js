import Router from 'vue-router';
import AppLogin from '../components/AppLogin';
import AppHome from '../components/AppHome';
import Team from '../components/Team';
import Meeting from '../components/Meeting';
// import { isAuthenticated } from '../services/auth';

// const meta = {
//     authorize: []
// };

const router = new Router({
    mode: 'history', 
    routes: [
        {
            name: 'login',
            path: '/',
            component: AppLogin,
            // meta
        },
        {
            name: 'home',
            path: '/home',
            component: AppHome,
            // meta
        },
        {
            name: 'meeting',
            path: '/meeting',
            component: Meeting,
            // meta
        },
        {
            name: 'team',
            path: '/team',
            component: Team
        }
    ]
});
router.beforeEach(( to, from, next ) => {
    // Right now, role-based authorization is NOT supported
    // if( to.meta.authorize && !isAuthenticated() ) {
    //     next({
    //         name: 'login'
    //     });
    // } else {
        next();
    // }
});

export default router;