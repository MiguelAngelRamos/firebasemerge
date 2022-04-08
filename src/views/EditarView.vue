<template>
  <div class="container">
    <div class="row">
      <div class="col-4 offset-4">
        <h3 class="text-center">Formulario de edición de tareas</h3>

        <form class="mt-5" @submit.prevent="editarTarea(tarea)">
          <div class="mb-3">
            <label for="tarea" class="form-label">Editar Tarea</label>
            <input class="form-control" type="text" id="tarea" v-model="tarea.nombre">
          </div>

          <div class="d-grid gap-2">
            <button class="btn btn-success" type="submit">Editar</button>
          </div>

          <!-- <pre>
            {{ tarea }}
          </pre> -->
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Editar',
  data() {
    return {
      id: this.$route.params.id
    }
  },
  methods: {
    ...mapActions(['getTarea', 'editarTarea'])
  },
  created() {
    this.getTarea(this.id)
  },
  computed: {
    ...mapState(['tarea'])
  }

}
</script>

<style>

</style>