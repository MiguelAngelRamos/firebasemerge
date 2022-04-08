import { createStore } from 'vuex';
import { auth, db } from '../firebase';
import router from '../router';

export default createStore({
  state: {
    usuario: null,
    error: null,
    tareas: [],
    tarea: {}
  },
  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setTareas(state, payload) {
      state.tareas = payload;
    },
    setTarea(state, payload) {
      state.tarea = payload;
    },
    setEliminarTarea(state, payload) {
      state.tareas = state.tareas.filter(tarea => tarea.id !== payload)
    }
  },
  actions: {
    crearUsuario({commit}, usuario) {
      auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
       .then(response => {
         const usuarioCreado = {
           email: response.user.email,
           uid: response.user.uid
         }
         db.collection(response.user.email).add({
           nombre: 'tarea de ejemplo'
         }).then( document => {
            commit('setUsuario', usuarioCreado);
            router.push('/')
         }).catch( error => console.log(error))

       })
       .catch( err => {
         commit('setError', err)
       })
    },
    loginUsuario({commit}, usuario) {

      auth.signInWithEmailAndPassword(usuario.email, usuario.password)
        .then( response => {
          const usuarioLogeado = {
            email: response.user.email,
            uid: response.user.uid
          }

          commit('setUsuario', usuarioLogeado)
          router.push('/')
        })
        .catch(err => {
          commit('setError', err)
        })
    },
    cerrarSesion({commit}) {
      auth.signOut()
        .then(() => {
          router.push('/login')
        }).catch(err => console.log(err))
    },
    detectarUsuario({commit}, usuario) {
      commit('setUsuario', usuario)
    },
    getTareas({commit, state}) {
      db.collection(state.usuario.email).get().then( response => {
        const tareasTemp = [];
        response.forEach( document => {
    
          const objectTarea = document.data()
          objectTarea.id = document.id;
          tareasTemp.push(objectTarea)
        });
        commit('setTareas', tareasTemp);
      });
    },
    agregarTarea({commit, state}, nombreTarea){
      db.collection(state.usuario.email).add({
        nombre: nombreTarea
      })
      .then( document => {
        console.log(document.id);
        router.push('/'); 
      })
    },
    editarTarea({commit, state}, tarea) {
      db.collection(state.usuario.email).doc(tarea.id).update({
        nombre: tarea.nombre
      })
      .then(() => {
        router.push('/');
      })
    },
    eliminarTarea({commit, state, dispatch}, idTarea) {
      db.collection(state.usuario.email).doc(idTarea).delete()
        .then( () => {
          commit('setEliminarTarea', idTarea)
        }).catch(err=> console.log(err));
    },
    getTarea({commit, state}, idTarea) {

      db.collection(state.usuario.email).doc(idTarea).get().then(document => {
        const tareaObtenida = document.data(); 
        tareaObtenida.id = document.id;
        console.log(tareaObtenida);
        commit('setTarea', tareaObtenida)
      })
    }
  },
  modules: {
  },
  getters: {
    existeUsuario(state) {
      return state.usuario==null?false:true
    }
  },
})
