<template>
  <v-container class="course">
    <h1 class="mb-5 text-center">Lista de cursos</h1>
    <v-row  >
      <v-col cols="12" sm="4" v-for="(course, index) in courses" :key="index">
        <v-card max-width="344">
          <v-img height="200px" :src="course.data.image"> </v-img>
          <div class="font-weight-bold ml-8 mb-2 mt-3">
            {{ course.data.name }}
          </div>

          <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">Información</div>

            <v-timeline align-top dense>
              <v-timeline-item color = "#CDC1FF" small>
                <div>
                  <div class="font-weight-normal">
                    <strong>Costo: </strong> {{ course.data.price }}
                  </div>
                  <strong>Duración: </strong> {{ course.data.duration }}
                </div>
              </v-timeline-item>
              <v-timeline-item color="#67B99A" small>
                <div>
                  <div class="font-weight-normal">
                    <strong>Cupos: </strong> {{ course.data.number_course }}
                  </div>
                  <strong>Completado: </strong> {{ course.data.completed }}
                </div>
              </v-timeline-item>
              <v-timeline-item color = "#CDC1FF" small>
                <div>
                  <div class="font-weight-normal">
                    <strong>Fecha de Registro: </strong>
                  </div>
                  {{ course.data.register}}
                </div>
              </v-timeline-item>
               <v-timeline-item color="#67B99A" small>
                <div>
                  <div class="font-weight-normal">
                    <strong>Descripción: </strong>
                  </div>
                  {{ course.data.description}}
                </div>
              </v-timeline-item>
              
              
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {

    };
   
  },
  created() {
    this.$store.dispatch("getData");
  },

  computed: {
    courses() {
      return this.$store.state.courses;
    },
  },
};
</script>

<style scoped>
.v-card {
  margin: 0 auto;
}
.course {
  margin-top: 2rem;
}
.v-sheet.v-card:not(.v-sheet--outlined)  {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(7.5px);
  -webkit-backdrop-filter: blur(7.5px);
  border-radius: 10px;
}
</style>