import { auth } from '../firebase';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import (/* webpackChunkName: "home" */ '../views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "Registro" */ '../views/RegistroView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/LoginView.vue')
  },
  {
    path: '/editar/:id',
    name: 'editar',
    component: () => import(/* webpackChunkName: "editar" */ '../views/EditarView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/agregar',
    name: 'Agregar',
    component: () => import(/* webpackChunkName: "agregar" */ '../views/AgregarView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// La lógica para las rutas protegidas
router.beforeEach((to, from, next ) => {
  // Estamos recorriendo cada unas de las rutas
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // si en la aplicacion hay un usuario con la sesion activa
    console.log('ruta protegida');
    const usuario = auth.currentUser
    console.log(usuario);
    if(!usuario) {
      next({path: '/login'})
    } else {
      // si existe usuario con sesion activa 
      next(); // lo dejamos pasar a la ruta protegida
    }
  } else {
    // En este punto estan las rutas que no contienen meta: { requiresAuth: true }
    // y se le da acceso
    next();
  }
})

export default router
