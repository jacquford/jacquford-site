<template>
    <div class="home">
      <h1>Welcome to My Portfolio</h1>
      <p>This is the home page.</p>
      <RouterLink to="/projects">View Projects</RouterLink>
    </div>
  </template>

  <script setup lang="ts">
  import { RouterLink } from 'vue-router'
  </script>

  <style scoped>
  .home {
    text-align: center;
    padding: 2rem;
  }
  </style>

