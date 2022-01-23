<template>

     <v-col cols="12" >
        <v-card class="px-4 py-4" elevation="0">
          <v-row class="px-4 pt-4">
            <v-alert text outlined color="deep-purple" icon="mdi-account-group">
              Cantidad total de alumnos permitidos.
              <p class="number">
                {{ totalCupos() }}
              </p>
            </v-alert>
          </v-row>
          <v-row class="px-4 pt-4">
            <v-alert text outlined color="blue" icon="mdi-account-check">
              Cantidad total de alumnos inscritos.
              <p class="number">
                {{ totalInscritos() }}
              </p>
            </v-alert>
          </v-row>
          <v-row class="px-4 pt-4">
            <v-alert text outlined color="red" icon="mdi-account-clock">
              Cantidad total de cupos restantes.
              <p class="number">
                {{ totalCupos() - totalInscritos() }}
              </p>
            </v-alert>
          </v-row>
          <v-row class="px-4 pt-4">
            <v-alert text outlined color="pink" icon="mdi-close-circle-outline">
              Cantidad total de cursos terminados.
              <p class="number">
                {{ totalTerminados() }}
              </p>
            </v-alert>
          </v-row>
          <v-row class="px-4 pt-4">
            <v-alert text outlined color="brown" icon="mdi-bell-ring">
              Cantidad total de cursos activos.
              <p class="number">
                {{ courses.length - totalTerminados() }}
              </p>
            </v-alert>
          </v-row>
          <v-row class="px-4 pt-4">
            <v-alert text outlined color="deep-orange" icon="mdi-bell-ring">
              Cantidad total de cursos.
              <p class="number">
                {{ courses.length }}
              </p>
            </v-alert>
          </v-row>
        </v-card>
      </v-col>

</template>

<script>


export default {
 computed: {
  courses () {
    return this.$store.state.courses
  }
 },

 methods: {
    totalInscritos() {
      let total = 0;
      this.courses.forEach((course) => {
        total= total + (+(course.data.number_signup)?+(course.data.number_signup):0);
      });
      return total;
    },
    totalTerminados() {
      let total = 0;
      this.courses.forEach((course) => {
        if (course.data.completed) {
          total = total + 1;
        }
      });
      return total;
    },

    totalCupos() {
      let total = 0;
      this.courses.forEach((course) => {
        total = total + (+(course.data.number_course)?+(course.data.number_course):0) ;
      });
      return total;
    },
 }

}
</script>

<style scoped>
.v-sheet.v-alert{
  width: 100%;
}
</style>
