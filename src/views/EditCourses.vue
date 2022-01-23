<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="text-h5">Editar Curso {{filtrarCourse.data.name}}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="editForm" @submit.prevent="editCourse">
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="filtrarCourse.data.code"
                  label="Código"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="9">
                <v-text-field
                  v-model="filtrarCourse.data.name"
                  label="Nombre"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="filtrarCourse.data.description"
                  label="Descripción"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="filtrarCourse.data.price"
                  type="number"
                  min="0"
                  max="1000000"
                  step="10000"
                  label="Costo"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="filtrarCourse.data.number_signup"
                  type="number"
                  min="0"
                  label="Cupos"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="filtrarCourse.data.number_course"
                  type="number"
                  min="0"
                  label="Inscritos"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
               <v-menu max-width="290">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :value="filtrarCourse.data.register"
                    label="Fecha"
                    prepend-icon="mdi-calendar-range"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="filtrarCourse.data.register"
                ></v-date-picker>
              </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="filtrarCourse.data.duration"
                  label="Duración"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-switch
                  v-model="filtrarCourse.data.completed"
                  label="Terminado"
                ></v-switch>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="filtrarCourse.data.image"
                  label="Imagen"
                  hint="Pega la URL de la imagen"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-card-actions class="mt-5 d-flex flex-row-reverse">
              <div class="d-flex flex-row">
                <v-btn
                  color="blue darken-1"
                  text
                  @click="$router.push(`/admin`)"
                >
                  Cancelar
                </v-btn>
                <v-btn color="primary" type="submit"> Editar Curso </v-btn>
              </div>
            </v-card-actions>
          </v-form>
        </v-container>
        <p class="text-end mr-5">*Todos los campos son requeridos</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

import { updateData } from '../firebase/firebase.js'
export default {
  props: ['id'],
  data () {
    console.log("DATA 1",this)
    return {
      data:{
        code: '',
        name:  "lina" || '',
        description: '',
        price: '',
        number_signup: '',
        number_course: '',
        register: '',
        duration: '',
        completed: '',
        image: '',
      },  
    
       
    }
  },  
  methods: {
     upadateCourse() {
      let data = {
        index: this.id,
        course: {
            code: this.code,
            name: this.code,
            description:  this.description,
            price: this.price,
            number_signup: this.number_signup,
            number_course: this.number_course,
            register:   this.register,
            duration: this.duration,
            completed:  this.completed,
            image: this.image,
        },
      };
      
      this.$store.commit("upadateCourse", data);
      alert('Opinion actualizada');
      
    
    },
    editCourse() {
     // this.upadateCourse();
      updateData(this.id, this.filtrarCourse.data);
      this.$router.push('/admin');
    },
    // editCourse () {
    //   updateData(this.filtrarCourse.data)  
      
    // },
  },
  created () {
   
  },
  computed: {
    traerId() {
      return this.$route.params.id;
    },

    filtrarCourse() {
      return this.$store.getters.filterCourse(this.traerId);

    },
  },

  mounted() {
    this.filtrarCourse;

  },


  
}
</script>
