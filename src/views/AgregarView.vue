<template>
  <div class="container">
    <div class="row">
      <div class="col-4 offset-4">
        <h3 class="text-center">Formulario para Agregar una Tarea</h3>
        
        <form class="mt-5" @submit.prevent="agregarTarea(nombre)">
          <div class="mb-3">
            <label for="tarea" class="form-label">Ingrese una tarea: </label>
            <input 
              type="text"
              class="form-control"
              id="tarea"
              v-model="nombre"
              />
            <div class="mt-2 d-grid gap-2">
              <button class="btn btn-sm btn-outline-success" type="submit">
                <i class="fa-solid fa-file-circle-plus"></i>
                 Agregar
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Agregar',
  data() {
    return {
      nombre: ''
    }
  },
  methods: {
    ...mapActions(['agregarTarea'])
  }
}
</script>

<style>

</style>