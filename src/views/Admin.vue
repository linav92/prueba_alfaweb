<template>
  <v-container>
    <v-row class="mt-5">
      <v-col cols="12">
        <v-card class="px-4 py-4" elevation="0">
          <v-data-table
            :headers="headers"
            :items="courses"
            sort-by="name"
            loading = "getLoading"
            loading-text="Loading... Please wait"
          >
          
            <template v-slot:top>
              

              <template slot="course.register" slot-scope="{ item }">
                <span class="blue-field">${{ item.register }}</span>
              </template>
              <template slot="course.completed" slot-scope="{ item }">
                <v-switch disabled v-model="item.data.completed"></v-switch>
              </template>
              <template slot="course.price" slot-scope="{ item }">
                <span class="green-field">${{ item.data.price }}</span>
              </template>
              <v-toolbar flat class="Holi">
                 <v-toolbar-title class="title">Administración</v-toolbar-title>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">

                    <v-btn
                      color="primary"
                      dark
                      class="mb-2 dl"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Agregar curso
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              counter="40"
                              v-model="editedItem.name"
                              label="Nombre"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              ref="image"
                              v-model="editedItem.image"
                              placeholder="URL de la imagen del curso"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                            color="purple"
                              type="number"
                              step="any"
                              min="0"
                              ref="input"
                              label="Cupos del curso"
                              v-model="editedItem.number_course"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              type="number"
                              step="any"
                              min="0"
                              ref="input"
                              label="Inscritos en el curso"
                              v-model="editedItem.number_signup"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                             <v-text-field
                             ref="image"
                              v-model="editedItem.duration"
                              placeholder="Duración"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            
                            <v-text-field
                            
                              type="number"
                              step="any"
                              min="0"
                              ref="input"
                              label="Costo"
                              v-model="editedItem.price"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                             ref="image"
                              v-model="editedItem.code"
                              placeholder="Código de curso"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-menu max-width="290">
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  :value="editedItem.register"
                                  label="Fecha"
                                  prepend-icon="mdi-calendar-range"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="editedItem.register"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="12">
                            
                            <v-switch
                              value: false
                              v-model="editItem.completed"
                              :label="editItem.completed ? 'Completado' : 'No Terminado'"
                            >

                              </v-switch>

                          </v-col>
                          <v-col cols="12">
                            <v-textarea
                              outlined
                              label="Descripción del curso"
                              v-model="editedItem.description"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" class="mr-4 mt-5" @click="close">
                        Cancel
                      </v-btn>
                      <v-btn
                        elevation="2"
                        color="success"
                        class="mr-4 mt-5"
                        @click="createCourse"
                      >
                        Crear Curso
                      </v-btn>
                      <v-btn color="error" class="mr-4 mt-5" @click="reset">
                        Limpiar Formulario
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5 center py-5"
                      >¿Quieres eliminar este curso?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer class="my-5"></v-spacer>
                      <v-btn
                        color="primary"
                        dark
                        class="dl"
                        @click="closeDelete"
                      >
                        Cancelar
                      </v-btn>
                      <v-btn
                        color="primary"
                        dark
                        class="dl"
                        @click="deleteItemConfirm"
                      >
                        Confirmar</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="$router.push(`/admin/${item.id}`)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
              <p>No hay cursos</p>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <Info></Info>
    </v-row>
  </v-container>
</template>
<script>

import { addData, deleteData } from '../firebase/firebase.js'
import Info from '../components/Info.vue'

export default {
  components: { Info },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: "Curso", align: "start", value: "data.name" },
        { text: "Cupos", value: "data.number_course" },
        { text: "Inscritos", value: "data.number_signup" },
        { text: "Duración", value: "data.duration" },
        { text: "Costo", value: "data.price" },
        { text: "Terminado", value: "data.completed" },
        { text: "Fecha", value: "data.register" },

        { text: "Acciones", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        number_course: 0,
        number_signup: 0,
        duration: "",
        price: 0,
        completed: false,
        register: "",
        code: "",
        description: "",
      },
      defaultItem: {
        name: "",
        number_course: 0,
        number_signup: 0,
        duration: "",
        price: 0,
        completed: false,
        register: "",
        code: "",
        description: "",
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Agregando Curso" : "Edit Item";
    },
    courses() {
      return this.$store.state.courses;
    },
    showBoolean() {
      return this.defaultItem.completed ? "Si" : "No";
    },
    getLoading() {
      return this.$store.state.loading;
    },

  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.$store.dispatch("getData");
  },
  methods: {
    reset() {
      this.editedItem.name = ''
      this.editedItem.image = ''
      this.editedItem.number_course = ''
      this.editedItem.number_signup = ''
      this.editedItem.duration = ''
      this.editedItem.price = ''
      this.editedItem.description = ''
      this.editedItem.code = ''
      this.editedItem.completed = false
      this.editedItem.register = ''
    },

  
    createCourseCallback(){
      this.$swal( `El curso ${this.editedItem.name}`, "¡Se ha creado exitosamente!", "success");
      this.editedItem.name = ''
      this.editedItem.image = ''
      this.editedItem.number_course = ''
      this.editedItem.number_signup = ''
      this.editedItem.duration = ''
      this.editedItem.price = ''
      this.editedItem.description = ''
      this.editedItem.code = ''
      this.editedItem.completed = false
      this.editedItem.register = ''

    },

    createCourse(){
      if (this.editedIndex > -1) {
        Object.assign(this.courses[this.editedIndex], this.editedItem);
      } else {
        this.courses.push(this.editedItem);
        addData(this.editedItem, this.createCourseCallback)
        this.$store.dispatch("getData");
      }
      
      this.close();
    },

    deleteCourse(id){
      this.$store.dispatch("deleteCourse", id)
    },

    editItem(item) {
      this.$router.push({ name: "Edit", params: { item: item } });
    },

    deleteItem(item) {
      this.editedIndex = this.courses.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.courses.splice(this.editedIndex, 1);
      deleteData(this.editedItem.id, this.deleteCourse)
      this.$store.dispatch("getData")
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    
  },

};
</script>

<style scoped>
.Holi{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.title{
  margin-right: 3rem;
}
.v-sheet.v-alert{
  width: 100%;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  background: rgba( 255, 255, 255, 0.8 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 6px );
-webkit-backdrop-filter: blur( 6px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
}

</style>
