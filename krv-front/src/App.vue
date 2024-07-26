<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/Nav.vue';
// import jquery from "http://code.jquery.com/jquery-latest.js"
</script>
<template>
  <header>
      <Nav></Nav>
  </header>

  <body>
    <div class="body">
      <RouterView>

      </RouterView>
    </div>
  </body>

  <!-- <RouterView /> -->
</template>

<style></style>