<template>
  <div>
    <img src="../assets/404.png" alt="404 Error">
    <h1>Oooops!</h1>
    <h2>We have something broken.</h2>

    <v-btn
            elevation="2"
            color="#CFBAF0"
            class="mr-4 mt-5"
            @click="goHome"
          >
            Volver al Home
          </v-btn>


  </div>
</template>

<script>


export default {
methods: {
  goHome() {
    this.$router.push("/");
  },
}
}
</script>


<style scoped>
  div{
    display: flex; 
    flex-direction: column; 
    align-items: center;
    justify-content: center;
  }
  img {
    width: 55%;
  }
</style>