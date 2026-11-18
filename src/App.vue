<script setup lang="ts"></script>

<template>
  <nav>
    <RouterLink to="/products">Productos</RouterLink>
    <RouterLink to="/categories">Categorías</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style>
body {
  font-family: system-ui, sans-serif;
  margin: 0;
}
nav {
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
  background: #f3f3f3;
}
nav a.router-link-active {
  font-weight: bold;
}
main {
  max-width: 900px;
  margin: 1.5rem auto;
  padding: 0 1rem;
}
</style>
