<template>
  <div id="app">
    <v-app>
      <div class="loader" :class="{ show: $root.loading }">
        <img src="./assets/Spinner.gif" alt="spinner">
      </div>
      <v-main>
        <Nav />
        <transition name="vista">
          <router-view></router-view>
        </transition>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";

export default {
  // name: "app",

  components: {
    Nav,
  },
};
</script>

<style>
#app {
  background: url("./assets/fondo1.png");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

.loader {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  background: #fff;
  transition: all 0.3s;
  visibility: hidden;
  opacity: 0;
}

.loader.show {
  opacity: 1;
  visibility: visible;
}

.vista-enter-active,
.vista-leave-active {
  transition: opacity 0.1s;
}
.vista-enter,
.vista-leave-to {
  opacity: 0;
}
</style>
